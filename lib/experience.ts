type GuideEvent = { kind: "guide" };

export const GUIDE_EVENT = "aetheria:experience";

export function notifyGuide(event: GuideEvent) {
  window.dispatchEvent(
    new CustomEvent<GuideEvent>(GUIDE_EVENT, { detail: event }),
  );
}

export function isGuideEvent(value: unknown): value is GuideEvent {
  if (typeof value !== "object" || value === null || !("kind" in value))
    return false;
  return value.kind === "guide";
}
