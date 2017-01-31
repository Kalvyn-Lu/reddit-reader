import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';

class Listing extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        favorited : this.props.account.data.favorited
      }
    }

    render() {
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
              listing.push(<h1 key={"post" + count++}>{post.data.title}</h1>);
              listing.push(<p key={"post" + count++}>{"URL: " + post.data.url}</p>);
              listing.push(<p key={"post" + count++}>{"Permalink: " + post.data.permalink}</p>);
              listing.push(<p key={"post" + count++}>{"Comments: " + post.data.num_comments}</p>);

              if(post.data.secure_media_embed.content) {
                let wrapperDiv = document.createElement('div');
                wrapperDiv.innerHTML = post.data.secure_media_embed.content;
                listing.push(<div key={"post" + count++} dangerouslySetInnerHTML={{ __html: wrapperDiv.childNodes[0].nodeValue}} />);
              }

              let postId = post.data.id;

              listing.push(<button key={"post" + count++} onClick={() => {account.handleFavorite(postId, () => {
                self.setState({favorited: self.state.favorited.concat([postId])});
              })}}>
                {self.state.favorited.includes(postId) ? "Favorited!" : "Not Favorited"}
              </button>);

              listing.push(<hr key={i++}/>);
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