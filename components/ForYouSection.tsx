import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Database,
  GitBranch,
  Globe,
  Mail,
  FolderOpen,
  Table2,
  MessageCircle,
} from "lucide-react";
import { BrandMark } from "./homepage/Header";

type Integration = {
  id: string;
  title: string;
  desc: string;
  prompt: string;
  output: string;
  icon: ReactNode;
};
const developerTools: [Integration, ...Integration[]] = [
  {
    id: "github",
    title: "GitHub",
    desc: "Review pull requests, work through issues, and commit code from the same workspace.",
    prompt: "Review the open pull request and explain what changed.",
    output: "Repository context → code review → your next decision",
    icon: <GitBranch />,
  },
  {
    id: "vercel",
    title: "Vercel",
    desc: "Move from a code change to a deployment and keep the build logs with the conversation.",
    prompt: "Deploy this project and show me the build logs.",
    output: "Project → build → deployment preview",
    icon: <Globe />,
  },
  {
    id: "supabase",
    title: "Supabase",
    desc: "Inspect tables, read records, and work on database schemas through the workspace.",
    prompt: "Show me how the tables in this project fit together.",
    output: "Database context → schema overview → a clearer picture",
    icon: <Database />,
  },
];
const everydayTools: [Integration, ...Integration[]] = [
  {
    id: "gmail",
    title: "Gmail",
    desc: "Summarize email threads and prepare replies with the relevant context in view.",
    prompt: "Summarize this thread and draft a short reply.",
    output: "Long thread → key decisions → draft reply",
    icon: <Mail />,
  },
  {
    id: "drive",
    title: "Google Drive",
    desc: "Find project documents and organize files using the way you describe them.",
    prompt: "Find the project notes we were working on last week.",
    output: "Connected files → relevant documents → project context",
    icon: <FolderOpen />,
  },
  {
    id: "sheets",
    title: "Google Sheets",
    desc: "Work through spreadsheet data, prepare charts, and reduce repetitive data entry.",
    prompt: "Look through this spreadsheet and summarize the changes.",
    output: "Spreadsheet → analysis → useful summary",
    icon: <Table2 />,
  },
  {
    id: "whatsapp",
    title: "WhatsApp Business",
    desc: "Bring business conversations into your workflow to summarize messages and prepare responses.",
    prompt: "Collect the open questions from my business messages.",
    output: "Conversation context → open questions → response draft",
    icon: <MessageCircle />,
  },
];

function IntegrationGroup({
  title,
  subtitle,
  items,
  number,
}: {
  title: ReactNode;
  subtitle: string;
  items: [Integration, ...Integration[]];
  number: string;
}) {
  const [selected, setSelected] = useState(items[0]);
  return (
    <section className="integration-group">
      <div className="integration-copy">
        <span className="eyebrow">{number} / CONNECT YOUR WORKING WORLD</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <div className="integration-options" aria-label="Choose an integration">
          {items.map((item) => (
            <button
              key={item.id}
              aria-pressed={selected.id === item.id}
              onClick={() => setSelected(item)}
            >
              {item.icon}
              <span>{item.title}</span>
              <ArrowUpRight size={18} />
            </button>
          ))}
        </div>
        <p className="integration-description" aria-live="polite">
          {selected.desc}
        </p>
      </div>
      <div className="integration-preview">
        <div className="integration-preview-label">
          <span>WORKFLOW EXAMPLE</span>
          <span>↗</span>
        </div>
        <div className="integration-diagram" aria-hidden="true">
          <span className="integration-logo">{selected.icon}</span>
          <span className="integration-wire" />
          <span className="integration-aetheria">
            <BrandMark />
          </span>
        </div>
        <div className="integration-example">
          <span className="eyebrow">YOU + {selected.title.toUpperCase()}</span>
          <p>“{selected.prompt}”</p>
        </div>
        <div className="integration-output">
          <Check size={18} />
          <p>{selected.output}</p>
        </div>
        <span className="integration-disclaimer">
          CONNECT YOUR ACCOUNT IN THE AETHERIA APP.
        </span>
      </div>
    </section>
  );
}
export default function ForYouSection() {
  return (
    <div className="integrations-page section-pad">
      <div className="integrations-intro">
        <span className="eyebrow">DIFFERENT TOOLS. SHARED CONTEXT.</span>
        <h1>
          Less juggling.
          <br />
          More <span className="serif-word">doing.</span>
        </h1>
        <p>Your tools already do a lot. Put them in the same conversation.</p>
      </div>
      <IntegrationGroup
        title={
          <>
            Write code.
            <br />
            <span className="serif-word">Keep moving.</span>
          </>
        }
        subtitle="Bring the repository, the database, and the deployment into one workflow."
        items={developerTools}
        number="01"
      />
      <IntegrationGroup
        title={
          <>
            Get your day
            <br />
            <span className="serif-word">back.</span>
          </>
        }
        subtitle="Work through messages, documents, and spreadsheets without losing the thread."
        items={everydayTools}
        number="02"
      />
      <Link href="/download" className="primary-cta">
        Make it your workspace <ArrowUpRight size={22} />
      </Link>
    </div>
  );
}
