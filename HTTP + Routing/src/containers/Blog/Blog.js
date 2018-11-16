import React, { Component, Suspense } from "react";
// import axios from 'axios';
import { Route, NavLink, Switch, /*Redirect */} from 'react-router-dom';

// import asyncComponent from "../../hoc/asyncComponent";
import Posts from "./Posts/Posts";
// import NewPost from "./NewPost/NewPost";
// import FullPost from './FullPost/FullPost'
import "./Blog.css";

const NewPost = React.lazy(() => import("./NewPost/NewPost"));

// //* Lazy Loading Old way
// const AsyncNewPost = asyncComponent( () => import("./NewPost/NewPost") );


class Blog extends Component {
  state = {
    auth: true
  }
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink 
                  to="/posts"
                  activeClassName='my-active'
                  activeStyle={{
                    color: 'red',
                    textDecoration: 'underline'
                  }}
                  exact>
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink to={{
                  pathname: '/new-post',
                  hash: '#submit',
                  search: '?quick-submit=true'
                }}>
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Route path='/' exact render={() => <h1>Home Page</h1>} />
        <Route path='/' exact render={() => <h1>Home Page 2</h1>} /> */}
        <Switch>
          { 
            this.state.auth ? 
              <Route 
                path="/new-post" 
                render={() => (
                  <Suspense fallback={<div>Loading...</div>}>
                    <NewPost />
                  </Suspense>
                )} /> 
            : null 
          }
          <Route path="/posts" component={Posts} />
          <Route render={() => <h1>Not Found!</h1>} />
          {/* <Redirect from="/" to="/posts"/> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
