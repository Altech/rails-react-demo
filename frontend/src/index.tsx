import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactDOMServer from "react-dom/server";
import { Provider } from "react-redux";
import { StyleSheet, StyleSheetServer } from "aphrodite";

import { matchPath } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import createBrowserHistory from "history/createBrowserHistory";
import createMemoryHistory from "history/createMemoryHistory";

import configureStore from "./store/configureStore";
import Router, { routes } from "./router";
import AsyncRoute from "./common/utils/AsyncRoute";
import registerServiceWorker from "./registerServiceWorker";
import {
  generateState,
  APIData
} from "./common/utils/generateStateFromAPIData";

import * as hypernova from "hypernova";

if (typeof window !== "undefined") {
  registerServiceWorker();
}

function server() {
  return (props: APIData) => {
    const initialState = generateState(props);
    const { router } = initialState;
    const memHistory = createMemoryHistory({
      initialEntries: [
        router.queryString
          ? `${router.path}?${router.queryString}`
          : router.path
      ],
      initialIndex: 0,
      keyLength: 6
    });
    const history = memHistory;
    const store = configureStore(history, initialState);

    // NOTE(miyashiro): https://github.com/airbnb/hypernova-aphrodite/blob/v2.1.1/src/index.js
    const { html: contents, css } = StyleSheetServer.renderStatic(() =>
      ReactDOMServer.renderToString(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Router />
          </ConnectedRouter>
        </Provider>
      )
    );

    const style = `<style scoped data-aphrodite="data-aphrodite">${css.content}</style>`;
    const markup = hypernova.serialize("App", contents, props);
    const classNames = hypernova.toScript(
      { "aphrodite-css": "App" },
      css.renderedClassNames
    );

    return `${style}\n${markup}\n${classNames}`;
  };
}

function client() {
  const results = hypernova.load<APIData>("App");
  if (results.length === 0) {
    return;
  }
  // TODO(KentoMoriwaki): Handle multi entires.
  const { node, data } = results[0];

  const history = createBrowserHistory();
  const store = configureStore(history, generateState(data));

  // NOTE(miyashiro): https://github.com/airbnb/hypernova-aphrodite/blob/v2.1.1/src/index.js
  const classNames = hypernova.fromScript({ "aphrodite-css": "App" });
  if (classNames) {
    StyleSheet.rehydrate(classNames);
  }

  function render(Router: React.ComponentType) {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router />
        </ConnectedRouter>
      </Provider>,
      node
    );
  }

  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept(["./router"], () => {
      preload().then(() => {
        render(Router);
      });
    });
  }

  preload().then(() => {
    render(Router);
  });
  return Router;
}

export default hypernova({ server, client });

export function preloadAll() {
  return Promise.all(routes.map(r => r.load()));
}

export async function preload() {
  let matchedRoute: AsyncRoute | undefined;
  const { location: loc } = window;
  const path = loc.search ? `${loc.pathname}?${loc.search}` : loc.pathname;
  routes.some(route => {
    const match = matchPath(path, { path: route.path });
    if (match) {
      matchedRoute = route;
    }
    return match !== null;
  });
  if (matchedRoute) {
    await matchedRoute.load();
  }
}
