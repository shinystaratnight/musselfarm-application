import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducers from './rootReducer';

import { createStorageListener } from '../util/storage-listener';

export const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

window.addEventListener('storage', createStorageListener(store));
