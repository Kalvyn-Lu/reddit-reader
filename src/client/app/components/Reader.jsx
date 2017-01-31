import React from 'react';
import $ from 'jquery';

import Listing from './Listing.jsx';

class Reader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subJson: {}
        }
    }
    
    componentDidMount() {
        console.log(this.props.route.account.data);
        $.getJSON("https://www.reddit.com/" + this.props.params.sub + ".json", (data) => {
            this.setState({
                subJson: data
            });
        });
    }
    
    
    render() {
        return(
            <div className="reader-container">
                <Listing subObject={this.state.subJson} account={this.props.route.account}/>
            </div>
        );
    }
}

export default Reader;