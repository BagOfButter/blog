import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { PostsReducer } from "./postsReducer/models";
import { postsSagas } from "./postsReducer/models/saga";

// Store with posts reducer

const rootReducer = {
  postsState: PostsReducer,
};

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(postsSagas);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
