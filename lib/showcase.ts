export type WorkflowId = "build" | "brief" | "sheet";
export type DemoStep = { action: string; detail: string };
export type DemoWorkflow = {
  id: WorkflowId;
  label: string;
  prompt: string;
  filename: string;
  format: string;
  steps: readonly DemoStep[];
};
export const workflows: readonly DemoWorkflow[] = [
  { id: "build", label: "Build a page", prompt: "Make a landing page for a creative studio. Keep it bold, simple, and a little unexpected.", filename: "studio.html", format: "HTML", steps: [
    { action: "Read the brief", detail: "Creative studio · single page · responsive" },
    { action: "Compose the page", detail: "Layout, typography, and a working contact link" },
    { action: "Prepare the handoff", detail: "Self-contained HTML. Ready to open in a browser." },
  ] },
  { id: "brief", label: "Make a brief", prompt: "Turn these scattered project updates into one clear weekly brief.", filename: "weekly-brief.md", format: "Markdown", steps: [
    { action: "Collect the updates", detail: "Six sample updates across design and engineering" },
    { action: "Separate signal from noise", detail: "Completed work, blockers, and next steps" },
    { action: "Write the brief", detail: "A structured document you can download and edit" },
  ] },
  { id: "sheet", label: "Clean a sheet", prompt: "Clean this contact list. Remove duplicates and put everything in a consistent format.", filename: "contacts.csv", format: "CSV", steps: [
    { action: "Inspect the rows", detail: "Sample contacts with duplicates and inconsistent casing" },
    { action: "Clean and deduplicate", detail: "Normalize email addresses and keep one row per contact" },
    { action: "Export the result", detail: "A clean CSV, ready for your spreadsheet" },
  ] },
];
export const sampleUpdates = [
  { team: "Design", status: "done", note: "Homepage layout approved." },
  { team: "Engineering", status: "done", note: "Installer smoke test passed on Windows." },
  { team: "Design", status: "done", note: "Mobile navigation is ready for review." },
  { team: "Engineering", status: "blocked", note: "Linux build needs a signing decision." },
  { team: "Product", status: "next", note: "Record the onboarding walkthrough." },
  { team: "Engineering", status: "next", note: "Review Android startup performance." },
];
export const sampleContacts = [
  { name: "  Maya Chen ", email: "MAYA@EXAMPLE.COM", role: "Design" },
  { name: "Leo Martins", email: "leo@example.com ", role: "Engineering" },
  { name: "Maya Chen", email: "maya@example.com", role: "Design" },
  { name: " Isha Rao ", email: "isha@example.com", role: "Product" },
  { name: "leo martins", email: "LEO@example.com", role: "Engineering" },
  { name: "Sam Okafor", email: "sam@example.com", role: "Research" },
];
export function cleanContacts() {
  const unique = new Map<string, { name: string; email: string; role: string }>();
  for (const contact of sampleContacts) {
    const email = contact.email.trim().toLowerCase();
    if (!unique.has(email)) unique.set(email, { ...contact, name: contact.name.trim(), email });
  }
  return Array.from(unique.values());
}
const studioPage = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Form Studio</title>
<style>*{box-sizing:border-box}body{margin:0;background:#dce9d4;color:#17221c;font:15px Arial,sans-serif}main{padding:32px;max-width:1100px;margin:auto}nav{display:flex;justify-content:space-between;gap:20px;border-bottom:1px solid #17221c40;padding-bottom:22px;font-size:11px}h1{font-size:clamp(44px,10vw,100px);letter-spacing:-.07em;line-height:.94;margin:64px 0 28px;font-weight:500}h1 em{font-family:Georgia,serif}p{max-width:340px;line-height:1.65;color:#435348}a{display:inline-flex;margin-top:24px;padding:14px 22px;color:#dce9d4;background:#17221c;text-decoration:none;border-radius:3px}a:focus-visible{outline:3px solid #435348;outline-offset:4px}footer{border-top:1px solid #17221c40;margin-top:60px;padding-top:20px;display:flex;justify-content:space-between;font-size:11px}</style></head>
<body><main><nav><strong>form / studio</strong><span>Independent by design.</span></nav><h1>Good ideas.<br><em>Made tangible.</em></h1><p>We shape identities and digital experiences for people with something to say.</p><a href="mailto:hello@example.com">Start a conversation ↗</a><footer><span>Identity · Digital · Art direction</span><span>Sample project / 2026</span></footer></main></body></html>`;
function csvField(value: string) { return '"' + value.replace(/"/g, '""') + '"'; }
export function createArtifact(id: WorkflowId): string {
  if (id === "build") return studioPage;
  if (id === "sheet") return ["Name,Email,Role", ...cleanContacts().map(row => [row.name, row.email, row.role].map(csvField).join(","))].join("\n");
  return ["# Weekly brief", "", ...[
    { status: "done", heading: "Completed" },
    { status: "blocked", heading: "Needs a decision" },
    { status: "next", heading: "Next up" },
  ].flatMap(group => ["## " + group.heading, ...sampleUpdates.filter(update => update.status === group.status).map(update => "- " + update.note + " [" + update.team + "]"), ""])].join("\n");
}
