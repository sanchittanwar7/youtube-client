import React, {Component} from 'react';
import './List.css'
import {Link} from 'react-router'
import Video from './Video'

class List extends Component {

		constructor(props){
			super(props);
			this.state = {
				clickedVideoId: null
			}
		}

	render() {

		let results = this.props.data



		return (

			<div className = "results">
			{results.map((result, k) => {
				let type = result.kind.split('#')[1]
				return(
					<div
						key = {k}
						className = "result"
					>
					{
						type === 'channel' ? 
							<div className="channel-card">
								<div>
								<img
									src = {result.thumbnails.medium.url}
						            alt = "track"
								/>
								</div>
								<div>
								{result.title}<br></br>
								{result.description}
								</div>
							</div>
						:
							<div className="video-card" onClick = {() => this.setState({clickedVideoId: result.id})}>
								<div>
								<img
									src = {result.thumbnails.medium.url}
						            alt = "track"
								/>
								</div>
								<div>
								{result.title}<br></br>
								{result.description}
								</div>
							</div>
					}

					</div>
				)
			})}
			</div>
	
		)
	
	}
}

export default List;