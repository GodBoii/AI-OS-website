import Link from "next/link";
import { Plus, Package } from "lucide-react";
import { FaWindows, FaLinux, FaAndroid } from "react-icons/fa6";
import { downloads } from "../../lib/downloads";
const questions = [
  {
    question: "What exactly is Aetheria?",
    answer:
      "Aetheria is a native AI workspace for conversation, coding, and computer tasks. Bring connected tools and project context into the same place.",
  },
  {
    question: "How do I get started?",
    answer:
      "Choose the client for your platform, install it, and sign in. Open a conversation, a code workspace, or a computer workspace depending on the task.",
  },
  {
    question: "Who controls computer access?",
    answer:
      "The computer workspace has permission and scope controls. Review the requested access in the app before granting it.",
  },
  {
    question: "Can I try it for free?",
    answer:
      "The published Core plan includes 50,000 tokens per day. See the pricing page for current plan details and contact the team about paid-plan availability.",
  },
];
export default function StartScene() {
  return (
    <section
      className="exp-start exp-section"
      id="get-started"
      aria-labelledby="start-title"
    >
      <div className="start-layout">
        <div>
          <h2 id="start-title">Get Aetheria.</h2>
          <p>Choose the installer for your platform.</p>
          <Link className="exp-text-link" href="/pricing">
            Find your plan
          </Link>
        </div>
        <div className="exp-downloads">
          {downloads.map((platform) => (
            <a
              href={platform.href}
              key={platform.id}
              aria-label={
                "Download Aetheria for " +
                platform.name +
                ", " +
                platform.version
              }
            >
              <span className="download-os">
                {platform.id === "windows" ? (
                  <FaWindows />
                ) : platform.id === "linux" ? (
                  <FaLinux />
                ) : (
                  <FaAndroid />
                )}
              </span>
              <div>
                <strong>{platform.name}</strong>
                <span>
                  {platform.version} · {platform.format}
                </span>
              </div>
              <Package size={19} aria-hidden="true" />
            </a>
          ))}
          <Link className="download-details" href="/download">
            Requirements & all downloads
          </Link>
        </div>
      </div>
      <div className="exp-questions">
        <div>
          <span className="exp-kicker">Before you go</span>
          <h3>
            A few good
            <br />
            <em>questions.</em>
          </h3>
          <Link href="/contact">
            Ask us something else
          </Link>
        </div>
        <div>
          {questions.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <Plus size={17} />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
