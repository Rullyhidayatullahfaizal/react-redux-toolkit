import "@/styles/globals.css";

import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import Layout from "@/components/Layout";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { PersistGate } from "redux-persist/integration/react";

const fontHeading = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "700"], // Menambahkan bobot yang tersedia
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Layout>
          <div
            className={cn(
              "antialiased",
              fontHeading.className,
              fontBody.className
            )}
          >
            <Component {...pageProps} />
          </div>
        </Layout>
      </PersistGate>
    </Provider>
  );
}
