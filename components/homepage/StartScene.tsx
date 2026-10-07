import Link from "next/link";
import { ArrowUpRight, ArrowDown, Plus } from "lucide-react";
import { FaWindows, FaLinux, FaAndroid } from "react-icons/fa6";
import { downloads } from "../../lib/downloads";

const questions = [
  {
    question: "What exactly is Aetheria?",
    answer:
      "Aetheria is a native AI workspace for conversations, coding, and computer tasks. It connects tools and project context so you can direct work from the same place.",
  },
  {
    question: "Where do I start?",
    answer:
      "Download the client for your platform, sign in, and open a conversation. Use the code workspace for repositories and development, or the computer workspace for desktop tasks.",
  },
  {
    question: "Can I try it for free?",
    answer:
      "Yes. The Core plan includes 50,000 tokens per day. Pro and Elite have larger monthly allowances. See the pricing page for the published plan details.",
  },
  {
    question: "Does it work on my device?",
    answer:
      "Windows, Linux, and Android downloads are available. Windows requires Windows 10 or 11 on a 64-bit device. The Android app supports Android 8.0 and above. macOS is currently listed as coming soon.",
  },
  {
    question: "Who controls access to my computer?",
    answer:
      "The computer workspace exposes permission and scope controls. Review the requested access in the app before granting it. You choose what work to direct and which resources to make available.",
  },
];
export default function StartScene() {
  return (
    <section className="start-section stellar-section">
      <div className="start-heading">
        <span className="section-kicker">MAKE YOURSELF AT HOME</span>
        <h2>
          Open it.
          <br />
          <span>Make something happen.</span>
        </h2>
        <p>
          Your next workspace, on your device.
          <br />
          Choose a client to get started.
        </p>
      </div>
      <div className="platform-strip">
        {downloads.map((platform) => (
          <a key={platform.id} href={platform.href}>
            <span className="platform-strip-icon">
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
            <ArrowDown size={18} />
          </a>
        ))}
      </div>
      <div className="start-links">
        <Link href="/download">
          System requirements & all downloads <ArrowUpRight size={15} />
        </Link>
        <Link href="/pricing">
          Find your plan <ArrowUpRight size={15} />
        </Link>
      </div>
      <div className="questions-layout">
        <div>
          <span className="section-kicker">BEFORE YOU JUMP IN</span>
          <h3>
            A few good
            <br />
            questions.
          </h3>
          <Link href="/contact">
            Ask us something else <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="question-list">
          {questions.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <Plus size={18} />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
