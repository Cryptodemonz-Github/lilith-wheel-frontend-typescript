import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

declare let window: any;
declare let ethereum: any;

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
