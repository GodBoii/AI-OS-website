import Link from "next/link";
import {
  ArrowUpRight,
  GitBranch,
  Mail,
  FileSpreadsheet,
  Database,
  FolderOpen,
  Globe,
} from "lucide-react";

const tools = [
  { name: "GitHub", icon: GitBranch },
  { name: "Gmail", icon: Mail },
  { name: "Google Drive", icon: FolderOpen },
  { name: "Supabase", icon: Database },
  { name: "Google Sheets", icon: FileSpreadsheet },
  { name: "Vercel", icon: Globe },
];
export default function OrchestrationScene() {
  return (
    <section className="connected-section stellar-section">
      <div className="connected-heading">
        <span className="section-kicker">
          EVERYTHING IN THE SAME CONVERSATION
        </span>
        <h2>
          Good tools.
          <br />
          <span>Better together.</span>
        </h2>
        <p>
          Your work already lives in a dozen places.
          <br />
          Aetheria connects the dots.
        </p>
        <Link href="/for-you" className="stellar-text-link">
          Find your integrations <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="tool-constellation">
        <div className="constellation-center">
          <img src="/icon.png" width={90} height={90} alt="Aetheria" />
          <span>SHARED CONTEXT</span>
        </div>
        <div className="tool-grid">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href="/for-you"
              className="constellation-tool"
            >
              <tool.icon size={22} />
              <span>{tool.name}</span>
              <ArrowUpRight size={12} />
            </Link>
          ))}
        </div>
        <div className="constellation-orbit" aria-hidden="true" />
        <div className="constellation-orbit orbit-two" aria-hidden="true" />
      </div>
    </section>
  );
}
