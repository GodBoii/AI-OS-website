import React, { ReactNode } from "react";
import Header from "./homepage/Header";
import Footer from "./homepage/Footer";
import styles from "../styles/surface.module.css";

const Layout = ({ children, surface = false }: { children: ReactNode; surface?: boolean }) => {
  return (
    <div className={`site-shell min-h-screen${surface ? " " + styles.shell : " bg-paper text-ink"}`}>
      <Header streamlined={surface} />

      <main id="main-content" className={surface ? undefined : "interior-content"}>
        {children}
      </main>

      <Footer compact={surface} />
    </div>
  );
};

export default Layout;
