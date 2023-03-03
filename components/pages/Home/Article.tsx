import { Article } from "@types";
import React from "react";
import styles from "@/styles/pages/home.module.scss";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineThumbDown, HiOutlineThumbUp } from "react-icons/hi";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

const Article: React.FC<{ article: Omit<Article, "content"> }> = ({
  article,
}) => {
  return (
    <li>
      <Image
        width={40}
        height={40}
        alt="autor-profile"
        src={`https://api.dicebear.com/5.x/adventurer/png?seed=${article.author}`}
      />
      <div>
        <div className={styles.author}>
          <span>{article.author}</span>
          <span>Mar 3</span>
        </div>

        <div className={styles.tags}>
          {article.tags.map((tag, idx) => (
            <span key={idx}>{tag}</span>
          ))}
        </div>

        <Link href="/">{article.title}</Link>
        <span className={styles.category}>{article.category}</span>

        <div className={styles.button_group}>
          <button>
            <HiOutlineThumbUp />
            <span>0 Like</span>
          </button>

          <button>
            <HiOutlineThumbDown />
            <span>0 Dislike</span>
          </button>

          <button>
            <HiOutlineChatBubbleOvalLeft />
            <span>0 Comment</span>
          </button>
        </div>
      </div>
    </li>
  );
};

export default Article;
