/// <reference types="@webgpu/types" />

import { liquidGlassShader } from "./liquidGlassShader";

export type GlassSurface = {
  canvas: HTMLCanvasElement;
  context: GPUCanvasContext;
  uniforms: GPUBuffer;
  bindings: GPUBindGroup;
  kind: "brand" | "control";
};

type BrandBackdrop = { element: HTMLElement; rect: DOMRect };

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

function paintBrand(context: CanvasRenderingContext2D, brand: BrandBackdrop) {
  const icon = brand.element.querySelector(".brand-icon");
  const wordmark = brand.element.querySelector<HTMLElement>("[data-brand-name]");
  if (icon instanceof HTMLImageElement && icon.complete && icon.naturalWidth) {
    const bounds = icon.getBoundingClientRect();
    context.drawImage(icon, bounds.left - brand.rect.left, bounds.top - brand.rect.top, bounds.width, bounds.height);
  } else if (icon instanceof SVGSVGElement) {
    const bounds = icon.getBoundingClientRect();
    const { x, y, width, height } = icon.viewBox.baseVal;
    if (width && height) {
      context.save();
      context.translate(bounds.left - brand.rect.left, bounds.top - brand.rect.top);
      context.scale(bounds.width / width, bounds.height / height);
      context.translate(-x, -y);
      context.fillStyle = context.strokeStyle = getComputedStyle(icon).color;
      for (const circle of Array.from(icon.querySelectorAll("circle"))) {
        context.beginPath();
        context.lineWidth = Number(circle.getAttribute("stroke-width")) || 1;
        context.arc(circle.cx.baseVal.value, circle.cy.baseVal.value, circle.r.baseVal.value, 0, Math.PI * 2);
        context.stroke();
      }
      for (const path of Array.from(icon.querySelectorAll("path"))) {
        context.fill(new Path2D(path.getAttribute("d") ?? ""));
      }
      context.restore();
    }
  }
  if (wordmark) {
    const bounds = wordmark.getBoundingClientRect();
    const style = getComputedStyle(wordmark);
    context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    if ("letterSpacing" in context) context.letterSpacing = style.letterSpacing;
    context.fillStyle = style.color;
    context.textBaseline = "middle";
    context.fillText(wordmark.innerText.trim(), bounds.left - brand.rect.left,
      bounds.top + bounds.height / 2 - brand.rect.top, bounds.width);
  }
}

export async function createLiquidGlassRenderer() {
  const adapter = await navigator.gpu?.requestAdapter();
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
    const createTexture = () => device.createTexture({
      size: [sceneWidth, sceneHeight],
      format: "rgba8unorm",
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
    });
    const textures = { control: createTexture(), brand: createTexture() };
    const views = { control: textures.control.createView(), brand: textures.brand.createView() };
    const uniformData = new Float32Array(16);

    const capture = (scene: HTMLCanvasElement | null, brand?: BrandBackdrop) => {
      backdropContext.clearRect(0, 0, sceneWidth, sceneHeight);
      const scaleX = sceneWidth / (brand?.rect.width ?? window.innerWidth);
      const scaleY = sceneHeight / (brand?.rect.height ?? window.innerHeight);
      backdropContext.save();
      backdropContext.scale(scaleX, scaleY);
      if (scene?.width && scene.height) {
        const rect = scene.getBoundingClientRect();
        backdropContext.drawImage(scene, rect.left - (brand?.rect.left ?? 0), rect.top - (brand?.rect.top ?? 0), rect.width, rect.height);
      }
      if (brand) paintBrand(backdropContext, brand);
      backdropContext.restore();
      device.queue.copyExternalImageToTexture(
        { source: backdrop },
        { texture: brand ? textures.brand : textures.control, premultipliedAlpha: true },
        [sceneWidth, sceneHeight],
      );
    };

    const createSurface = (kind: GlassSurface["kind"] = "control"): GlassSurface | null => {
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
          { binding: 2, resource: views[kind] },
        ],
      });
      return { canvas, context, uniforms, bindings, kind };
    };

    const draw = ({ canvas, context, uniforms, bindings, kind }: GlassSurface, frame: GlassFrame) => {
      const { rect, radius, strength, intensity, press, pointer } = frame;
      const density = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(rect.width * density));
      const height = Math.max(1, Math.round(rect.height * density));
      if (canvas.width !== width) canvas.width = width;
      if (canvas.height !== height) canvas.height = height;
      const local = kind === "brand";
      uniformData.set([
        local ? 0 : rect.left, local ? 0 : rect.top, rect.width, rect.height,
        local ? rect.width : window.innerWidth, local ? rect.height : window.innerHeight, width, height,
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
