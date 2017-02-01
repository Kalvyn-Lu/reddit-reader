import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';
import Post from './Post.jsx';

class Listing extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        favorited : this.props.account.data.favorited
      }
    }

    render() {
        console.log(this.state.favorited.length);
        return (
            <div className="listing-container">
                {this.renderListing(this.props.subObject, this.props.account)}
            </div>
        );
    }
    
    renderListing(data, account) {
        if(!data.data) {
            return [];
        }
        
        let listing = [];

        let count = 0;

        let self = this;
        
        $.each(
            data.data.children,
            function (i, post) {
             listing.push(
                 <Post post={post} favorited={self.state.favorited.includes(post)} onButtonClick={() => {
                    account.handleFavorite(post, () => {
                        self.setState({favorited: account.data.favorited});
                    })
                 }}/>
             );
            }
        )
        
        return listing;
    }
}

Listing.propTypes = {
  subObject: React.PropTypes.object,
  account: React.PropTypes.object
}

export default Listing;