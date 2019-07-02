import React, { Component } from 'react';

class FolderError extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
    return (
      <h2>Something went wrong when loading this Folder :(</h2>
    );
    }
    return this.props.children;
  }
}

export default FolderError;