import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import  documentReducer  from './document/Slice';
import  documentSaga  from './document/Saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    document: documentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(documentSaga);

export default store;