// @flow
import React, { Component, PropTypes } from 'react';

import 'photon/dist/css/photon.css';
import 'font-awesome/css/font-awesome.css';
import 'rc-slider/assets/index.css';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
