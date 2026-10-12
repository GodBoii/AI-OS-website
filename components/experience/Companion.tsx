import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { GUIDE_EVENT, isGuideEvent } from "../../lib/experience";
import StarMark from "./StarMark";

const welcome =
  "I’m your little wayfinder. Want to watch a task take shape, explore the workspace, or find your download?";
const tour = [
  {
    id: "playground",
    message:
      "Start here. Pick an example and run it. You can pause, inspect the source, and download the finished file.",
  },
  {
    id: "workspaces",
    message:
      "These are the different places your work can happen. Select a panel to explore conversation, code, computer tasks, or connected tools.",
  },
  {
    id: "compare",
    message:
      "Choose an assistant to read about its approach. The source links explain its documented capabilities.",
  },
  {
    id: "get-started",
    message:
      "Your next step is a download. Choose your platform, or open the download page for requirements.",
  },
];

export default function Companion() {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const [message, setMessage] = useState(welcome);
  const [tourStep, setTourStep] = useState<number | null>(null);
  const [voice, setVoice] = useState(false);
  const [speechAvailable, setSpeechAvailable] = useState(false);
  const [speechError, setSpeechError] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const dismissed = useRef(false);
  const openRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);
  useEffect(() => {
    setSpeechAvailable("speechSynthesis" in window);
    try {
      dismissed.current =
        sessionStorage.getItem("aetheria-guide-dismissed") === "true";
    } catch {
      /* In-memory preference still works when storage is unavailable. */
    }
    function receive(event: Event) {
      if (!(event instanceof CustomEvent)) return;
      const detail: unknown = event.detail;
      if (!isGuideEvent(detail)) return;
      if (detail.kind === "guide") {
        setOpen(true);
        setHint(false);
        setMessage(welcome);
        setTourStep(null);
        return;
      }
      if (detail.kind === "selected")
        setMessage(
          detail.name +
            " is ready. Press play to see the example. Its output is created locally in your browser.",
        );
      if (detail.kind === "started")
        setMessage(
          "Watch the timeline as " +
            detail.name.toLowerCase() +
            " runs. You can pause it or cancel at any time.",
        );
      if (detail.kind === "completed")
        setMessage(
          "There it is. Your " +
            detail.name.toLowerCase() +
            " example is complete. Open the source or download the file using the controls below the preview.",
        );
      if (detail.kind === "cancelled")
        setMessage("Stopped. Pick another example whenever you’re ready.");
    }
    window.addEventListener(GUIDE_EVENT, receive);
    let timer: ReturnType<typeof setTimeout>;
    let offered = false;
    function scheduleHint() {
      clearTimeout(timer);
      if (offered || dismissed.current) return;
      timer = setTimeout(() => {
        const active = document.activeElement;
        if (
          document.hidden ||
          !document.hasFocus() ||
          openRef.current ||
          active?.matches("input, textarea, select, [contenteditable=true]")
        )
          return;
        offered = true;
        setHint(true);
      }, 20000);
    }
    scheduleHint();
    window.addEventListener("pointerdown", scheduleHint, { passive: true });
    window.addEventListener("scroll", scheduleHint, { passive: true });
    window.addEventListener("keydown", scheduleHint);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(GUIDE_EVENT, receive);
      window.removeEventListener("pointerdown", scheduleHint);
      window.removeEventListener("scroll", scheduleHint);
      window.removeEventListener("keydown", scheduleHint);
      document
        .querySelector(".is-guide-target")
        ?.classList.remove("is-guide-target");
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target))
        setOpen(false);
    }
    window.addEventListener("keydown", key);
    window.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("keydown", key);
      window.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  useEffect(() => {
    if (!speechAvailable) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    if (!voice || !open || document.hidden) return;
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 1.03;
    utterance.lang = "en";
    utterance.onerror = (event) => {
      if (event.error !== "interrupted" && event.error !== "canceled") {
        setSpeechError(true);
        setVoice(false);
      }
    };
    const stopWhenHidden = () => {
      if (document.hidden) synth.cancel();
    };
    document.addEventListener("visibilitychange", stopWhenHidden);
    synth.speak(utterance);
    return () => {
      synth.cancel();
      document.removeEventListener("visibilitychange", stopWhenHidden);
    };
  }, [message, voice, open, speechAvailable]);

  useEffect(() => {
    if (!open)
      document
        .querySelector(".is-guide-target")
        ?.classList.remove("is-guide-target");
  }, [open]);

  function dismiss() {
    setOpen(false);
    setHint(false);
    setTourStep(null);
    dismissed.current = true;
    try {
      sessionStorage.setItem("aetheria-guide-dismissed", "true");
    } catch {
      /* Keep the dismissal in memory. */
    }
    trigger.current?.focus();
  }
  function visit(index: number) {
    const step = tour[index];
    if (!step) return;
    setTourStep(index);
    setMessage(step.message);
    document
      .querySelector(".is-guide-target")
      ?.classList.remove("is-guide-target");
    const section = document.getElementById(step.id);
    section?.classList.add("is-guide-target");
    section?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return (
    <div className="companion" ref={root}>
      {hint && !open && (
        <div className="companion-hint">
          <button
            type="button"
            onClick={() => {
              setOpen(true);
              setHint(false);
            }}
          >
            Need a hand finding your next move? <ArrowUpRight size={13} />
          </button>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss guide suggestion"
          >
            <X size={13} />
          </button>
        </div>
      )}
      {open && (
        <aside className="companion-panel" aria-label="Aetheria wayfinder">
          <div className="companion-heading">
            <span>
              <StarMark />
              Your wayfinder
            </span>
            <div>
              {speechAvailable && (
                <button
                  type="button"
                  aria-pressed={voice}
                  aria-label={voice ? "Mute guide voice" : "Enable guide voice"}
                  onClick={() => {
                    setVoice(!voice);
                    setSpeechError(false);
                  }}
                >
                  {voice ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
              )}
              <button type="button" onClick={dismiss} aria-label="Close guide">
                <X size={17} />
              </button>
            </div>
          </div>
          <p aria-live="polite">{message}</p>
          {speechError && (
            <span className="guide-speech-error">
              Voice is unavailable in this browser. Text guidance still works.
            </span>
          )}
          {tourStep === null ? (
            <div className="companion-actions">
              <button type="button" onClick={() => visit(0)}>
                Show me around <ArrowRight size={15} />
              </button>
              <a href="#playground" onClick={() => visit(0)}>
                Take me to the demo <ArrowUpRight size={14} />
              </a>
              <Link href="/download">
                Find my download <ArrowUpRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="companion-tour">
              <button
                type="button"
                disabled={tourStep === 0}
                onClick={() => visit(tourStep - 1)}
                aria-label="Previous tour stop"
              >
                <ChevronLeft size={17} />
              </button>
              <span>
                {tourStep + 1} / {tour.length}
              </span>
              {tourStep === tour.length - 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    setTourStep(null);
                    setMessage("You’re all set. Explore at your own pace.");
                    document
                      .querySelector(".is-guide-target")
                      ?.classList.remove("is-guide-target");
                  }}
                >
                  Finish <ArrowUpRight size={15} />
                </button>
              ) : (
                <button type="button" onClick={() => visit(tourStep + 1)}>
                  Next <ArrowRight size={15} />
                </button>
              )}
            </div>
          )}
          <span className="companion-footer">
            {voice
              ? "Voice on. You can mute it anytime."
              : "Quiet by default. Voice is optional."}
          </span>
        </aside>
      )}
      <button
        className={open ? "companion-trigger is-open" : "companion-trigger"}
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close Aetheria guide" : "Open Aetheria guide"}
        onClick={() => {
          if (open) dismiss();
          else setOpen(true);
          setHint(false);
        }}
      >
        <StarMark />
        <span>{open ? "Close" : "A little help?"}</span>
      </button>
    </div>
  );
}
