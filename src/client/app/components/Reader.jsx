import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';

import Listing from './Listing.jsx';

class Reader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subJson: {}
        }
    }
    
    componentDidMount() {
        $.getJSON("https://www.reddit.com/" + this.props.params.sub + ".json", (data) => {
            this.setState({
                subJson: data
            });
        });
    }
    
    
    render() {
        return(
            <div className="reader-container">
                <Link to="/favorites"><h2>Go to favorites</h2></Link>
                <Link to="/"><h2>Back to Login</h2></Link>
                <Listing subObject={this.state.subJson} account={this.props.route.account}/>
            </div>
        );
    }
}

export default Reader;