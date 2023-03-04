import ArticlePage from "@/components/pages/Article";
import { Article } from "@types";
import content from "lib/articles.json";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

const Article = ({
  article,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <ArticlePage article={article} />;
};

export default Article;

export const getStaticPaths: GetStaticPaths = () => {
  const articles: Article[] = content;

  return {
    paths: articles.map((article) => ({ params: { slug: article.slug } })),
    fallback: false,
  };
};

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const articles: Article[] = content;
  const slug = ctx.params?.["slug"] as string;
  const article = articles.filter((article) => article.slug === slug)[0];

  if (!article || !slug) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article: article,
    },
  };
}
