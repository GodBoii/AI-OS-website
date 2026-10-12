import { useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
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

function IntegrationMachine({ integration }: { integration: Integration }) {
  const machineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(machineRef, { amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();
  const animateSignal = isInView && !prefersReducedMotion;

  return (
    <div
      ref={machineRef}
      className={`integration-machine integration-machine--${integration.id}`}
      aria-hidden="true"
    >
      <svg
        className="integration-machine__routes"
        viewBox="0 0 360 230"
        fill="none"
        focusable="false"
      >
        <path className="integration-machine__grid" d="M30 177 180 218 330 177" />
        <path className="integration-machine__grid" d="M54 153 180 188 306 153" />
        <path className="integration-machine__grid" d="M78 129 180 158 282 129" />
        <path className="integration-machine__grid" d="M104 105 180 127 256 105" />
        <path className="integration-machine__grid" d="M180 80v138" />
        <path className="integration-machine__grid" d="m105 105 75 113" />
        <path className="integration-machine__grid" d="m255 105-75 113" />
        <path
          className="integration-machine__route"
          d="M39 162c39-39 77-47 118-29 36 16 65 6 96-33 21-27 43-33 70-25"
        />
        <path
          className="integration-machine__route"
          d="M53 197c34-35 69-44 104-28 35 16 67 4 94-29 29-35 50-47 78-42"
        />
        <motion.path
          className="integration-machine__signal"
          d="M39 162c39-39 77-47 118-29 36 16 65 6 96-33 21-27 43-33 70-25"
          strokeDasharray="7 13"
          initial={false}
          animate={animateSignal ? { strokeDashoffset: [40, 0] } : { strokeDashoffset: 0 }}
          transition={{
            duration: 2.7,
            ease: "linear",
            repeat: animateSignal ? Infinity : 0,
          }}
        />
        <motion.path
          className="integration-machine__signal integration-machine__signal--delayed"
          d="M53 197c34-35 69-44 104-28 35 16 67 4 94-29 29-35 50-47 78-42"
          strokeDasharray="7 13"
          initial={false}
          animate={animateSignal ? { strokeDashoffset: [0, 40] } : { strokeDashoffset: 0 }}
          transition={{
            duration: 3.2,
            ease: "linear",
            repeat: animateSignal ? Infinity : 0,
          }}
        />
        <circle className="integration-machine__node" cx="39" cy="162" r="4" />
        <circle className="integration-machine__node" cx="323" cy="104" r="4" />
        <circle className="integration-machine__node" cx="53" cy="197" r="4" />
        <circle className="integration-machine__node" cx="329" cy="98" r="2" />
      </svg>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={integration.id}
          className="integration-machine__cube"
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, y: 15, rotateX: -38, rotateY: -10 }
          }
          animate={{ opacity: 1, y: 0, rotateX: -12, rotateY: 24 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, rotateY: 54 }}
          transition={{ type: "spring", stiffness: 210, damping: 22, mass: 0.7 }}
        >
          <div className="integration-machine__face integration-machine__face--front">
            {integration.icon}
          </div>
          <div className="integration-machine__face integration-machine__face--back" />
          <div className="integration-machine__face integration-machine__face--right">
            <BrandMark />
          </div>
          <div className="integration-machine__face integration-machine__face--left" />
          <div className="integration-machine__face integration-machine__face--top">
            <span>{integration.title.slice(0, 3).toUpperCase()}</span>
          </div>
          <div className="integration-machine__face integration-machine__face--bottom" />
        </motion.div>
      </AnimatePresence>
      <span className="integration-machine__caption">CONTEXT ROUTE / ACTIVE</span>
    </div>
  );
}

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
          <IntegrationMachine integration={selected} />
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
