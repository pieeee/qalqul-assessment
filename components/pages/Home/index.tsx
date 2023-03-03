import React from "react";
import styles from "@/styles/pages/home.module.scss";
import { Article } from "@types";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineThumbUp, HiOutlineThumbDown } from "react-icons/hi";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

type ArticleListItem = Omit<Article, "content">;

interface HomePageProps {
  articles: ArticleListItem[];
}

const HomePage: React.FC<HomePageProps> = ({ articles }) => {
  return (
    <div>
      <ul className={styles.articles}>
        {articles.map((article) => (
          <li key={article.id}>
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
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
