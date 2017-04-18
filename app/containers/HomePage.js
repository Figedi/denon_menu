// @flow
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Home from '../components/Home';
import Navbar from '../components/Navbar';
import Footer from './Footer';

import * as DenonActions from '../actions/denon';
import type { RootState } from '../reducers';

function mapStateToProps(state: RootState) {
  const { volume, power, channel, $pending, $error } = state.denon;
  const host = state.config.ip;
  return {
    host,
    volume,
    power,
    channel,
    $pending,
    $error,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
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
