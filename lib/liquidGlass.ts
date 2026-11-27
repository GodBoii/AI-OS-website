import { createLiquidGlassRenderer, type GlassSurface } from "./liquidGlassRenderer";

const controls = [
  "button",
  "summary",
  "[role=button]",
  "[data-glass-control]",
  ".primary-cta",
  ".text-cta",
  ".small-cta",
  ".exp-button",
  ".footer-main-link",
  ".exp-footer-social a",
  ".liquid-glass-items a",
  ".site-header .brand",
  ".site-header .desktop-nav a",
  ".site-header .login-link",
].join(",");

type Renderer = NonNullable<Awaited<ReturnType<typeof createLiquidGlassRenderer>>>;
type Layer = GlassSurface & { target: HTMLElement | null };

function controlFor(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  const control = target.closest<HTMLElement>(controls);
  return control && !control.closest(":disabled, [aria-disabled=true], [inert]") ? control : null;
}

function attach(layer: Layer, target: HTMLElement | null) {
  if (layer.target === target) return;
  layer.canvas.remove();
  layer.target?.removeAttribute("data-glass-layer");
  layer.target?.removeAttribute("data-glass-static");
  layer.target = target;
  if (!target) return;
  if (getComputedStyle(target).position === "static") target.setAttribute("data-glass-static", "");
  target.setAttribute("data-glass-layer", "");
  target.append(layer.canvas);
}

function getRadius(element: HTMLElement, rect: DOMRect) {
  const radius = getComputedStyle(element).borderTopLeftRadius;
  const limit = Math.min(rect.width, rect.height) * 0.5;
  const value = parseFloat(radius) || 0;
  return Math.min(limit, radius.endsWith("%") ? limit * value / 50 : value);
}

function bindGlass(root: HTMLElement, renderer: Renderer) {
  const brand = renderer.createSurface("brand");
  const control = renderer.createSurface();
  if (!brand || !control) {
    renderer.dispose();
    return;
  }

  const brandLayer: Layer = { ...brand, target: null };
  const controlLayer: Layer = { ...control, target: null };
  const events = new AbortController();
  const { signal } = events;
  const pointer = { x: 0, y: 0 };
  const light = { x: 0.28, y: 0.14 };
  let hovered: HTMLElement | null = null;
  let focused: HTMLElement | null = null;
  let pressed: HTMLElement | null = null;
  let shown: HTMLElement | null = null;
  let pointerLight = false;
  let frame = 0;
  let lastFrame = 0;
  let lastCapture = -Infinity;
  let glass = 0;
  let compression = 0;

  function schedule() {
    if (!signal.aborted && !document.hidden && !frame) frame = requestAnimationFrame(draw);
  }

  function draw(now: number) {
    frame = 0;
    const delta = lastFrame ? Math.min(now - lastFrame, 64) : 16;
    lastFrame = now;
    const active = [pressed, hovered, focused].find((element) => element?.isConnected) ?? null;
    if (active && shown !== active) {
      shown = active;
      glass = 0.14;
      compression = 0;
    }
    const goal = active ? 1 : 0;
    const pressGoal = pressed?.isConnected ? 1 : 0;
    const approach = (from: number, to: number, speed: number) =>
      from + (to - from) * (1 - Math.exp(-delta / speed));
    glass = approach(glass, goal, goal ? 110 : 165);
    compression = approach(compression, pressGoal, pressGoal ? 70 : 190);
    if ((!active && glass <= 0.02) || !shown?.isConnected) shown = null;

    const isBrand = shown?.hasAttribute("data-glass-brand");
    const layer = isBrand ? brandLayer : controlLayer;
    const changedTarget = layer.target !== shown;
    attach(isBrand ? controlLayer : brandLayer, null);
    attach(layer, shown);
    if (!shown) {
      lastFrame = 0;
      return;
    }

    const anchor = active?.getBoundingClientRect();
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const nextX = anchor && pointerLight ? clamp((pointer.x - anchor.left) / anchor.width) : 0.33;
    const nextY = anchor && pointerLight ? clamp((pointer.y - anchor.top) / anchor.height) : 0.24;
    light.x = approach(light.x, nextX, 78);
    light.y = approach(light.y, nextY, 78);

    const backdrop = root.querySelector<HTMLCanvasElement>("[data-particles=active] [data-glass-backdrop]");
    const backdropBounds = backdrop?.getBoundingClientRect();
    const scene = backdropBounds && backdropBounds.bottom > 0 && backdropBounds.top < window.innerHeight
      ? backdrop
      : null;
    const rect = layer.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height || rect.bottom < 0 || rect.top > window.innerHeight) return;
    if (now - lastCapture >= 32 || changedTarget) {
      renderer.capture(scene, isBrand ? { element: shown, rect } : undefined);
      lastCapture = now;
    }

    renderer.draw(layer, {
      rect,
      radius: getRadius(layer.canvas, rect),
      intensity: glass * (isBrand ? 0.98 : 0.85),
      strength: isBrand ? 39 : 28,
      press: compression,
      pointer: light,
    });

    const moving = Math.max(
      Math.abs(glass - goal), Math.abs(compression - pressGoal),
      Math.abs(light.x - nextX), Math.abs(light.y - nextY),
    ) > 0.02;
    const usesLiveScene = scene && active && !root.querySelector('[data-glass-motion="paused"]');
    if (moving || usesLiveScene) schedule();
    else lastFrame = 0;
  }

  function updatePointer(event: PointerEvent) {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointerLight = true;
    schedule();
  }

  function press(target: EventTarget | null) {
    pressed = controlFor(target);
    if (!pressed) return;
    shown = pressed;
    glass = Math.max(glass, 0.24);
    compression = Math.max(compression, 0.32);
    schedule();
  }

  root.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch") return;
    hovered = controlFor(event.target);
    if (hovered) updatePointer(event);
  }, { signal, passive: true });
  root.addEventListener("pointerout", (event) => {
    if (event.pointerType === "touch" || !hovered) return;
    hovered = controlFor(event.relatedTarget);
    schedule();
  }, { signal, passive: true });
  root.addEventListener("pointermove", (event) => {
    if (hovered || pressed) updatePointer(event);
  }, { signal, passive: true });
  root.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    press(event.target);
    if (pressed) updatePointer(event);
  }, { signal, passive: true });
  function release() {
    if (!pressed) return;
    pressed = null;
    schedule();
  }
  window.addEventListener("pointerup", release, { signal, passive: true });
  window.addEventListener("pointercancel", release, { signal, passive: true });
  window.addEventListener("blur", () => {
    hovered = focused = null;
    release();
    schedule();
  }, { signal });
  root.addEventListener("focusin", (event) => {
    focused = event.target instanceof Element && event.target.matches(":focus-visible") ? controlFor(event.target) : null;
    if (focused) pointerLight = false;
    schedule();
  }, { signal });
  root.addEventListener("focusout", () => {
    focused = null;
    release();
    schedule();
  }, { signal });
  root.addEventListener("keydown", (event) => {
    if (event.repeat || (event.key !== "Enter" && event.key !== " ")) return;
    pointerLight = false;
    press(event.target);
  }, { signal });
  window.addEventListener("keyup", release, { signal });
  window.addEventListener("resize", schedule, { signal, passive: true });
  window.addEventListener("scroll", schedule, { signal, capture: true, passive: true });
  document.addEventListener("visibilitychange", schedule, { signal });
  const observer = new MutationObserver((records) => {
    if (records.some(({ type, addedNodes, removedNodes }) => type === "attributes" ||
      [...Array.from(addedNodes), ...Array.from(removedNodes)].some((node) =>
        node instanceof Element && (node.matches(".site-header") || node.querySelector(".site-header"))
      ))) schedule();
  });
  observer.observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ["aria-expanded", "data-particles", "data-glass-motion"] });
  schedule();

  function dispose() {
    if (signal.aborted) return;
    events.abort();
    cancelAnimationFrame(frame);
    observer.disconnect();
    for (const layer of [brandLayer, controlLayer]) {
      attach(layer, null);
      layer.context.unconfigure();
      layer.uniforms.destroy();
    }
    renderer.dispose();
  }
  void renderer.lost.then(dispose);
  return dispose;
}

export async function mountLiquidGlass(root: HTMLElement, signal: AbortSignal) {
  const renderer = await createLiquidGlassRenderer();
  if (!renderer) return;
  if (signal.aborted) {
    renderer.dispose();
    return;
  }
  const dispose = bindGlass(root, renderer);
  if (dispose) signal.addEventListener("abort", dispose, { once: true });
}
