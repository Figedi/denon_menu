// @flow
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';

import * as ElectronActions from '../actions/electron';

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(ElectronActions, dispatch);
}

class HomePage extends Component {
  props: {
    quit: () => void,
  };

  render() {
    return <Footer onQuit={this.props.quit} />;
  }
}

export default connect(null, mapDispatchToProps)(HomePage);
