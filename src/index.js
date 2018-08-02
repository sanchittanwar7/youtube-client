import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './Header';
import VideoPlay from './VideoPlay'
import Search from './Search'
import Channel from './Channel'
import {Router, Route, browserHistory} from 'react-router';

ReactDOM.render(
	
	<Router path = '/' history = {browserHistory} >
		<Route path = '/' component = {Header} />
		<Route path = '/:query' component = {Header} />
		<Route path = '/videoplay/:type/:id/:cname/:cid' component = {VideoPlay} />
		<Route path = '/channel/:id' component = {Channel} />
	</Router>, document.getElementById('root')
);