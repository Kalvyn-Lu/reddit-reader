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
                <Link href="/favorites"><h1>Click here to see favorites</h1></Link>
                <Listing subObject={this.state.subJson} account={this.props.route.account}/>
            </div>
        );
    }
}

export default Reader;