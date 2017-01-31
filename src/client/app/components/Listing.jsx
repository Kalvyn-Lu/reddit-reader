import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';

class Listing extends React.Component {
    render() {
        return (
            <div className="listing-container">
                {this.renderListing(this.props.subObject)}
            </div>
        );
    }
    
    renderListing(data) {
        if(!data.data) {
            return [];
        }
        
        let listing = [];
        
        $.each(
            data.data.children,
            function (i, post) {
              listing.push(<h1>{post.data.title}</h1>);
              listing.push(<p>{"URL: " + post.data.url}</p>);
              listing.push(<p>{"Permalink: " + post.data.permalink}</p>);
              
              if(post.data.secure_media_embed) {
                  listing.push($('<div/>').html(post.data.secure_media_embed).contents());
              }
              
              listing.push(<hr/>);
            }
        )
        
        return listing;
    }
}

export default Listing;