// pages/_app.js

import { ApolloProvider } from "@apollo/client";
import App from "next/app";
import client from "../src/apollo-client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
