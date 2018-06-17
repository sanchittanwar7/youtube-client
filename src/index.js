import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import VideoPlay from './VideoPlay'
import Channel from './Channel'
import {Router, Route, browserHistory} from 'react-router';

ReactDOM.render(
	
	<Router path = '/' history = {browserHistory} >
		<Route path = '/' component = {App} />
		<Route path = '/videoplay/:type/:id/:cname/:cid' component = {VideoPlay} />
		<Route path = '/channel/:id' component = {Channel} />
	</Router>, document.getElementById('root')
);