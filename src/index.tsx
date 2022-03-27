import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import AccountState from './context/AccountState';
import "./fonts/style.css";
import './index.css';


const client = new ApolloClient({
  uri: 'https://api.mnft.company:65432/graphql/',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <AccountState>
        <App />
      </AccountState>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
