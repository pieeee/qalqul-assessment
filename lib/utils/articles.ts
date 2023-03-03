import { Article } from "@types";

type TArticle = Omit<Article, "content">;

export function filterArticles(
  articles: TArticle[],
  searchParam: string
): TArticle[] {
  const threshold = 0.2; // search threshold

  const normalizedSearch = searchParam.toLowerCase();

  return articles
    .map((article) => {
      const { title, category, tags } = article;
      const normalizedTitle = title.toLowerCase();
      const normalizedCategory = category.toLowerCase();
      const normalizedTags = tags.map((tag) => tag.toLowerCase());

      let matchScore = 0;

      // check for a match in title
      if (normalizedTitle.includes(normalizedSearch)) {
        matchScore += 0.5;
      }

      // check for a match in category
      if (normalizedCategory.includes(normalizedSearch)) {
        matchScore += 0.3;
      }

      // check for a match in tags
      const matchedTags = normalizedTags.filter((tag) =>
        tag.includes(normalizedSearch)
      );
      matchScore += matchedTags.length * 0.2;

      return { article, matchScore };
    })
    .filter(({ matchScore }) => matchScore >= threshold)
    .sort((a, b) => b.matchScore - a.matchScore)
    .map(({ article }) => article);
}
