// setting up a React application with Redux for state management and Redux Persist for persisting the state
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit"; //state management
import { Provider } from "react-redux"; //state management
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";


// sets up Redux Persist to store the Redux state in local storage
const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);

// creates the Redux store with the persisted reducer and configures middleware to ignore certain Redux Persist actions
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// creates a React root using the new React 18 createRoot API
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Redux Provider to make the store available to all components */}
    <Provider store={store}> 
    {/* PersistGate to delay the rendering of the app's UI until the persisted state has been retrieved and saved to Redux */}
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
