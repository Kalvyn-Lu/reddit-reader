import React from 'react';

class Layout extends React.Component {
  render () {
    return (
      <div className="app-container">
      	{this.props.children}
      </div>
    );
  }
}

export default Layout;