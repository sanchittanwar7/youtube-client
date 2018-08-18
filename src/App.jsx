import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import List from './List'
import { bake_cookie, read_cookie } from 'sfcookies';
import './App.css'
import InfiniteScroll from 'react-infinite-scroll-component';
// import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';


// const override = css`
//     display: block;
//     margin: auto;
//     border-color: red;
// `;


const api_key = 'AIzaSyBHN06Z3do8vR6k8uio_BMqQzPjm-ECFqs'

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			trending_videos: [],
			nextToken: 0,
			loading: true
		}
		this.fetchTrending = this.fetchTrending.bind(this)
	}

	fetchTrending() {
		let token = this.state.nextToken;
		console.log(token)
		let FETCH_URL
		if(token === 0)
		FETCH_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&maxResults=25&key=${api_key}`
		else
		FETCH_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&maxResults=25&key=${api_key}&pageToken=${token}`
		fetch(FETCH_URL, {
			method: 'GET'
		})
			.then(response => response.json())
			.then(json => {
				this.setState({ trending_videos: this.state.trending_videos.concat(json.items), nextToken: json.nextPageToken })
				console.log('got new videos')
			});
	}

	componentWillMount() {
		this.fetchTrending()
	}

	render() {
		return (
			<InfiniteScroll
				dataLength = { this.state.trending_videos === undefined ? 0 : this.state.trending_videos.length }
				hasMore = {this.state.nextToken === undefined ? false : true}
				next = { this.fetchTrending }
				loader = {<ClipLoader
					className={'loader'}
					sizeUnit={"px"}
					size={50}
					style={{margin: 100}}
					color={'#d74417'}
					loading={this.state.loading}
				/>}
			>
				
				<List
					data={this.state.trending_videos}
				/>
			</InfiniteScroll>
		);
	}
}

export default App;