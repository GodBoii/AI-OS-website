/// <reference types="@webgpu/types" />

import { liquidGlassShader } from "./liquidGlassShader";

export type GlassSurface = {
  canvas: HTMLCanvasElement;
  context: GPUCanvasContext;
  uniforms: GPUBuffer;
  bindings: GPUBindGroup;
};

type GlassFrame = {
  rect: DOMRect;
  radius: number;
  strength: number;
  intensity: number;
  press: number;
  pointer: { x: number; y: number };
};

const sceneWidth = 512;
const sceneHeight = 384;

export async function createLiquidGlassRenderer() {
  const adapter = await navigator.gpu?.requestAdapter({ powerPreference: "low-power" });
  if (!adapter) return null;

  const backdrop = document.createElement("canvas");
  backdrop.width = sceneWidth;
  backdrop.height = sceneHeight;
  const backdropContext = backdrop.getContext("2d");
  if (!backdropContext) return null;

  const device = await adapter.requestDevice();
  try {
    const format = navigator.gpu.getPreferredCanvasFormat();
    const shader = device.createShaderModule({ label: "Liquid glass", code: liquidGlassShader });
    const pipeline = await device.createRenderPipelineAsync({
      label: "Liquid glass",
      layout: "auto",
      vertex: { module: shader, entryPoint: "vertex" },
      fragment: { module: shader, entryPoint: "fragment", targets: [{ format }] },
    });
    const sampler = device.createSampler({ minFilter: "linear", magFilter: "linear" });
    const texture = device.createTexture({
      size: [sceneWidth, sceneHeight],
      format: "rgba8unorm",
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
    });
    const textureView = texture.createView();
    const uniformData = new Float32Array(16);

    const capture = (scene: HTMLCanvasElement | null) => {
      backdropContext.clearRect(0, 0, sceneWidth, sceneHeight);
      if (scene?.width && scene.height) {
        const rect = scene.getBoundingClientRect();
        const scaleX = sceneWidth / window.innerWidth;
        const scaleY = sceneHeight / window.innerHeight;
        backdropContext.drawImage(scene, rect.left * scaleX, rect.top * scaleY, rect.width * scaleX, rect.height * scaleY);
      }
      device.queue.copyExternalImageToTexture(
        { source: backdrop },
        { texture, premultipliedAlpha: true },
        [sceneWidth, sceneHeight],
      );
    };

    const createSurface = (): GlassSurface | null => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgpu");
      if (!context) return null;
      canvas.className = "liquid-glass-canvas";
      canvas.setAttribute("aria-hidden", "true");
      context.configure({ device, format, alphaMode: "premultiplied" });
      const uniforms = device.createBuffer({
        size: uniformData.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });
      const bindings = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: uniforms } },
          { binding: 1, resource: sampler },
          { binding: 2, resource: textureView },
        ],
      });
      return { canvas, context, uniforms, bindings };
    };

    const draw = ({ canvas, context, uniforms, bindings }: GlassSurface, frame: GlassFrame) => {
      const { rect, radius, strength, intensity, press, pointer } = frame;
      const density = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(rect.width * density));
      const height = Math.max(1, Math.round(rect.height * density));
      if (canvas.width !== width) canvas.width = width;
      if (canvas.height !== height) canvas.height = height;
      uniformData.set([
        rect.left, rect.top, rect.width, rect.height,
        window.innerWidth, window.innerHeight, width, height,
        radius, Math.min(30, rect.height * 0.30), strength, intensity,
        pointer.x, pointer.y, press, 0,
      ]);
      device.queue.writeBuffer(uniforms, 0, uniformData);
      const encoder = device.createCommandEncoder();
      const attachment: GPURenderPassColorAttachment = {
        view: context.getCurrentTexture().createView(),
        clearValue: [0, 0, 0, 0],
        loadOp: "clear",
        storeOp: "store",
      };
      const pass = encoder.beginRenderPass({ colorAttachments: [attachment] });
      pass.setPipeline(pipeline);
      pass.setBindGroup(0, bindings);
      pass.draw(3);
      pass.end();
      device.queue.submit([encoder.finish()]);
    };

    return { capture, createSurface, draw, lost: device.lost, dispose: () => device.destroy() };
  } catch (error) {
    device.destroy();
    throw error;
  }
}
