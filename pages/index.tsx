import HomePage from "@/components/pages/Home";
import content from "lib/articles.json";
import { Article } from "@types";
import { InferGetStaticPropsType } from "next";

export default function Home({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <HomePage articles={articles} />;
}

export async function getStaticProps() {
  const articles: Article[] = content;

  return {
    props: {
      articles: articles.map(({ title, category, tags, id, author, slug }) => ({
        id,
        title,
        category,
        tags,
        author,
        slug,
      })),
    },
  };
}
