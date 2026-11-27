import Image from "next/image";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import SurfaceIntro from "../components/SurfaceIntro";
import styles from "../styles/surface.module.css";

export default function Contact() {
  return (
    <Layout surface>
      <SEO
        title="Say hello | Aetheria AI"
        description="Contact Aetheria AI for product support, partnerships, or a conversation with the founder."
      />
      <div className={styles.page}>
        <SurfaceIntro>
          <h1>Say <em>hello.</em></h1>
          <p>Get in touch about product support, feedback, or working with Aetheria.</p>
        </SurfaceIntro>
        <div className={styles.contactGrid}>
          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading" className={styles.sectionTitle}>Get in touch</h2>
            <div className={styles.contactMethods}>
              <a href="mailto:aetheria.ai28@gmail.com">
                <Mail aria-hidden="true" />
                <span><small>Email</small><strong>aetheria.ai28@gmail.com</strong></span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a href="tel:9619039912">
                <Phone aria-hidden="true" />
                <span><small>Phone</small><strong>96190 39912</strong></span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </section>
          <figure className={styles.contactFounder}>
            <Image src="/Prajwal.jpg" alt="" width={72} height={72} />
            <figcaption><strong>Prajwal Ghadge</strong><span>Founder &amp; developer</span></figcaption>
          </figure>
        </div>
      </div>
    </Layout>
  );
}
