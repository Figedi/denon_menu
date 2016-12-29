import React, { Component } from 'react';

export default class Footer extends Component {

  props: {
    onQuit: () => void,
  }

  render() {
    return (
      <footer className="toolbar toolbar-footer">
        <div className="toolbar-actions">
          <button onClick={this.props.onQuit} className="btn btn-primary pull-right">Close</button>
        </div>
      </footer>
    );
  }
}
