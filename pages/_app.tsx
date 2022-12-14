import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { Header } from "../components/header";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <NextUIProvider>
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </NextUIProvider>
  );
}

// noinspection JSUnusedGlobalSymbols
export default MyApp;
