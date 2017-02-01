import React from 'react';

class Post extends React.Component {
    render() {
        return(
            <div className='post-container'>
                {this.renderPost(this.props.post, this.props.favorited, this.props.onButtonClick)}
            </div>
        );
    }
    
    renderPost(post, favorited, buttonCallback) {
        let listing = [];
        let count = 0;
        
        listing.push(<h1 key={"post" + count++}>{post.data.title}</h1>);
        listing.push(<p key={"post" + count++}>{"URL: " + post.data.url}</p>);
        listing.push(<p key={"post" + count++}>{"Permalink: " + post.data.permalink}</p>);
        listing.push(<p key={"post" + count++}>{"Comments: " + post.data.num_comments}</p>);
    
        if(post.data.secure_media_embed.content) {
            let wrapperDiv = document.createElement('div');
            wrapperDiv.innerHTML = post.data.secure_media_embed.content;
            listing.push(<div key={"post" + count++} dangerouslySetInnerHTML={{ __html: wrapperDiv.childNodes[0].nodeValue}} />);
        }
    
        listing.push(<button key={"post" + count++} onClick={() => {
            buttonCallback();
        }}>
            {favorited ? "Favorited!" : "Not Favorited"}
         </button>);
    
        listing.push(<hr key={count++}/>);
        
        return listing;
    }
}

Post.propTypes = {
    post: React.PropTypes.object,
    favorited: React.PropTypes.bool,
    onButtonClick: React.PropTypes.func
}

export default Post;