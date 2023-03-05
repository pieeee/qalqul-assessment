import HomePage from "@/components/pages/Home";
import { screen, act, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "lib/store/test-utils";
import articles from "lib/articles.json";
import Layout from "@/components/layout";
import ArticlePage from "@/components/pages/Article";

export const _createUser = async () => {
  await act(async () =>
    renderWithProviders(
      <Layout>
        <ArticlePage article={articles[0]} />
      </Layout>
    )
  );

  const likeButton = screen.getAllByText(/0 Like/i)[0];
  fireEvent.click(likeButton);

  const registrationForm = screen.getByTestId("user-form");

  const nameInput = screen.getByPlaceholderText("Your full name");
  fireEvent.change(nameInput, { target: { value: "John Doe" } });

  const email = screen.getByPlaceholderText("your email address");
  fireEvent.change(email, { target: { value: "johndoe@gmail.com" } });

  const organizationInput = screen.getByPlaceholderText("Your organization");
  fireEvent.change(organizationInput, {
    target: { value: "ICS" },
  });

  fireEvent.submit(registrationForm);
  expect(registrationForm).not.toBeInTheDocument();
};

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "",
      // ... whatever else you you call on `router`
    };
  },
}));

jest.mock("uuid", () => ({ v4: () => "123456789" }));

describe("article", () => {
  it("should open registration form on click any of the reaction button and should be able to create new user.", async () => {
    // useRouter.mockReturnValue({ query: {} });
    await act(async () =>
      renderWithProviders(<HomePage articles={articles} />)
    );
    const likeButton = screen.getAllByText(/0 Like/i)[0];
    fireEvent.click(likeButton);
    const registrationForm = screen.getByTestId("user-form");
    expect(registrationForm).toBeInTheDocument();
  });

  it("should create a new user on registration.", async () => {
    // useRouter.mockReturnValue({ query: {} });
    await _createUser();
  });
  it("should render user info on header", async () => {
    await _createUser();
    // await act(async () => renderWithProviders(<Header />));
    const userImage = screen.getByAltText("user-profile");
    expect(userImage).toBeInTheDocument();
  });

  it("should reaction count change on like", async () => {
    await _createUser();

    const likeButton = screen.getByText(/0 Like/i);

    fireEvent.click(likeButton);
    expect(likeButton).toHaveTextContent(/1 Like/i);

    fireEvent.click(likeButton);
    expect(likeButton).toHaveTextContent(/0 Like/i);
  });

  it("should reaction count change on disLike", async () => {
    await _createUser();

    const dislikeButton = screen.getByText(/0 Dislike/i);

    fireEvent.click(dislikeButton);
    expect(dislikeButton).toHaveTextContent(/1 Dislike/i);

    fireEvent.click(dislikeButton);
    expect(dislikeButton).toHaveTextContent(/0 Dislike/i);
  });
  it("should toggle like and dislike count", async () => {
    await _createUser();
    const likeButton = screen.getByText(/0 Like/i);
    const dislikeButton = screen.getByText(/0 Dislike/i);

    fireEvent.click(dislikeButton);
    expect(dislikeButton).toHaveTextContent(/1 Dislike/i);
    fireEvent.click(likeButton);
    expect(dislikeButton).toHaveTextContent(/0 Dislike/i);

    fireEvent.click(dislikeButton);
    expect(likeButton).toHaveTextContent(/0 Like/i);
    expect(dislikeButton).toHaveTextContent(/1 Dislike/i);
  });

  it("should render comment section", async () => {
    await act(async () =>
      renderWithProviders(<ArticlePage article={articles[0]} />)
    );

    const commentTitle = screen.getByText(/All Comments/i);
    const commentBox = screen.getByPlaceholderText(/post your comment/i);
    const commentBoxButton = screen.getByRole("button", { name: "Comment" });

    expect(commentTitle).toBeInTheDocument();
    expect(commentBox).toBeInTheDocument();
    expect(commentBoxButton).toBeInTheDocument();
  });

  it("should render register form on comment post incase of unauthenticated state", async () => {
    await act(async () =>
      renderWithProviders(<ArticlePage article={articles[0]} />)
    );

    const commentBoxButton = screen.getByRole("button", {
      name: "Comment",
    });
    fireEvent.click(commentBoxButton);
    const registrationForm = screen.getByTestId("user-form");
    expect(registrationForm).toBeInTheDocument();
  });

  it("should be able to post comments and the counters should change", async () => {
    await _createUser();

    const commentTitle = screen.getByText(/All Comments/i);
    const commentBox = screen.getByPlaceholderText(/post your comment/i);
    const commentBoxButton = screen.getByRole("button", { name: "Comment" });
    const commentButton = screen.getByText(/0 Comment/i);

    for (let i = 0; i < 5; i++) {
      fireEvent.change(commentBox, {
        target: { value: `${i} This is a very nice comment` },
      });
      fireEvent.click(commentBoxButton);
    }

    const comments = screen.getAllByRole("listitem");
    expect(comments.length).toBe(5);
    expect(commentTitle).toHaveTextContent("All Comments (5)");
    expect(commentButton).toHaveTextContent(/5 Comment/i);
  });
});
