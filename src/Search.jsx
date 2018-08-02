import React, { Component } from 'react'
import List from './List'

export default class Search extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<List
				data = {this.params.query}
			/>
		)
	}
}