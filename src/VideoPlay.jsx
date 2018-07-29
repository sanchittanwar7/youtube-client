import React, {Component} from 'react';
import './VideoPlay.css'
import { Button, DropdownButton, MenuItem } from 'react-bootstrap'
import { Player } from 'video-react';
import {Link} from 'react-router'
import RelatedVideos from './RelatedVideos'
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-default.css';



const api_key = 'AIzaSyBHN06Z3do8vR6k8uio_BMqQzPjm-ECFqs'


class VideoPlay extends Component {
	constructor(props){
		super(props);
		this.state = {
			related_video: null,
			URL: '',
			format: ''
		}
	}

	componentDidMount() {
		const RELATED_VIDEO_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${this.props.params.id}&type=video&maxResults=48&&key=${api_key}`
		fetch(RELATED_VIDEO_URL, {
			method: 'GET'
		})
		.then(response => response.json())
		.then(json => {
			// console.log(json)
			this.setState({related_video: json})
			// const artist = json.artist;
			// this.setState({artist, stats: artist.stats, bio: artist.bio, images: artist.image});
		});
	}

	download(URL) {
		Alert.error('Download Started', {
	            position: 'top-right',
	            effect: 'bouncyflip',
	            timeout: 5000
	    });
		var url = `http://127.0.0.1:3001/download/${this.props.params.id}/${this.state.format}`
		console.log(url)
		fetch(url, {
			method: 'GET',
			mode: 'no-cors'
		})
		.then(() => {
			Alert.error('Download Complete', {
	            position: 'top-right',
	            effect: 'bouncyflip',
	            timeout: 5000
	        });

		})
	}

	render() {
		var id = this.props.params.id
		// console.log(this.props)
		// console.log(id)
		var URL = ''
		if(this.props.params.type === 'video')
			URL = `https://www.youtube.com/embed/${id}?autoplay=1&loop=1`
		else
			URL = `http://www.youtube.com/embed?listType=playlist&list=${id}&autoplay=1&loop=1`
		return(
			<div className = "video">
				<div className = "player">
					<iframe width="1280" height="720" src={URL} frameBorder="0" allowFullScreen></iframe>
					<div style = {{display: 'flex', justifyContent: 'space-between', 'marginTop': '25px'}}>
			          	<Link to = {'/channel/' + this.props.params.cid}>
							<h2>{this.props.params.cname}</h2>
						</Link>
						<DropdownButton
							bsStyle='danger'
					      title='Download'
					      id='download-dropbox'
					    >
					      <MenuItem onClick = {() => {this.setState({format: 'best'},() => {this.download()}); }}>Best Video</MenuItem>
					      <MenuItem onClick = {() => {this.setState({format: '18'},() => {this.download()}); }}>Average Video</MenuItem>
					      <MenuItem onClick = {() => {this.setState({format: 'worst'},() => {this.download()}); }}>Worst Video</MenuItem>
					      <MenuItem divider />
					      <MenuItem onClick = {() => {this.setState({format: 'bestaudio'},() => {this.download()}); }}>Audio</MenuItem>
					    </DropdownButton>
					</div>

				</div>
				{
					this.props.params.type === 'video' ?
						<div>
						<h2> Related Videos</h2><hr></hr>
						<RelatedVideos
							className = "related-video"
							videos = {this.state.related_video}
						/>
						</div>
						:
						<div></div>
				}
                <Alert stack={{limit: 3}} />
			</div>
		)
	}
}

export default VideoPlay


