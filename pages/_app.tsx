import "@/styles/main.scss";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import Layout from "@/components/layout";
import { Provider } from "react-redux";
import { store } from "lib/store";
import { saveState } from "lib/store/browser-storage";

store.subscribe(() => saveState(store.getState()));

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className={roboto.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </Provider>
  );
}
