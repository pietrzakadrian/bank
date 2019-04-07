import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollService extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      document.body.scrollTo(0, 0);
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(ScrollService);
