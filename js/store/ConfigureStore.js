// store/ConfigureStore.js

import { createStore } from 'redux';
import toggleWebView from './reducers/ToggleReducer'
//import toggleTab from './reducers/ToggleReducer'

export default createStore(toggleWebView)
//export default createStore(toggleTab)