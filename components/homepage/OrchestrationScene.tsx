import Link from "next/link";
import {
  ArrowUpRight,
  GitBranch,
  Mail,
  FileSpreadsheet,
  Database,
  FolderOpen,
  Globe,
  Cable,
} from "lucide-react";
const tools = [
  { name: "GitHub", type: "Repositories & code", icon: GitBranch },
  { name: "Gmail", type: "Mail & conversations", icon: Mail },
  { name: "Google Drive", type: "Files & project context", icon: FolderOpen },
  { name: "Supabase", type: "Data & backend", icon: Database },
  {
    name: "Google Sheets",
    type: "Spreadsheets & planning",
    icon: FileSpreadsheet,
  },
  { name: "Vercel", type: "Projects & deployments", icon: Globe },
];
export default function OrchestrationScene() {
  return (
    <section
      className="connections-section studio-section"
      aria-labelledby="connections-title"
    >
      <div className="studio-section-top">
        <span className="studio-label">03 / The connections</span>
        <Cable size={21} />
      </div>
      <div className="connections-layout">
        <div className="connections-copy">
          <h2 id="connections-title">
            YOUR TOOLS.
            <br />
            <span>SAME TEAM.</span>
          </h2>
          <p>
            Your files are over here. Your code is over there. Bring the tools
            you already use into the same conversation.
          </p>
          <Link href="/for-you" className="studio-secondary">
            Explore connected workflows <ArrowUpRight size={18} />
          </Link>
          <div className="connection-receipt">
            <img src="/icon.png" width={30} height={30} alt="" />
            <span>
              Aetheria
              <br />
              <small>The place it comes together</small>
            </span>
            <span aria-hidden="true">↗</span>
          </div>
        </div>
        <div className="connections-list">
          {tools.map((tool, i) => (
            <Link key={tool.name} href="/for-you" className="connection-row">
              <span className="connection-index">0{i + 1}</span>
              <tool.icon size={25} />
              <span>
                {tool.name}
                <small>{tool.type}</small>
              </span>
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
