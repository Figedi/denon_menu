// @flow
import React, { Component } from 'react';
import styles from './Config.css';

// todo: wenn change in ip ->  rehydrate cycle
export default class Config extends Component {

  onSubmit($e: SyntheticEvent) {
    $e.preventDefault();
    this.props.applyForm();
  }

  props: {
    ip: string,
    startup: boolean,
    applyForm: () => void,
    setFormField: (field: string, $e: SyntheticInputEvent) => void,
    toggleFormField: (field: string) => void,
  }

  render() {
    const { ip, startup, setFormField, toggleFormField } = this.props;

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
                onChange={($e) => setFormField('ip', $e.target.value)}
              />
            </div>
            <div className="checkbox">
              <label htmlFor="startup">
                <input
                  type="checkbox"
                  id="startup"
                  name="startup"
                  checked={startup}
                  onChange={() => toggleFormField('startup')}
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
