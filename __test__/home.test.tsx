import HomePage from "@/components/pages/Home";
import ArticleCard from "@/components/reusable/Articles/ArticleCard";
import { screen, act, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "lib/store/test-utils";
import articles from "lib/articles.json";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "",
      // ... whatever else you you call on `router`
    };
  },
}));

jest.mock("uuid", () => ({ v4: () => "123456789" }));

describe("Home Page", () => {
  it("should render article card", async () => {
    // useRouter.mockReturnValue({ query: {} });
    await act(async () =>
      renderWithProviders(
        <ArticleCard
          reaction={{ like: 0, comment: 0, dislike: 0 }}
          article={{
            id: 9,
            title: "The Importance of Biodiversity",
            author: "Michael Brown",
            category: "Environment",
            tags: ["biodiversity", "ecosystems", "conservation", "wildlife"],
            content:
              "Biodiversity is the variety of life on Earth, including all of ",
            slug: "the-importance-of-biodiversity",
          }}
        />
      )
    );

    const authorImage = screen.getByRole("img");
    const authorName = screen.getByText(/Michael Brown/i);
    const category = screen.getByText(/Environment/i);
    const tag = screen.getByText(/ecosystems/i);
    const title = screen.getByRole("link", {
      name: /The Importance of Biodiversity/i,
    });

    const reactionButtons = screen.getAllByRole("button");

    expect(authorName).toBeInTheDocument();
    expect(authorImage).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(reactionButtons.length).toBe(3);
  });
  it("should render all the articles", async () => {
    // useRouter.mockReturnValue({ query: {} });
    await act(async () =>
      renderWithProviders(<HomePage articles={articles} />)
    );

    const allArticles = screen.getAllByRole("listitem");
    expect(allArticles.length).toBe(articles.length);
  });
  it("should be searchable by title, tag or category", async () => {
    // useRouter.mockReturnValue({ query: {} });
    await act(async () =>
      renderWithProviders(<HomePage articles={articles} />)
    );

    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "science" } });

    const allArticles = screen.getAllByRole("listitem");
    expect(allArticles.length).toBe(2);

    const searchResultText = screen.getByText(
      /Found 2 aritcles based on your search "science"/i
    );
    expect(searchResultText).toBeInTheDocument();
  });
});
