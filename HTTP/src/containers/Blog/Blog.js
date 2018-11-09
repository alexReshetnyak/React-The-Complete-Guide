import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';


import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
	state = {
		posts: [],
		selectedPostId: null,
		error: false
	}

	async componentDidMount() {
		try {
			let { data: posts } = await axios.get('/posts');
			posts = posts.slice(0, 4);

			const updatedPosts = posts.map(post => ({ ...post, author: 'Alex' }));

			this.setState({ posts: updatedPosts })
		} catch (err) {
			console.log('ERROR:', err.message || err);
			this.setState({ error: true });
		}
	}

	postSelectedHandler = (id) => {
		this.setState({selectedPostId: id});
	}

	get posts () {
		if (this.state.error) {
			return <p style={{ textAlign: "center" }}>Something went wrong!</p>	
		}

		return this.state.posts.map(post => {
			return  <Post 
								key={post.id} 
								title={post.title} 
								author={post.author}
								clicked={() => this.postSelectedHandler(post.id)}/>
		});
	}
	
	render () {
		return (
			<div>
				<section className="Posts">
					{this.posts}
				</section>
				<section>
					<FullPost id={this.state.selectedPostId}/>
				</section>
				<section>
					<NewPost />
				</section>
			</div>
		);
	}
}

export default Blog;