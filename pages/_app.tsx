import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { Header } from "../components/Header";
import { AppWrapper } from "../context/state";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <NextUIProvider>
      <SessionProvider session={session}>
        <AppWrapper>
          <Header />
          <Component {...pageProps} />
        </AppWrapper>
      </SessionProvider>
    </NextUIProvider>
  );
}

// noinspection JSUnusedGlobalSymbols
export default MyApp;
