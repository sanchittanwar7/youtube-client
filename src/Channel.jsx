import React, { Component } from 'react'
import List from './List'
import './Channel.css'
import Header from './Header'

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
			console.log(this.state.video_info)
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

		return(
			<div>
				<Header 
					no = 'true'	
				/>
				{
					this.state.channel_info === null ?
						<div></div>
					:
						<div className = "header">
							<div className = "header-image">
								<img 
									src = {this.state.channel_info.items[0].snippet.thumbnails.default.url}
									alt = ""
								/>
							</div>
							<div className = "header-info">
								<h2>{this.state.channel_info.items[0].snippet.localized.title}</h2>
								<p>{this.state.channel_info.items[0].snippet.localized.description}</p>
							</div>
						</div>					
				}

				<List
					data = {this.state.video_info === null ? [] : this.state.video_info.items}
				/>
			</div>
		)
	}
}

export default Channel