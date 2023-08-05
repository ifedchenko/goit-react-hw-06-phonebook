import { configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { contactSlice, filterSlice } from './slice';


const persistContactsConfig = {
  key: 'contacts',
  storage,
};

export const contactReducer = persistReducer(
  persistContactsConfig,
  contactSlice.reducer
);

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterSlice.reducer,
  }
});

export const persistor = persistStore(store);

