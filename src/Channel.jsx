import React, { Component } from 'react'
import List from './List'

const api_key = 'AIzaSyBHN06Z3do8vR6k8uio_BMqQzPjm-ECFqs'

class Channel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			video_info: null,
			channel_info: null
		}

	}
	componentWillMount() {
		console.log(this.props.params.id)
		const CHANNEL_URL = `https://www.googleapis.com/youtube/v3/channels?part=snippet&key=${api_key}&id=${this.props.params.id}`
		const VIDEO_URL = `https://www.googleapis.com/youtube/v3/search?key=${api_key}&channelId=${this.props.params.id}&part=snippet,id&order=date&maxResults=50`
		fetch(VIDEO_URL, {
			method: 'GET'
		})
		.then(response => response.json())
		.then(json => {
			console.log(json)
			this.setState({video_info: json})
			// const artist = json.artist;
			// this.setState({artist, stats: artist.stats, bio: artist.bio, images: artist.image});
		});
		fetch(CHANNEL_URL, {
			method: 'GET'
		})
		.then(response => response.json())
		.then(json => {
			console.log(json)
			this.setState({channel_info: json})
			// const artist = json.artist;
			// this.setState({artist, stats: artist.stats, bio: artist.bio, images: artist.image});
		});
	}

	render() {
		let id = this.props.params.id
		let d = new Date()
		return(
			<List
				data = {this.state.video_info}
			/>
		)
	}
}

export default Channel