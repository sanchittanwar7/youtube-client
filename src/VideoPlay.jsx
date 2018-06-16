import React, {Component} from 'react';
import './VideoPlay.css'

class VideoPlay extends Component {
	constructor(props){
		super(props);
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
			<div className = "player">
				<iframe width="1280" height="720" src={URL} frameBorder="0" allowFullScreen></iframe>
			</div>
		)
	}
}

export default VideoPlay


