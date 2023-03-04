import React, { useMemo, useState } from "react";
import styles from "@/styles/pages/home.module.scss";
import { Article as TArticle } from "@types";
import { filterArticles } from "lib/utils/articles";
import RegistrationModal from "./RegistrationModal";
import { useAppSelector } from "lib/store/hooks";
import { selectReactions } from "lib/store/slices/article.slice";
import ArticleCard from "../Article/ArticleCard";
import { selectUser } from "lib/store/slices/user.slice";

type ArticleListItem = Omit<TArticle, "content">;

interface HomePageProps {
  articles: ArticleListItem[];
}

const HomePage: React.FC<HomePageProps> = ({ articles }) => {
  const user = useAppSelector(selectUser);
  const reactionsCount = useAppSelector(selectReactions);

  const [searchParam, setSearchParam] = useState("");
  const filteredArticles = useMemo(() => {
    return filterArticles(articles, searchParam);
  }, [articles, searchParam]);

  return (
    <div>
      <RegistrationModal />
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
              <ArticleCard
                article={article}
                key={article.id}
                reaction={reactionsCount[article.slug]}
                userId={user?.id}
              />
            ))
          : filteredArticles.map((article) => (
              <ArticleCard
                article={article}
                key={article.id}
                reaction={reactionsCount[article.slug]}
                userId={user?.id}
              />
            ))}
      </ul>
    </div>
  );
};

export default HomePage;
