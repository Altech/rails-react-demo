import { createStore, compose, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";

import generateReducer from "../generateReducer";

export default function configureStore(history: any, initialState = {}) {
  // NOTE(miyashiro): For devtools
  const composeEnhancers: typeof compose =
    process.env.NODE_ENV === "development" && typeof window === "object"
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
      : compose;

  const store = createStore(
    generateReducer(),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
  );

  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept(["../generateReducer"], () => {
      store.replaceReducer(generateReducer());
    });
  }

  return store;
}
