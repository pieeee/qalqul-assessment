import { screen, act } from "@testing-library/react";
import { renderWithProviders } from "lib/store/test-utils";
import Layout from "../components/layout";

describe("Layout", () => {
  it("should render header brand", async () => {
    await act(async () =>
      renderWithProviders(
        <Layout>
          <></>
        </Layout>
      )
    );

    const brand = screen.getByRole("link", { name: /Articles/i });
    expect(brand).toBeInTheDocument();
  });
});
