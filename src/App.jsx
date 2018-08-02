import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import List from './List'
import { bake_cookie, read_cookie} from 'sfcookies';
import './App.css'

const api_key = 'AIzaSyBHN06Z3do8vR6k8uio_BMqQzPjm-ECFqs'

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
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
			this.setState({trending_videos: json})
		});
	}

	render() {
		return (
			<List
				data = {this.state.trending_videos}
			/>
		);
	}
}

export default App;