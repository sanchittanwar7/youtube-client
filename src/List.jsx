import React, {Component} from 'react';
import './List.css'
// import VideoPlay from './VideoPlay'
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap'
import {Link} from 'react-router'
// import {browserHistory} from 'react-router'

class List extends Component {

		constructor(props){
			super(props);
			this.state = {
				clickedId: null,
				type: null, 
				current_time: new Date(),
				video_publish_time: null,
				time_difference: null
			}
		}

	render() {
		let results
		// console.log(this.props.data)
		if(this.props.data === null)
			return(<div></div>)
		else
		    results = this.props.data.items || []
		// console.log(results)

		// getDiff(){
		// 			  //Get 1 day in milliseconds
		//   // var one_day=1000*60*60*24;

		//   // Convert both dates to milliseconds
		//   // this.setState({time_difference: (this.state.video_publish_time.getTime() - this.state.current_time.getTime())/(1000*60*60*24)}) 

		//   // // Calculate the difference in milliseconds
		//   // var difference_ms = date2_ms - date1_ms;
		    
		//   // // Convert back to days and return
		//   // return Math.round(difference_ms/one_day); 
		// }












		// {
		// 	if(this.state.clickedId !== null )
		// 		return(
		// 			<div>
		// 			<VideoPlay
		// 				id = {this.state.clickedId}
		// 				type = {this.state.type}
		// 			/>
		// 			</div>
		// 		)
		// 	else

		
			// var one_day, date1_ms, date2_ms, difference_ms, diff
			return (
				<div className="list">
					{
						this.props.data.pageInfo !== undefined ?
							<div><h4>About {this.props.data.pageInfo.totalResults.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Results</h4><hr></hr></div>
						:
							<h3></h3>

					}
					<Grid>
					{results.map((result, k) => {
						let type = result.id.kind == undefined ? result.kind.split('#')[1] : result.id.kind.split('#')[1]
						let year = result.snippet.publishedAt.split('-')[0]
						let month = result.snippet.publishedAt.split('-')[1]
						let day = result.snippet.publishedAt.split('-')[2].substring(0,2)
						let d1 = new Date()
						let d2 = new Date(year, month, day)
						let days_ago = Math.floor((d1.getTime() - d2.getTime())/(1000*60*60*24) % 30)
						let months_ago = Math.floor((d1.getTime() - d2.getTime())/(1000*60*60*24*30) % 12)
						let years_ago = Math.floor((d1.getTime() - d2.getTime())/(1000*60*60*24*30*12))
						// console.log(years_ago + 'years' + months_ago + 'months' + days_ago + 'days ago')
						let ago = years_ago + ' years ' + months_ago + ' months ' + days_ago + ' days ago'
						let id = result.id.videoId == undefined ? result.id : result.id.videoId
						return(


							<div>


							{
								type === 'channel' ?

								  <Row>
								    <Col xs={6} md={4}>
									      <Thumbnail className = "channel-card" circle src={result.snippet.thumbnails.medium.url} alt="242x200" onClick = {() => this.setState({clickedId: result.id.videoId, type: 'channel'})}>
									        <h3>{result.snippet.title}</h3>
									        <p>{result.snippet.description}</p>
									        <p>
									          <Link to = {'/channel/' + result.snippet.channelId}>
									          		<Button bsStyle="default">Visit Channel</Button>
									          </Link>
									        </p>
									      </Thumbnail>
								    </Col>
								  </Row>

								:

								  type === 'video' ?
								  <Row>
								    <Col xs={6} md={4}>
								      	<Thumbnail className = "video-card" src={result.snippet.thumbnails.medium.url} alt="242x200" onClick = {() => this.setState({clickedId: result.id.videoId, type: 'video'})}>
									        <h3>{result.snippet.title}</h3>
									        <p>{result.snippet.channelTitle} {ago}</p>
									        <p>{result.snippet.description}</p>
									        <p>
									        	<Link to = {'/videoplay/'+ type + '/' + id + '/' + result.snippet.channelTitle + '/' + result.snippet.channelId} >
										          <Button bsStyle="danger">Play Video</Button>
										        </Link>
									          &nbsp;
									          	<Link to = {'/channel/' + result.snippet.channelId}>
									          		<Button bsStyle="default">Visit Channel</Button>
									          	</Link>
									        </p>
									      </Thumbnail>
								    </Col>
								  </Row>
								:
								  <Row>
								    <Col xs={6} md={4}>
								      <Thumbnail className = "playlist-card" src={result.snippet.thumbnails.medium.url} alt="242x200" onClick = {() => this.setState({clickedId: result.id.playlistId, type: 'playlist'})}>
								        <h3>{result.snippet.title}</h3>
								        <p>{result.snippet.channelTitle}</p>
								        <p>{result.snippet.description}</p>
								        <p>
									        	<Link to = {'/videoplay/'+ type + '/' + result.id.playlistId + '/' + result.snippet.channelTitle + '/' + result.snippet.channelId}>
										          <Button bsStyle="danger">Play Playlist</Button>
										        </Link>
									          &nbsp;
									          	<Link to = {'/channel/' + result.snippet.channelId}>
									          		<Button bsStyle="default">Visit Channel</Button>
									          	</Link>
									        </p>
								      </Thumbnail>
								    </Col>
								  </Row>							
							}

















							





							</div>


						)
					})}
					</Grid>
				</div>
		
			)
		// }
		
	}
}

export default List;