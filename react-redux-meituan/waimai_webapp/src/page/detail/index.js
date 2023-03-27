import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { store, history } from "./store/store.js";

import Container from "./Main/Container";





ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Container />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
