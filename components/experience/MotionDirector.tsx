import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import StarMark from "./StarMark";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const statement = "The good part starts when your idea leaves the chat.";

export default function MotionDirector() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".manifesto-word",
          { opacity: 0.28 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: ".exp-manifesto",
              start: "top 78%",
              end: "bottom 55%",
              scrub: 0.5,
            },
          },
        );
        gsap.fromTo(
          ".manifesto-star",
          { rotate: -40 },
          {
            rotate: 45,
            ease: "none",
            scrollTrigger: {
              trigger: ".exp-manifesto",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
        const fan = root.current
          ?.closest(".experience-home")
          ?.querySelector(".workspace-fan");
        if (fan)
          gsap.fromTo(
            fan,
            { scale: 0.96, y: 25 },
            {
              scale: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: fan,
                start: "top 90%",
                end: "top 55%",
                scrub: 0.5,
              },
            },
          );
      });
      return () => media.revert();
    },
    { scope: root },
  );
  return (
    <div ref={root}>
      <section className="exp-manifesto exp-section" aria-label="Our approach">
        <StarMark className="manifesto-star" />
        <p>
          {statement.split(" ").map((word, i) => (
            <span className="manifesto-word" key={i}>
              {word}{" "}
            </span>
          ))}
        </p>
        <div className="manifesto-note">
          <span>
            A place to think.
            <br />A way to get somewhere.
          </span>
          <span>Your direction stays at the center.</span>
        </div>
      </section>
    </div>
  );
}
