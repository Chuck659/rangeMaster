/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import { AsyncStorage } from 'react-native';

import Router from './Router';
import rootSaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, {}, applyMiddleware(sagaMiddleware));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

// then run the saga
sagaMiddleware.run(rootSaga);

// AsyncStorage.setItem(
//   'targets',
//   JSON.stringify([{ name: 'Target 1', address: '192.168.1.100' }])
// )
//   .then(() => AsyncStorage.getItem('targets'))
//   .then(value => console.log(`Value: ${value}`))
//   .catch(e => console.log(`Error: ${e}`));

AsyncStorage.getItem('targets')
  .then(value => console.log(`Value: ${value}`))
  .catch(e => console.log(`Error: ${e}`));

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
]);
