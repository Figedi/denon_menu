// @flow
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Config from '../components/Config';
import Navbar from '../components/Navbar';
import Footer from './Footer';

import * as ConfigActions from '../actions/config';

function mapStateToProps(state) {
  const { ip, startup } = state.config;
  return {
    ip,
    startup,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(ConfigActions, dispatch),
    push: (path) => dispatch(push(path))
  };
}

class ConfigPage extends Component {

  props: {
    applyForm: () => void,
    push: (path: string) => void,
  };

  applyForm() {
    this.props.applyForm();
    this.props.push('/');
  }

  render() {
    const { applyForm, ...props } = this.props;

    return (
      <div className="window window--flex">
        <Navbar to="/" />
        <Config {...props} applyForm={this.applyForm.bind(this)} />
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPage);
