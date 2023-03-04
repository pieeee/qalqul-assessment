import { Article as ArticleCard } from "@types";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/pages/article.module.scss";
import dynamic from "next/dynamic";
import ArticleReactionsLoading from "./ArticleReactions";

type TArticle = Omit<ArticleCard, "content">;
interface IArticle extends TArticle {
  content?: string;
}

const ArticleReactions = dynamic(() => import("./ArticleReactions"), {
  ssr: false,
  loading: () => (
    <ArticleReactionsLoading
      reaction={{ like: 0, dislike: 0, comment: 0 }}
      //   userId={'userId'}
      articleSlug={""}
    />
  ),
});

const ArticleCard: React.FC<{
  article: IArticle;
  reaction: { like: number; dislike: number; comment: number };
  userId?: string;
}> = ({ article, reaction, userId }) => {
  // const onComment = () => {};

  return (
    <div className={styles.article}>
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

        <Link href={article.slug}>{article.title}</Link>
        <span className={styles.category}>{article.category}</span>

        {article.content && (
          <div className={styles.content}>{article.content}</div>
        )}

        <ArticleReactions
          reaction={reaction}
          userId={userId}
          articleSlug={article.slug}
        />
      </div>
    </div>
  );
};

export default ArticleCard;
