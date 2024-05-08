import { configureStore } from "@reduxjs/toolkit";
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
import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice";

const contactsPersistConfig = {
  key: "contacts",
  storage,
  whitelist: ["cont"],
};

const pContactsReducer = persistReducer(contactsPersistConfig, contactsReducer);

const filtersPersistConfig = {
  key: "filters",
  storage,
  whitelist: ["filt"],
};

const pFiltersReducer = persistReducer(filtersPersistConfig, filtersReducer);

export const store = configureStore({
  reducer: {
    contacts: pContactsReducer,
    filters: pFiltersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
