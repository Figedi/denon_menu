// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Layout from '../Layout';
import styles from './Config.css';
import * as configActions from '../../actions/config';
import type { RootState } from '../../reducers';

type DispatchProps = {
  configSetFormField: (field: string, value: string | boolean) => void,
  configToggleFormField: (field: string) => void,
  configCommitForm: () => void,
  push: (path: string) => void
};

type StateProps = {
  ip: string,
  startup: boolean
};

type Props = DispatchProps & StateProps;

function mapStateToProps(state: RootState): StateProps {
  const { ip, startup } = state.config;
  return {
    ip,
    startup,
  };
}

const mapDispatchToProps = {
  ...configActions,
  push: path => push(path),
};

// todo: wenn change in ip ->  rehydrate cycle
class Config extends Component {
  props: Props;

  handleSubmit = ($e: SyntheticInputEvent) => {
    $e.preventDefault();
    this.props.configCommitForm();
    this.props.push('/');
  };

  handleIpChange = ($e: SyntheticInputEvent) => {
    this.props.configSetFormField('ip', $e.target.value);
  };

  handleStartupChange = () => {
    this.props.configToggleFormField('startup');
  };

  render() {
    const { ip, startup } = this.props;

    return (
      <Layout buttonLink="/">
        <div className="window-content window-content--flex-inner">
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <div>
              <div className="form-group">
                <label htmlFor="ip">Ip-Address</label>
                <input
                  type="text"
                  id="ip"
                  name="ip"
                  className="form-control"
                  value={ip}
                  onChange={this.handleIpChange}
                />
              </div>
              <div className="checkbox">
                <label htmlFor="startup">
                  <input
                    type="checkbox"
                    id="startup"
                    name="startup"
                    checked={startup}
                    onChange={this.handleStartupChange}
                  />{' '}
                  Run at startup
                </label>
              </div>
            </div>
            <div className={styles.button}>
              <button className="btn btn-positive" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
