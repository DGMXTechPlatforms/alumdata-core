import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { catalogosReducer } from '../reducers/catalogosReducer';
import { aspirantesReducer } from '../reducers/aspirantesReducer';
import { usuariosReducer } from '../reducers/usuariosReducer';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const middlewares = [thunk, logger];

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  catalogos: catalogosReducer,
  aspirantes: aspirantesReducer,
  usuarios: usuariosReducer,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);
