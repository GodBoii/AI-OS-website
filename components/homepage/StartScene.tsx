import Link from "next/link";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { FaWindows, FaLinux, FaAndroid } from "react-icons/fa6";
import { downloads } from "../../lib/downloads";
const questions = [
  {
    question: "What exactly is Aetheria?",
    answer:
      "Aetheria is a native AI workspace for conversation, coding, and computer tasks. Bring connected tools and project context into the same place.",
  },
  {
    question: "Is this demo running a real agent?",
    answer:
      "The playground is an illustrative workflow using sample data. It creates real downloadable files in your browser. Agent work with your own projects happens in the Aetheria application.",
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
          <span className="exp-kicker">Your device. Your next move.</span>
          <h2 id="start-title">
            A little download.
            <br />
            <em>A lot of possibility.</em>
          </h2>
          <p>A workspace for the ideas you keep coming back to.</p>
          <Link className="exp-text-link" href="/pricing">
            Find your plan <ArrowUpRight size={15} />
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
              <ArrowDown size={19} />
            </a>
          ))}
          <Link className="download-details" href="/download">
            Requirements & all downloads <ArrowUpRight size={14} />
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
            Ask us something else <ArrowUpRight size={14} />
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
