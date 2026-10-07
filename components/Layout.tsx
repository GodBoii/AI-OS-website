import React, { ReactNode } from "react";
import Header from "./homepage/Header";
import Footer from "./homepage/Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="site-shell min-h-screen bg-paper text-ink">
      <Header />

      <main id="main-content" className="interior-content">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
