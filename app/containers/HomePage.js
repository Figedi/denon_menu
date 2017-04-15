// @flow
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Home from '../components/Home';
import Navbar from '../components/Navbar';
import Footer from './Footer';

import * as DenonActions from '../actions/denon';

function mapStateToProps(state) {
  const { volume, power, channel, $pending, $error } = state.denon;
  return {
    host: state.config.ip,
    volume,
    power,
    channel,
    $pending,
    $error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DenonActions, dispatch);
}

class HomePage extends Component {
  render() {
    return (
      <div className="window window--flex">
        <Navbar to="/config" />
        <Home {...this.props} />
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
