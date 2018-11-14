import React, { Component } from "react";
import axios from 'axios';

import "./FullPost.css";

class FullPost extends Component {
	state = {
		loadedPost: null,
	}

	async componentDidUpdate() {
		const { id } = this.props;
		const { loadedPost } = this.state;

		try {
			if (id && (!loadedPost || id !== loadedPost.id)) {
				const { data: post } = await axios.get(`/posts/${id}`);
				this.setState({ loadedPost: post });
			}
		} catch (error) {
			console.log(error);
		}
	}

	deletePostHandler = async () => {
		const { id } = this.props;
		const res = await axios.delete(`/posts/${id}`);

		console.log('DeleteRes:', res);
	}

  render() {
		const { id } = this.props;
		const { loadedPost } = this.state;

		let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
		
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
