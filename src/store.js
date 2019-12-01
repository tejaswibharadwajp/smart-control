import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers/reducers';
import sagas from './sagas/sagas';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),

    );
sagaMiddleware.run(sagas);

// const action = type => store.dispatch({type})
