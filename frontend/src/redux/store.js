
import {configureStore} from '@reduxjs/toolkit';
import {persistCombineReducers, persistStore} from 'redux-persist';
import authApiSlice from './apislices/authapislice';
// import {authReducer} from './authslice';

const config = {
  key: 'root',
  blacklist: ['modalSlice'],
};

const reducer = persistCombineReducers(config, {
  [authApiSlice.reducerPath]: authApiSlice.reducer,
//   authSlice: authReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(authApiSlice.middleware),
});

export const persistor = persistStore(store);
