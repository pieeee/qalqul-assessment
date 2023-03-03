import React, { useMemo, useState } from "react";
import styles from "@/styles/pages/home.module.scss";
import { Article as TArticle } from "@types";
import Article from "./Article";
import { filterArticles } from "lib/utils/articles";

type ArticleListItem = Omit<TArticle, "content">;

interface HomePageProps {
  articles: ArticleListItem[];
}

const HomePage: React.FC<HomePageProps> = ({ articles }) => {
  const [searchParam, setSearchParam] = useState("");

  const filteredArticles = useMemo(() => {
    return filterArticles(articles, searchParam);
  }, [articles, searchParam]);

  return (
    <div>
      <div className={styles.search_container}>
        <div className={styles.search_group}>
          <input
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            placeholder="Search articles by tite, tag or category"
          />
          {searchParam && (
            <span>
              Found {filteredArticles.length} aritcles based on your search "
              {searchParam}"
            </span>
          )}
        </div>
      </div>

      <ul className={styles.articles}>
        {!searchParam
          ? articles.map((article) => (
              <Article article={article} key={article.id} />
            ))
          : filteredArticles.map((article) => (
              <Article article={article} key={article.id} />
            ))}
      </ul>
    </div>
  );
};

export default HomePage;
