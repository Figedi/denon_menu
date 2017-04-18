// @flow
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Config from '../components/Config';
import Navbar from '../components/Navbar';
import Footer from './Footer';

import * as ConfigActions from '../actions/config';
import type { RootState } from '../reducers';

const actions = {
  ...ConfigActions,
  push: path => push(path),
};

function mapStateToProps(state: RootState) {
  const { ip, startup } = state.config;
  return {
    ip,
    startup,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(actions, dispatch);
}

class ConfigPage extends Component {
  props: {
    configCommitForm: () => void,
    push: (path: string) => void,
  };

  applyForm = () => {
    this.props.configCommitForm();
    this.props.push('/');
  };

  render() {
    const { configCommitForm, ...props } = this.props;

    return (
      <div className="window window--flex">
        <Navbar to="/" />
        <Config {...props} configApplyForm={this.applyForm} />
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPage);
