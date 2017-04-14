// @flow
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Window } from 'react-photonkit';

import Config from '../components/Config';
import Navbar from '../components/Navbar';
import Footer from './Footer';

import * as ConfigActions from '../actions/config';

const actions = {
  ...ConfigActions,
  push: path => push(path),
};

function mapStateToProps(state) {
  const { ip, startup } = state.config;
  return {
    ip,
    startup,
  };
}

function mapDispatchToProps(dispatch) {
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
      <Window className="window--flex">
        <Navbar to="/" />
        <Config {...props} configApplyForm={this.applyForm} />
        <Footer />
      </Window>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPage);
