import { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "../components/Layout";
import React from "react";
import AppContextProvider from "../libs/contexts/AppContextProvider";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppContextProvider>
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </AppContextProvider>
    </>
  );
}

export default App;
