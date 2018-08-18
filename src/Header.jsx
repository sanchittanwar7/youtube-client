import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon, Image } from 'react-bootstrap'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import App from './App'
import './App.css'
import './Header.css'
import List from './List'
import {Link} from 'react-router'

const api_key = 'AIzaSyBHN06Z3do8vR6k8uio_BMqQzPjm-ECFqs'

export default class Header extends Component{
	constructor(props) {
		super(props);

		this.state = {
			query: '',
			data: [],
			trending_videos: []
		}
	}

	search() {
		var title = read_cookie('title');
		title = this.props.params === undefined ? undefined : this.props.params.query;
		console.log(title);
		if(title !== undefined){
			var FETCH_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${title}&key=${api_key}&maxResults=50`
			fetch(FETCH_URL, {
				method: 'GET'
			})
			.then(response => response.json())
			.then(json => {
				console.log(json)
				this.setState({data: json})
			});
			delete_cookie('title');
		}
	}

	componentWillMount(){
		this.search()
	}

	render(){
		var no = this.props.no
		console.log(no)
		return(
			<div>
				<FormGroup className="form">
					<Link to = {'/'}>
						<Image className='title-image' src="https://webtrickz.com/wp-content/uploads/2018/03/youtube-vanced.png" circle />
					</Link>

					<InputGroup>
						<FormControl
							type = "text"
							placeholder = "Search for an artist"
							value = {this.state.query}
							onChange = {event => {this.setState({query: event.target.value});
						                           bake_cookie('title', event.target.value)}}
							onKeyPress = { event => {
								if(event.key === 'Enter'){
									this.search();
								}
							}}
						/>
						<InputGroup.Addon className =  "searchButton" onClick = {() => this.search()}>
							<Link to = {'/' + this.state.query}>
								<Glyphicon glyph = "search" onClick = {() => this.search()}></Glyphicon>
							</Link>
						</InputGroup.Addon>
					</InputGroup>
				</FormGroup>
				{
					this.state.data.length !== 0 ? 
					<List 
						data = {this.state.data.items}
					/>
					:
				
						no === undefined ?
						<App />
						:
						<div></div>
				}
			</div>
		)
	}
}