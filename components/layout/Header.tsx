import React from "react";
import styles from "@/styles/shared/layout.module.scss";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAppSelector } from "../../lib/store/hooks";
import { selectUser } from "../../lib/store/slices/user.slice";

const AuthenticatedMenu = dynamic(() => import("./AuthenticatedMenu"), {
  ssr: false,
});

const Header = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className={styles.header}>
      <div className={styles.items_group}>
        <Link href="/" className={styles.brand}>
          Articles
        </Link>
        <AuthenticatedMenu user={user} />
      </div>
    </div>
  );
};

export default Header;
