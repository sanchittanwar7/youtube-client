import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap'
import {Link} from 'react-router'
import './RelatedVideos.css'

 
class RelatedVideos extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		let {videos} = this.props
		console.log(this.props)
		let type = 'video'
		{
			if(this.props.videos === null)
				return(<div></div>)
			else
		
		return(
			<Grid>
			  <Row>

			{
				videos.items.map((result, k) => {
					let type = result.id.kind.split('#')[1]
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
					return(
						    <Col xs={6} md={4}>
						      	<Thumbnail className = "related-video-card" src={result.snippet.thumbnails.default.url} alt="242x200" onClick = {() => this.setState({clickedId: result.id.videoId, type: 'video'})}>
							        <h3>{result.snippet.title}</h3>
							        <p>{result.snippet.channelTitle} {ago}</p>
							        <p>
							        	<Link to = {'/videoplay/'+ type + '/' + result.id.videoId}>
								          <Button bsStyle="danger">Play Video</Button>
								        </Link>
							          &nbsp;
							          	<Link to = {'/channel/' + result.snippet.channelId}>
							          		<Button bsStyle="default">Visit Channel</Button>
							          	</Link>
							        </p>
							    </Thumbnail>
						    </Col>
					)
				})
			}
			  </Row>
			</Grid>
		)
}
	}
}


export default RelatedVideos