import React from "react";
import styles from "@/styles/shared/layout.module.scss";
import Link from "next/link";
import useScrollTop from "lib/hooks/useScrollTop";
import cn from "classnames";

const Header = () => {
  const scrollTop = useScrollTop();

  console.log(scrollTop);

  return (
    <div
      className={cn(styles.header, {
        [styles.scroll]: scrollTop > 20,
      })}
    >
      <div className={styles.items_group}>
        <Link href="/" className={styles.brand}>
          Qalqul
        </Link>
        {/* <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/login">Create Account</Link>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default Header;
