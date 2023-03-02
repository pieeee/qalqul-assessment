import "@/styles/main.scss";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import Layout from "@/components/layout";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
