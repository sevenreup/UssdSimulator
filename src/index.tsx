import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-simple-keyboard/build/css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UssdProvider } from "./context/UssdContext";
import { BrowserRouter } from "react-router-dom";
import { Provider as PouchDBProvider } from "use-pouchdb";
import PouchDB from "pouchdb-browser";
import { QueryClient, QueryClientProvider } from "react-query";

const configsDB = new PouchDB("configs");
const requestDB = new PouchDB("requests");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchInterval: false,
      cacheTime: 0,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PouchDBProvider
        default="configs"
        databases={{
          configs: configsDB,
          requests: requestDB,
        }}
      >
        <UssdProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UssdProvider>
      </PouchDBProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
