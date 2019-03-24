import React from 'react';

// * withRouter - Hoc that used for add route properties to props
// import withRouter from 'react-router-dom/withRouter'; 

import './Post.css';


const post = (props) => {
    // console.log('Post Props:', props);
    const {title, author, clicked} = props;

    return (
        <article className="Post" onClick={clicked}>
            <h1>{title}</h1>
            <div className="Info">
                <div className="Author">{author}</div>
            </div>
        </article>
    )
};

export default /*withRouter(post)*/ post;