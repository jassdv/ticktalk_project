'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory, IndexRedirect,browserHistory  } from 'react-router'

import store from './store'

//importing components
import AppComponent from './components/App'



ReactDOM.render (
  <Provider store={store} >
    <Router history={hashHistory} >
    	<Route path='/' components={AppComponent} />
    </Router>
  </Provider>,
  document.getElementById('main')
)