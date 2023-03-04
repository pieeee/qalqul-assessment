import { Article } from "@types";
import React, { useEffect } from "react";
import ArticleCard from "../../reusable/Articles/ArticleCard";
import { useAppSelector } from "lib/store/hooks";
import {
  selectCommentsByArticle,
  selectReactionsByArticle,
} from "lib/store/slices/article.slice";
import { selectUser } from "lib/store/slices/user.slice";
import dynamic from "next/dynamic";
const Comments = dynamic(() => import("./Comments"), { ssr: false });

const ArticlePage = ({ article }: { article: Article }) => {
  const reaction = useAppSelector(selectReactionsByArticle(article.slug));
  const comments = useAppSelector(selectCommentsByArticle(article.slug));
  const user = useAppSelector(selectUser);

  return (
    <>
      <ArticleCard article={article} reaction={reaction} userId={user?.id} />
      <Comments
        comments={comments}
        userId={user?.id}
        articleSlug={article.slug}
      />
    </>
  );
};

export default ArticlePage;
