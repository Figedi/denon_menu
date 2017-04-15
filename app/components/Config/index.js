// @flow
import React, { Component } from 'react';

import styles from './Config.css';

// todo: wenn change in ip ->  rehydrate cycle
export default class Config extends Component {
  props: {
    ip: string,
    startup: boolean,
    configApplyForm: () => void,
    configSetFormField: (field: string, value: string) => void,
    configToggleFormField: (field: string) => void,
  };

  onSubmit($e: SyntheticInputEvent) {
    $e.preventDefault();
    this.props.configApplyForm();
  }

  handleIpChange = ($e: SyntheticInputEvent) => {
    this.props.configSetFormField('ip', $e.target.value);
  };

  handleStartupChange = () => {
    this.props.configToggleFormField('startup');
  };

  render() {
    const { ip, startup } = this.props;

    return (
      <div className="window-content window-content--flex-inner">
        <form className={styles.form} onSubmit={$e => this.onSubmit($e)}>
          <div>
            <div className="form-group">
              <label htmlFor="ip">Ip-Address</label>
              <input type="text" id="ip" name="ip" className="form-control" value={ip} onChange={this.handleIpChange} />
            </div>
            <div className="checkbox">
              <label htmlFor="startup">
                <input
                  type="checkbox"
                  id="startup"
                  name="startup"
                  checked={startup}
                  onChange={this.handleStartupChange}
                />
                {' '}
                Run at startup
              </label>
            </div>
          </div>
          <div className={styles.button}>
            <button className="btn btn-positive" type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}
