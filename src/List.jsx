import React, {Component} from 'react';
import './List.css'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { Grid, Row, Col, Thumbnail, Button} from 'react-bootstrap'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import {Link} from 'react-router'

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
		if(this.props.data === null)
			return(<div></div>)
		else
		    results = this.props.data || []
			return (
					
					<div className="list">
					{/* {
						this.props.data.pageInfo !== undefined ?
							<div style={{marginLeft: 10}}><h4>About {this.props.data.pageInfo.totalResults.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Results</h4><hr></hr></div>
						:
							<h3></h3>

					} */}
					{results.map((result, k) => {
						let type = result.id.kind === undefined ? result.kind.split('#')[1] : result.id.kind.split('#')[1]
						let year = result.snippet.publishedAt.split('-')[0]
						let month = result.snippet.publishedAt.split('-')[1]
						let day = result.snippet.publishedAt.split('-')[2].substring(0,2)
						let d1 = new Date()
						let d2 = new Date(year, month, day)
						let days_ago = Math.floor((d1.getTime() - d2.getTime())/(1000*60*60*24) % 30)
						let months_ago = Math.floor((d1.getTime() - d2.getTime())/(1000*60*60*24*30) % 12)
						let years_ago = Math.floor((d1.getTime() - d2.getTime())/(1000*60*60*24*30*12))
						let ago = years_ago + ' years ' + months_ago + ' months ' + days_ago + ' days ago'
						let id = result.id.videoId === undefined ? result.id : result.id.videoId
						return(
							<div key={k}>
							{
								type === 'channel' ?
								  <Card className = "channel-card">
							        <CardImg className='image' top width="100%" src={result.snippet.thumbnails.medium.url} alt="Card image cap" />
							        <CardBody className='body'>
							          <CardTitle className='title'>{result.snippet.title}</CardTitle>
							          <CardSubtitle className='sub-title'>{result.snippet.channelTitle} {ago}</CardSubtitle>
							        	<Link to = {'/channel/' + result.snippet.channelId}>
							          		<Button bsStyle="default" onClick={() => {delete_cookie('title');}}>Visit Channel</Button>
							          </Link>
							        
							        </CardBody>
							      </Card>

								:

								  type === 'video' ?
								  <Card className = "video-card">
							        <CardImg className='image' top width="100%" src={result.snippet.thumbnails.medium.url} alt="Card image cap" />
							        <CardBody className='body'>
							          <CardTitle className='title'>{result.snippet.title}</CardTitle>
							          <CardSubtitle className='sub-title'>{result.snippet.channelTitle} {ago}</CardSubtitle>
							        	<Link to = {'/videoplay/'+ type + '/' + id + '/' + result.snippet.channelTitle + '/' + result.snippet.channelId} >
								          <Button bsStyle="danger" onClick={() => {delete_cookie('title');}}>Play Video</Button>
								        </Link>
							          &nbsp;
							          	<Link to = {'/channel/' + result.snippet.channelId}>
							          		<Button bsStyle="default" onClick={() => {delete_cookie('title');}}>Visit Channel</Button>
							          	</Link>
							        
							        </CardBody>
							      </Card>
								:
								  <Card className = "playlist-card">
							        <CardImg className='image' top width="100%" src={result.snippet.thumbnails.medium.url} alt="Card image cap" />
							        <CardBody className='body'>
							          <CardTitle className='title'>{result.snippet.title}</CardTitle>
							          <CardSubtitle className='sub-title'>{result.snippet.channelTitle} {ago}</CardSubtitle>
							        	<Link to = {'/videoplay/'+ type + '/' + result.id.playlistId + '/' + result.snippet.channelTitle + '/' + result.snippet.channelId}>
								          <Button bsStyle="danger" onClick={() => {delete_cookie('title');}}>Play Playlist</Button>
								        </Link>
							          &nbsp;
							          	<Link to = {'/channel/' + result.snippet.channelId}>
							          		<Button bsStyle="default" onClick={() => {delete_cookie('title');}}>Visit Channel</Button>
							          	</Link>
							        
							        </CardBody>
							      </Card>						
							}
							<hr></hr>
							</div>
						)
					})}
					</div>
			)
	}
}

export default List;