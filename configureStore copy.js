import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducers";
import helloSaga from "./sagas/index";

const rootReducer = combineReducers({
  reducer
});

const persistConfig = {
  key: "root",
  storage: ExpoFileSystemStorage
  //timeout: 1
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/*
// dev tools middleware
const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;
const enhancer = composeEnhancers();
//applyMiddleware(...middleware)
// other store enhancers if any
const store = createStore(reducer, enhancer);
*/
/*
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;
    
*/

const sagaMiddleware = createSagaMiddleware();

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

//const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(persistedReducer /*, enhancer*/);

//sagaMiddleware.run(helloSaga);

export default () => {
  let persistor = persistStore(store);
  return { store, persistor };
};
