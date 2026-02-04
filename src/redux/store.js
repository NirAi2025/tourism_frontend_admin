import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import ReducerDataHandle from './ReducerDataHandle';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
  }

const rootReducer = combineReducers({ 
    ReducerDataHandle: ReducerDataHandle,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
  })

  export const persistor = persistStore(store)