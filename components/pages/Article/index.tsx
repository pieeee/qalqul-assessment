import { Article } from "@types";
import React from "react";
import ArticleCard from "./ArticleCard";
import { useAppSelector } from "lib/store/hooks";
import {
  selectCommentsByArticle,
  selectReactionsByArticle,
} from "lib/store/slices/article.slice";
import { selectUser } from "lib/store/slices/user.slice";
import Comments from "./Comments";

const ArticlePage = ({ article }: { article: Article }) => {
  const reaction = useAppSelector(selectReactionsByArticle(article.slug));
  const comments = useAppSelector(selectCommentsByArticle(article.slug));
  const user = useAppSelector(selectUser);

  console.log({ comments });

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
