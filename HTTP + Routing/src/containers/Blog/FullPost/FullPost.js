import React, { Component } from "react";
import axios from 'axios';

import "./FullPost.css";

class FullPost extends Component {
	state = {
		loadedPost: null,
	}

	componentDidMount() {
		console.log('Full Post Component is Mount');
		this.loadData();
	}

	componentDidUpdate() {
		this.loadData();
	}

	async loadData() {
		const { match: { params: { id } } } = this.props;
		const { loadedPost } = this.state;
		if ( id ) {
			try {
				if (!loadedPost || (+id !== +loadedPost.id)) {
					const { data: post } = await axios.get(`/posts/${id}`);
					this.setState({ loadedPost: post });
				}
			} catch (error) {
				console.log(error);
			}	
		}
	}

	deletePostHandler = async () => {
		const { id } = this.props.match.params;
		await axios.delete(`/posts/${id}`);
		// console.log('DeleteRes:', res);
	}

  render() {
		const { id } = this.props.match.params;
		const { loadedPost } = this.state;

		// let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
		let post = null;
		id && (post = <p style={{ textAlign: 'center' }}>LOADING...</p>)

    loadedPost && (post = (
      <div className="FullPost">
        <h1>{loadedPost.title}</h1>
        <p>{loadedPost.body}</p>
        <div className="Edit">
          <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
        </div>
      </div>
    ));
    return post;
  }
}

export default FullPost;
