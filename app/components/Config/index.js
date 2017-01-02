// @flow
import React, { Component } from 'react';
import styles from './Config.css';

// todo: wenn change in ip ->  rehydrate cycle
export default class Config extends Component {

  onSubmit($e: SyntheticEvent) {
    $e.preventDefault();
    this.props.configApplyForm();
  }

  props: {
    ip: string,
    startup: boolean,
    configApplyForm: () => void,
    configSetFormField: (field: string, $e: SyntheticInputEvent) => void,
    configToggleFormField: (field: string) => void,
  }

  render() {
    const { ip, startup, configSetFormField, configToggleFormField } = this.props;

    return (
      <div className="window-content window-content--flex-inner">
        <form className={styles.form} onSubmit={($e) => this.onSubmit($e)}>
          <div>
            <div className="form-group">
              <label htmlFor="ip">Ip-Address</label>
              <input
                type="text"
                id="ip"
                name="ip"
                className="form-control"
                value={ip}
                onChange={($e) => configSetFormField('ip', $e.target.value)}
              />
            </div>
            <div className="checkbox">
              <label htmlFor="startup">
                <input
                  type="checkbox"
                  id="startup"
                  name="startup"
                  checked={startup}
                  onChange={() => configToggleFormField('startup')}
                /> Run at startup
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
