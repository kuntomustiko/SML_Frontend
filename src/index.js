import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
// Provider akan menghubungkan React App dengan Redux
import {Provider} from 'react-redux'
import {createStore} from 'redux'
// createStore akan mengolah hasil dari combineReducers
import 'bootstrap/dist/css/bootstrap.min.css'
// import hasil combineReducer (belum siap pakai)

import reducers from './config/redux/reducers';
let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.getElementById('root')
)

