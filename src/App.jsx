import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import List from './List'
// import Trending from './Trending'
import { bake_cookie, read_cookie} from 'sfcookies';
import './App.css'


const api_key = 'AIzaSyBHN06Z3do8vR6k8uio_BMqQzPjm-ECFqs'


// var YouTube = require('youtube-node');

// var youTube = new YouTube();

// youTube.setKey('AIzaSyBHN06Z3do8vR6k8uio_BMqQzPjm-ECFqs');

// var search = require('youtube-search');

// var opts = {
// 	maxResults: 50,
// 	key: 'AIzaSyBHN06Z3do8vR6k8uio_BMqQzPjm-ECFqs'
// };

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			query: '',
			data: [],
			trending_videos: []
		}
	}

	componentWillMount() {
		let FETCH_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&maxResults=25&key=${api_key}`
		fetch(FETCH_URL, {
			method: 'GET'
		})
		.then(response => response.json())
		.then(json => {
			console.log(json)
			this.setState({trending_videos: json})
			// const artist = json.artist;
			// this.setState({artist, stats: artist.stats, bio: artist.bio, images: artist.image});
		});
	}

	

	search() {
		// var app = this
		var title = read_cookie('title');
		// search(title, opts, function(err, results) {
		// 	if(err) {
		// 		return console.log(err);
		// 	}
		// 	console.dir(results);
		// 	app.setState({data: results})
		// });
		// console.log("YO")
		// youTube.search('The Script', 50, function(error, result) {
		// 	if (error) {
		// 		console.log(error);
		// 	}
		// 	else {
		// 		console.log(result);
		// 	}
		// });
		var FETCH_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${title}&key=${api_key}&maxResults=50`
		fetch(FETCH_URL, {
			method: 'GET'
		})
		.then(response => response.json())
		.then(json => {
			console.log(json)
			this.setState({data: json})
			// const artist = json.artist;
			// this.setState({artist, stats: artist.stats, bio: artist.bio, images: artist.image});
		});
	}

	render() {

		return (
			<div>
				<FormGroup className="form">
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

				{
					this.state.data.length != 0 ? 
					<List 
						data = {this.state.data}
					/>
					:
					<List
						data = {this.state.trending_videos}
					/>
				}

				
			</div>
		);

	}
}

export default App;