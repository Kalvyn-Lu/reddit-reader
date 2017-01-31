import React from 'react';
import $ from 'jquery';

class Reader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subJson: []
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
                
            </div>
        );
    }
}

export default Reader;