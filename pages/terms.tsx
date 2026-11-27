import LegalPage, { LegalContact } from "../components/LegalPage";
import styles from "../styles/surface.module.css";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance",
    content: <>
      <p>By initializing the <strong>Aetheria AI OS</strong>, you agree to these terms. This software is provided &quot;as is&quot;, without warranty of any kind.</p>
      <p>We build powerful tools. You agree to use them responsibly.</p>
    </>,
  },
  {
    id: "license",
    title: "License",
    content: <>
      <p>You are granted a limited, non-exclusive, non-transferable license to:</p>
      <ul>
        <li>Install and use the software for personal or internal business purposes.</li>
        <li>Modify the source code if adhering to the accompanied open-source license.</li>
      </ul>
    </>,
  },
  {
    id: "liability",
    title: "Liability",
    content: <>
      <p>In no event shall the authors or copyright holders be liable for any claim, damages, or other liability.</p>
      <p className={styles.legalCallout}><strong>WARNING:</strong> Use of automated agents carries inherent risks. Man-in-the-loop is recommended.</p>
    </>,
  },
  { id: "contact", title: "Legal Contact", content: <LegalContact /> },
];

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      description="Review the terms and conditions for using the Aetheria AI application, platform, and cloud orchestration services."
      version="v1.0.0 · Effective immediately"
      related={{ href: "/privacy-policy", label: "Privacy Policy" }}
      sections={sections}
    />
  );
}
