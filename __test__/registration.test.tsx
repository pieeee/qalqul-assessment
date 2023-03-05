import HomePage from "@/components/pages/Home";
import { screen, act, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "lib/store/test-utils";
import articles from "lib/articles.json";
import Layout from "@/components/layout";

export const _createUser = async () => {
  await act(async () =>
    renderWithProviders(
      <Layout>
        <HomePage articles={articles} />
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

describe("registration", () => {
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
});
