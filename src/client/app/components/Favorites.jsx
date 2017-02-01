import React from 'react';
import {Link} from 'react-router';

import Post from './Post.jsx';


class Favorites extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            favorited: this.props.route.account.data.favorited
        }
        
        this.renderPosts = this.renderPosts.bind(this);
    }
    
    render() {
        return (
            <div className="favorites-container">
                <Link to="/reader/hot"><h2>Back to Reader</h2></Link>
                {this.renderPosts(this.state.favorited, this.props.route.account)}
            </div>
        );
    }
    
    renderPosts(favorited, account) {
        let posts = [];
        
        let self = this;
        
        console.log(favorited.length);
        
        for(let i = 0; i < favorited.length; i++) {
            let post = favorited[i];
            posts.push(
                <Post 
                    post={post}
                    favorited={favorited.includes(post)} 
                    onButtonClick={() => {
                        account.handleFavorite(post, () => {
                            self.setState({favorited: account.data.favorited});
                        });
                    }} 
                />
            );
        }
        
        return posts;
    }
}

export default Favorites;