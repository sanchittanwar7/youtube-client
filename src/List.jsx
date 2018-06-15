import React, {Component} from 'react';
import './List.css'
import VideoPlay from './VideoPlay'

class List extends Component {

		constructor(props){
			super(props);
			this.state = {
				clickedId: null,
				type: null
			}
		}

	render() {

		let results = this.props.data

		{
			if(this.state.clickedId !== null )
				return(
					<div>
					<div>Video</div>
					<VideoPlay
						id = {this.state.clickedId}
						type = {this.state.type}
					/>
					</div>
				)
			else

		

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
									type === 'video' ?
										<div className="video-card" onClick = {() => this.setState({clickedId: result.id, type: 'video'})}>
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
										<div className="playlist-card" onClick = {() => this.setState({clickedId: result.id, type: 'playlist'})}>
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
}

export default List;