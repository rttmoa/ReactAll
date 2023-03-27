import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux"
import { store, history } from "./store.js";
import { ConnectedRouter } from "react-router-redux";

import Container from "./Main/Container";





ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Container />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
