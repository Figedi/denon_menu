import React, { Component } from 'react';
import { Toolbar } from 'react-photonkit';

export default class Footer extends Component {
  props: {
    onQuit: () => void
  };

  render() {
    return (
      <Toolbar ptType="footer">
        <div className="toolbar-actions">
          <button onClick={this.props.onQuit} className="btn btn-primary pull-right">
            Close
          </button>
        </div>
      </Toolbar>
    );
  }
}
