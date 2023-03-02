import React from "react";
import styles from "@/styles/shared/layout.module.scss";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.items_group}>
        <Link href="/" className={styles.brand}>
          Qalqul
        </Link>

        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/login">Create Account</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
