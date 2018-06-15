import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import List from './List'
import { bake_cookie, read_cookie} from 'sfcookies';

// var YouTube = require('youtube-node');

// var youTube = new YouTube();

// youTube.setKey('AIzaSyBHN06Z3do8vR6k8uio_BMqQzPjm-ECFqs');

var search = require('youtube-search');

var opts = {
	maxResults: 50,
	key: 'AIzaSyBHN06Z3do8vR6k8uio_BMqQzPjm-ECFqs'
};

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			query: read_cookie('title'),
			data: []
		}
	}

	

	search() {
		var app = this
		var title = read_cookie('title');
		search(title, opts, function(err, results) {
			if(err) {
				return console.log(err);
			}
			console.dir(results);
			app.setState({data: results})
		});
		// console.log("YO")
		// youTube.search('The Script', 50, function(error, result) {
		// 	if (error) {
		// 		console.log(error);
		// 	}
		// 	else {
		// 		console.log(result);
		// 	}
		// });
	}

	render() {

		return (
			<div>
				<FormGroup>
					<InputGroup>
						<FormControl
							type = "text"
							placeholder = "Search for an artist"
							value = {this.state.query}
							onChange = {event => {this.setState({query: event.target.value});
						                           bake_cookie('title', event.target.value)}}
							onKeyPress = { event => {
								if(event.key === 'Enter'){
									this.search();
								}
							}}
						/>
						<InputGroup.Addon className =  "searchButton" onClick = {() => this.search()}>
							<Glyphicon glyph = "search"></Glyphicon>
						</InputGroup.Addon>
					</InputGroup>
				</FormGroup>

				<List 
					data = {this.state.data}
				/>
			</div>
		);

	}
}

export default App;