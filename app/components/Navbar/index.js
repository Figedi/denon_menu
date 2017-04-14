import React, { Component } from 'react';
import { Link } from 'react-router';
import { Toolbar } from 'react-photonkit';

export default class Navbar extends Component {
  props: {
    to: string,
  };

  render() {
    return (
      <Toolbar ptType="header" title="Denon Receiver">
        <div className="toolbar-actions">
          <Link to={this.props.to}>
            <button className="btn btn-default pull-right">
              <span className="icon icon-cog" />
            </button>
          </Link>
        </div>
      </Toolbar>
    );
  }
}
