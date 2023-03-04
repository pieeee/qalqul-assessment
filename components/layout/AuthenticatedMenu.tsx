import { IUser } from "@types";
import { useAppSelector } from "lib/store/hooks";
import { selectUser } from "lib/store/slices/user.slice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/styles/shared/layout.module.scss";

const AuthenticatedMenu = ({ user }: { user?: IUser | null }) => {
  if (!user) {
    return <></>;
  }

  return (
    <Link href={"/profile"} className={styles.authenticated_menu}>
      <span>{user.name}</span>
      <Image
        width={40}
        height={40}
        alt="user-profile"
        src={`https://api.dicebear.com/5.x/adventurer/png?seed=${user.name}`}
      />
    </Link>
  );
};

export default AuthenticatedMenu;
