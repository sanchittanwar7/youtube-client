import React, {Component} from 'react';
import './VideoPlay.css'
import {Link} from 'react-router'
import RelatedVideos from './RelatedVideos'

const api_key = 'AIzaSyBHN06Z3do8vR6k8uio_BMqQzPjm-ECFqs'

class VideoPlay extends Component {
	constructor(props){
		super(props);
		this.state = {
			related_video: null
		}
	}

	componentDidMount() {
		const RELATED_VIDEO_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${this.props.params.id}&type=video&maxResults=48&&key=${api_key}`
		fetch(RELATED_VIDEO_URL, {
			method: 'GET'
		})
		.then(response => response.json())
		.then(json => {
			console.log(json)
			this.setState({related_video: json})
			// const artist = json.artist;
			// this.setState({artist, stats: artist.stats, bio: artist.bio, images: artist.image});
		});
	}

	render() {
		var id = this.props.params.id
		console.log(this.props)
		console.log(id)
		var URL
		if(this.props.params.type === 'video')
			URL = `https://www.youtube.com/embed/${id}?autoplay=1&loop=1`
		else
			URL = `http://www.youtube.com/embed?listType=playlist&list=${id}&autoplay=1&loop=1`
		return(
			<div className = "video">
				<div className = "player">

					<iframe width="1280" height="720" src={URL} frameBorder="0" allowFullScreen></iframe>
			          	<Link to = {'/channel/' + this.props.params.cid}>
							<h2>{this.props.params.cname}</h2>
						</Link>

				</div>
					<h2> Related Videos</h2><hr></hr>
				<RelatedVideos
					className = "related-video"
					videos = {this.state.related_video}
				/>
			</div>
		)
	}
}

export default VideoPlay


