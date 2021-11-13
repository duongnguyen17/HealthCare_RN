import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../slices/rootReducer";
import rootSaga from "../sagas/rootSaga";


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => (getDefaultMiddleware().concat(sagaMiddleware))
})
sagaMiddleware.run(rootSaga)
export default store