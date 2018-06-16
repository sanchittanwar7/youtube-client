import React, {Component} from 'react';

class VideoPlay extends Component {
	constructor(props){
		super(props);
	}
	render() {
		var id = this.props.id
		var URL
		if(this.props.type === 'video')
			URL = `https://www.youtube.com/embed/${id}?autoplay=1&loop=1`
		else
			URL = `http://www.youtube.com/embed?listType=playlist&list=${id}&autoplay=1&loop=1`
		return(
			<iframe width="1280" height="720" src={URL} frameBorder="0" allowFullScreen></iframe>
		)
	}
}

export default VideoPlay


