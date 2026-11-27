import type { ReactNode } from "react";
import Link from "next/link";
import Layout from "./Layout";
import SEO from "./SEO";
import SurfaceIntro from "./SurfaceIntro";
import styles from "../styles/surface.module.css";

type Section = { id: string; title: string; content: ReactNode };

export default function LegalPage({ title, description, version, related, sections }: {
  title: string;
  description: string;
  version: string;
  related: { href: string; label: string };
  sections: Section[];
}) {
  return (
    <Layout surface>
      <SEO title={title + " | Aetheria AI"} description={description} />
      <div className={styles.page}>
        <SurfaceIntro>
          <h1>{title}</h1>
          <p>{version}</p>
        </SurfaceIntro>
        <div className={styles.legalGrid}>
          <nav aria-label="On this page" className={styles.legalNav}>
            <h2>On this page</h2>
            <ul>
              {sections.map(({ id, title }) => <li key={id}><a href={"#" + id}>{title}</a></li>)}
            </ul>
            <Link href={related.href} className={styles.textLink}>{related.label}</Link>
          </nav>
          <div className={styles.legalBody}>
            {sections.map(({ id, title, content }) => (
              <section id={id} key={id} aria-labelledby={id + "-heading"}>
                <h2 id={id + "-heading"}>{title}</h2>
                {content}
              </section>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export function LegalContact() {
  return (
    <address className={styles.legalContact}>
      <strong>Prajwal Ghadge</strong>
      <a href="mailto:aetheria.ai28@gmail.com">aetheria.ai28@gmail.com</a>
      <a href="tel:9619039912">9619039912</a>
    </address>
  );
}
