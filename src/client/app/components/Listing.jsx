import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';
import Post from './Post.jsx';

const max = 4;

class Listing extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        favorited : this.props.account.data.favorited,
        listGroup: 0
      }
      
      this.onLeft = this.onLeft.bind(this);
      this.onRight = this.onRight.bind(this);
    }
    
    componentDidMount() {

    }

    render() {
        return (
            <div className="listing-container">
                {this.renderListing(this.props.subObject, this.props.account)}
                
                <button className="left" onClick={this.onLeft}>Left</button>
                <button className="right" onClick={()=>{this.onRight(this.props.subObject)}}>Right</button>
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
        console.log(max * self.state.listGroup);
        console.log((self.state.listGroup + 1) * max);
        $.each(
            data.data.children,
            function (i, post) {
            if((count >= (max * self.state.listGroup)) && (count < ((self.state.listGroup + 1) * max))) {
                console.log("count" + count);
                 listing.push(
                 <Post key={count} post={post} favorited={account.indexOfPost(post) != -1} onButtonClick={() => {
                    account.handleFavorite(post, () => {
                        self.setState({favorited: account.data.favorited});
                    })
                 }}/>
             );
            }
            count++;
            }
        )
        
        return listing;
    }
    
    onLeft() {
        if(this.state.listGroup > 0) {
            this.setState({listGroup: this.state.listGroup - 1});
        }
    }
    
    onRight(data) {
        var maxLength = data.data.children.length;
        if((this.state.listGroup * max) < maxLength) {
            this.setState({listGroup: this.state.listGroup + 1});
        }
    }

}

Listing.propTypes = {
  subObject: React.PropTypes.object,
  account: React.PropTypes.object
}

export default Listing;