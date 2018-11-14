import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";

import "./Posts.css";

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null
  };

  async componentDidMount() {
    try {
      let { data: posts } = await axios.get("/posts");
      posts = posts.slice(0, 4);

      const updatedPosts = posts.map(post => ({ ...post, author: "Alex" }));

      this.setState({ posts: updatedPosts });
    } catch (err) {
      console.log("ERROR:", err.message || err);
      // this.setState({ error: true });
    }
  }

  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;

    posts = this.state.posts.map(post => {
      return (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
      );
    });

    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;
