import React, { Component } from "react";
// import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import FullPost from './FullPost/FullPost'

import "./Blog.css";

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink 
                  to="/"
                  activeClassName='my-active'
                  activeStyle={{
                    color: 'red',
                    textDecoration: 'underline'
                  }}
                  exact>
                  Home
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
        <Route path="/" exact component={Posts} />
        <Route path="/new-post" exact component={NewPost} />
        <Route path="/:id" exact component={FullPost} />
      </div>
    );
  }
}

export default Blog;
