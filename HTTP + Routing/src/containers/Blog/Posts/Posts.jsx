import React, { Component } from "react";
// import Link from "react-router-dom/Link";
import { Route } from "react-router-dom";

import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";
import "./Posts.css";

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null
  };

  async componentDidMount() {
    // console.log('PROPS:', this.props);

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

    this.props.history.push({ pathname: this.props.match.url + "/" + id });
    // this.props.history.push('/posts/' + id);
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;

    posts = this.state.posts.map(post => {
      return (
        // <Link key={post.id} to={'/posts/' + post.id}>
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
        // </Link>
      );
    });

    return (
      <div>
        <section className="Posts">{posts}</section>

        <Route
          path={this.props.match.url + "/:id"}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;
