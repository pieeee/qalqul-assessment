import React from "react";
import styles from "@/styles/shared/layout.module.scss";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.items_group}>
        <Link href="/" className={styles.brand}>
          Articles
        </Link>
      </div>
    </div>
  );
};

export default Header;
