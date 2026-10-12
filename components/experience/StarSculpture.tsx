import { useEffect, useRef, useState } from "react";
import { RotateCw } from "lucide-react";
import StarMark from "./StarMark";

export default function StarSculpture() {
  const hostRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;
    async function setup() {
      const [THREE, { RoomEnvironment }] = await Promise.all([
        import("three"),
        import("three/examples/jsm/environments/RoomEnvironment.js"),
      ]);
      if (cancelled || !host) return;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2", {
        alpha: true,
        antialias: true,
      });
      if (!context) return;
      const renderer = new THREE.WebGLRenderer({
        canvas,
        context,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.65;
      host.appendChild(canvas);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
      camera.position.set(0, 0, 10.5);
      const room = new RoomEnvironment();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environment = pmrem.fromScene(room, 0.04);
      scene.environment = environment.texture;
      room.dispose();
      pmrem.dispose();

      const shape = new THREE.Shape();
      shape.moveTo(0, 2.8);
      shape.bezierCurveTo(0.13, 0.9, 0.9, 0.13, 2.8, 0);
      shape.bezierCurveTo(0.9, -0.13, 0.13, -0.9, 0, -2.8);
      shape.bezierCurveTo(-0.13, -0.9, -0.9, -0.13, -2.8, 0);
      shape.bezierCurveTo(-0.9, 0.13, -0.13, 0.9, 0, 2.8);
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.32,
        bevelEnabled: true,
        bevelSegments: 12,
        steps: 1,
        bevelSize: 0.075,
        bevelThickness: 0.15,
        curveSegments: 64,
      });
      geometry.center();
      const metal = new THREE.MeshPhysicalMaterial({
        color: 0xe0e4e7,
        metalness: 1,
        roughness: 0.18,
        clearcoat: 0.7,
        clearcoatRoughness: 0.12,
      });
      const sculpture = new THREE.Group();
      sculpture.add(new THREE.Mesh(geometry, metal));
      const ringGeometry = new THREE.TorusGeometry(1.76, 0.023, 12, 160);
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0xabb5ba,
        metalness: 1,
        roughness: 0.24,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.y = 0.4;
      sculpture.add(ring);
      sculpture.rotation.set(0.2, -0.48, -0.32);
      scene.add(sculpture);
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const key = new THREE.DirectionalLight(0xffffff, 6);
      key.position.set(-3, 4, 5);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xdbf5bf, 3);
      rim.position.set(4, -1, -2);
      scene.add(rim);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      let targetX = 0.2;
      let targetY = -0.48;
      let targetZ = -0.32;
      let frame = 0;
      let visible = true;
      let framesLeft = 0;
      let contextLost = false;
      let drag: {
        x: number;
        y: number;
        rotationX: number;
        rotationY: number;
      } | null = null;
      function render() {
        frame = 0;
        if (!visible || document.hidden || cancelled || contextLost) return;
        sculpture.rotation.x += (targetX - sculpture.rotation.x) * 0.08;
        sculpture.rotation.y += (targetY - sculpture.rotation.y) * 0.08;
        sculpture.rotation.z += (targetZ - sculpture.rotation.z) * 0.07;
        renderer.render(scene, camera);
        if (framesLeft-- > 0 && !reduced.matches)
          frame = requestAnimationFrame(render);
      }
      function requestRender() {
        framesLeft = reduced.matches ? 0 : 65;
        if (!frame && visible && !document.hidden && !contextLost)
          frame = requestAnimationFrame(render);
      }
      function resize() {
        if (!host) return;
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        requestRender();
      }
      function move(event: PointerEvent) {
        if (reduced.matches || event.pointerType !== "mouse" || !host) return;
        if (drag) {
          targetY = drag.rotationY + (event.clientX - drag.x) * 0.009;
          targetX = drag.rotationX + (event.clientY - drag.y) * 0.009;
          requestRender();
          return;
        }
        const bounds = host.getBoundingClientRect();
        targetY =
          -0.48 + ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.42;
        targetX =
          0.2 + ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.24;
        requestRender();
      }
      function leave() {
        if (drag) return;
        targetX = 0.2;
        targetY = -0.48;
        requestRender();
      }
      function grab(event: PointerEvent) {
        if (
          reduced.matches ||
          event.pointerType !== "mouse" ||
          event.button !== 0 ||
          !host
        )
          return;
        drag = {
          x: event.clientX,
          y: event.clientY,
          rotationX: targetX,
          rotationY: targetY,
        };
        host.setPointerCapture(event.pointerId);
        host.classList.add("is-grabbing");
      }
      function release(event: PointerEvent) {
        drag = null;
        host?.classList.remove("is-grabbing");
        if (host?.hasPointerCapture(event.pointerId))
          host.releasePointerCapture(event.pointerId);
      }
      function loseContext(event: Event) {
        event.preventDefault();
        contextLost = true;
        cancelAnimationFrame(frame);
        frame = 0;
        if (!cancelled) setReady(false);
      }
      function restoreContext() {
        contextLost = false;
        if (!cancelled) {
          setReady(true);
          requestRender();
        }
      }
      function visibility() {
        if (document.hidden) {
          cancelAnimationFrame(frame);
          frame = 0;
        } else requestRender();
      }
      spinRef.current = () => {
        if (reduced.matches) return;
        targetZ += Math.PI / 2;
        requestRender();
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      const observer = new IntersectionObserver(([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible) requestRender();
        else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      });
      observer.observe(host);
      host.addEventListener("pointermove", move);
      host.addEventListener("pointerleave", leave);
      host.addEventListener("pointerdown", grab);
      host.addEventListener("pointerup", release);
      host.addEventListener("pointercancel", release);
      canvas.addEventListener("webglcontextlost", loseContext);
      canvas.addEventListener("webglcontextrestored", restoreContext);
      document.addEventListener("visibilitychange", visibility);
      reduced.addEventListener("change", requestRender);
      resize();
      setReady(true);
      dispose = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        observer.disconnect();
        host.removeEventListener("pointermove", move);
        host.removeEventListener("pointerleave", leave);
        host.removeEventListener("pointerdown", grab);
        host.removeEventListener("pointerup", release);
        host.removeEventListener("pointercancel", release);
        canvas.removeEventListener("webglcontextlost", loseContext);
        canvas.removeEventListener("webglcontextrestored", restoreContext);
        document.removeEventListener("visibilitychange", visibility);
        reduced.removeEventListener("change", requestRender);
        spinRef.current = null;
        geometry.dispose();
        ringGeometry.dispose();
        metal.dispose();
        ringMaterial.dispose();
        environment.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        canvas.remove();
      };
    }
    void setup().catch(() => {
      // The brand mark remains visible when WebGL is unavailable.
      if (!cancelled) setReady(false);
      dispose?.();
    });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <div className={`star-sculpture ${ready ? "is-ready" : ""}`}>
      <div className="star-render" ref={hostRef} aria-hidden="true" />
      <StarMark className="star-fallback" />
      {ready && (
        <button
          className="star-spin"
          type="button"
          onClick={() => spinRef.current?.()}
          aria-label="Rotate the 3D Aetheria star"
        >
          <RotateCw size={16} />
          <span>Give it a spin</span>
        </button>
      )}
    </div>
  );
}
