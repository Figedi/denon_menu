import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navbar extends Component {

  props: {
    to: string,
  }

  render() {
    return (
      <header className="toolbar toolbar-header">
        <h1 className="title">Denon Receiver</h1>
        <div className="toolbar-actions">
          <Link to={this.props.to}>
            <button className="btn btn-default pull-right">
              <span className="icon icon-cog" />
            </button>
          </Link>
        </div>
      </header>
    );
  }
}
