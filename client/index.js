import React from "react";
import ReactDOM from "react-dom";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { HashRouter } from "react-router-dom";
import App from "./components/App";
import "../public/style.scss"; 
import "../public/gods.scss";

const cache = new InMemoryCache({
  dataIdFromObject: (object) => object.id || null,
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
})

const Root = () => {
  document.body.classList.add(
    `${document.location.hash.replace(/^#\/|(?<=\w)\/.*$/g, "")}_body`
  );
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
