import React from "react";
import Header from "./Header";
import styles from "@/styles/shared/layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default Layout;
