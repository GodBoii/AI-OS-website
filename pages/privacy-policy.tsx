import { COOKIE_SETTINGS_EVENT } from "../components/CookiePreferences";
import LegalPage, { LegalContact } from "../components/LegalPage";
import styles from "../styles/surface.module.css";

const sections = [
  {
    id: "data-sovereignty",
    title: "Data Sovereignty",
    content: <>
      <p><strong>Aetheria AI</strong> is architected with a strict privacy-first doctrine. We do NOT monetize your personal data.</p>
      <p className={styles.legalCallout}><strong>CORE PRINCIPLE:</strong> Your code, your files, and your keys stay on your machine.</p>
    </>,
  },
  {
    id: "data-collection",
    title: "Data Collection",
    content: <>
      <p>Aetheria uses account data for sign-in and app telemetry for usage reporting.</p>
      <ul>
        <li><strong>Authentication:</strong> Email/ID via Supabase.</li>
        <li><strong>Usage Telemetry:</strong> Anonymized token counts (Inputs/Outputs).</li>
        <li><strong>Errors:</strong> Stack traces for debugging (only if opted-in).</li>
      </ul>
    </>,
  },
  {
    id: "cookies",
    title: "Cookies and website performance",
    content: <>
      <p>Essential storage supports sign-in and saves your cookie choice for up to 180 days.</p>
      <p>If you opt in, Vercel Speed Insights measures a sample of page-load and responsiveness metrics on the homepage, Downloads, and Pricing. You can change your choice at any time through Cookie settings in the footer.</p>
      <button type="button" className={styles.textLink} onClick={(event) => {
        event.currentTarget.focus();
        window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
      }}>Open cookie settings</button>
    </>,
  },
  { id: "contact", title: "Contact Officer", content: <LegalContact /> },
];

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="Learn how Aetheria AI handles and secures your personal information, local files, and data integrations."
      version="Last updated November 2026"
      related={{ href: "/terms", label: "Terms of Service" }}
      sections={sections}
    />
  );
}
