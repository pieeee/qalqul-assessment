import HomePage from "@/components/pages/Home";
import { screen, act, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "lib/store/test-utils";
import { UserProfile } from "@/components/pages/Profile";
import { _createUser } from "./registration.test";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "",
      // ... whatever else you you call on `router`
    };
  },
}));

jest.mock("uuid", () => ({ v4: () => "123456789" }));

describe("profile", () => {
  it("should render and edit user information", async () => {
    await act(async () =>
      renderWithProviders(
        <UserProfile
          user={{
            id: "2b4c24c4-b913-4b3a-b424-057d872cbd62",
            name: "Winston Lowe",
            email: "ahnafhasan.sheikh@gmail.com",
            organization: "KUET",
          }}
        />
      )
    );
    const editButton = screen.getByText(/Edit Profile/i);
    const name = screen.getByText(/Winston Lowe/i);
    const email = screen.getByText(/ahnafhasan.sheikh@gmail.com/i);
    const organization = screen.getByText(/KUET/);

    fireEvent.click(editButton);

    expect(name).not.toBeInTheDocument();
    expect(email).not.toBeInTheDocument();
    expect(organization).not.toBeInTheDocument();

    const registrationForm = screen.getByTestId("user-form");

    const nameInput = screen.getByPlaceholderText("Your full name");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    const emailInput = screen.getByPlaceholderText("your email address");
    fireEvent.change(emailInput, { target: { value: "johndoe@gmail.com" } });

    const organizationInput = screen.getByPlaceholderText("Your organization");
    fireEvent.change(organizationInput, {
      target: { value: "ICS" },
    });
    fireEvent.submit(registrationForm);
    expect(registrationForm).not.toBeInTheDocument();
  });
});
