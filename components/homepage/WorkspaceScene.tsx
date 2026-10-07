import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  MessageSquare,
  Code2,
  Monitor,
  Check,
  Maximize2,
} from "lucide-react";

const workspaces = [
  {
    id: "conversation",
    number: "01",
    label: "Think out loud",
    name: "Conversation",
    icon: MessageSquare,
    image: "/home-page.png",
    title: "A home for your next thought.",
    description:
      "Start a conversation, bring in your files, and keep the context with your project.",
    details: [
      "Conversations and project context",
      "Files alongside your ideas",
    ],
  },
  {
    id: "code",
    number: "02",
    label: "Make the thing",
    name: "Code workspace",
    icon: Code2,
    image: "/coding-worspace.png",
    title: "From an idea to a working project.",
    description:
      "Bring your repository, code, and terminal into the same workspace. Keep building without losing the thread.",
    details: [
      "Repository and terminal workspace",
      "Development alongside conversation",
    ],
  },
  {
    id: "computer",
    number: "03",
    label: "Put it to work",
    name: "Computer workspace",
    icon: Monitor,
    image: "/computer-workspace.png",
    title: "Your desktop joins the conversation.",
    description:
      "Direct computer tasks from Aetheria. Choose the scope and permissions before giving your workspace access.",
    details: [
      "Desktop tasks in the workspace",
      "Scope and permission controls",
    ],
  },
];

export default function WorkspaceScene() {
  const [selected, setSelected] = useState(workspaces[0]);
  return (
    <section
      id="possibilities"
      className="workspace-section studio-section"
      aria-labelledby="workspace-title"
    >
      <div className="studio-section-top">
        <span className="studio-label">01 / The workspace</span>
        <span>One place. A few more possibilities.</span>
      </div>
      <div className="studio-heading">
        <h2 id="workspace-title">
          THERE'S A WHOLE
          <br />
          <span>COMPUTER IN HERE.</span>
        </h2>
        <p>
          Some days you're thinking.
          <br />
          Some days you're building.
          <br />
          Your workspace should keep up.
        </p>
      </div>
      <div
        className="workspace-selector"
        aria-label="Choose a workspace preview"
      >
        {workspaces.map((item) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={selected.id === item.id}
            aria-controls="workspace-preview"
            onClick={() => setSelected(item)}
          >
            <span className="workspace-number">{item.number}</span>
            <item.icon size={20} />
            <span>
              {item.label}
              <small>{item.name}</small>
            </span>
            <ArrowUpRight size={18} />
          </button>
        ))}
      </div>
      <div className="workspace-preview" id="workspace-preview">
        <div className="workspace-chrome">
          <span>
            <Image src="/icon.png" width={20} height={20} alt="" /> Aetheria /{" "}
            {selected.name}
          </span>
          <a
            href={selected.image}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open full-size ${selected.name.toLowerCase()} screenshot in a new tab`}
          >
            Full-size screenshot <Maximize2 size={14} />
          </a>
        </div>
        <div className="workspace-image">
          <Image
            key={selected.id}
            src={selected.image}
            alt={`Aetheria ${selected.name.toLowerCase()} showing the actual application interface`}
            width={1920}
            height={1080}
            sizes="(max-width: 1440px) 90vw, 1300px"
          />
        </div>
        <div className="workspace-explanation" aria-live="polite">
          <div>
            <span className="studio-label">Your workspace, your direction</span>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
          </div>
          <ul>
            {selected.details.map((detail) => (
              <li key={detail}>
                <Check size={15} />
                {detail}
              </li>
            ))}
          </ul>
          <Link href="/for-you" aria-label="Explore Aetheria workflows">
            <ArrowRight size={24} />
          </Link>
        </div>
      </div>
      <div className="workspace-footnote">
        <span>Real screenshots. Choose a workspace to look inside.</span>
        <Link href="/for-you">
          Find your kind of work <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
