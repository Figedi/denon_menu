// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import Modal from 'react-modal';
import Slider from 'rc-slider';

import styles from './Home.css';

export default class Home extends Component {
  props: {
    $pending: Array<string>,
    $error: ?Error,
    volume: number,
    host: string,
    channel: string,
    power: string,
    denonStartInterval: () => void,
    denonStopInterval: () => void,
    denonSetVolume: (host: string, amount: number) => void,
    denonCommitVolume: (amount: number) => void,
    denonSetPower: (host: string, state: string) => void,
    denonSetChannel: (host: string, channel: string) => void,
  };

  componentDidMount() {
    this.props.denonStartInterval();
  }

  componentWillUnmount() {
    this.props.denonStopInterval();
  }

  handlePowerclick = () => {
    this.props.denonSetPower(this.props.host, 'ON');
  };

  // this sets the volume immediately in the store, but doesnt send to the receiver yet
  handleVolumeChange = (amount: number) => {
    this.props.denonCommitVolume(amount);
  };

  // this is  called on mouse{up|end} and sets the volume @ the receiver
  handleVolumeAfterChange = () => {
    this.props.denonSetVolume(this.props.host, +this.props.volume);
  };

  handleTVClick = () => {
    this.props.denonSetChannel(this.props.host, 'TV');
  };

  handlePCClick = () => {
    this.props.denonSetChannel(this.props.host, 'SAT');
  };

  renderModalContent() {
    const { $pending, $error } = this.props;
    const inProgress = $pending.length && $pending.filter(pendingAction => pendingAction === 'getPower').length > 0;
    if ($error) {
      return (
        <div className={styles.modalContent}>
          <i className="fa fa-2x fa-times" />
          <h5>Error</h5>
          <p className={styles.errorMessage}>{$error.message}</p>
        </div>
      );
    } else if (inProgress) {
      return (
        <div className={styles.modalContent}>
          <i className="fa fa-spin fa-2x fa-spinner" />
          <h5>Fetching receiver state...</h5>
        </div>
      );
    }
    return (
      <div className={styles.modalContent}>
        <i className="fa fa-2x fa-power-off" />
        <h5>Power is off :(</h5>
        <button className="btn btn-default" onClick={this.handlePowerclick}>Power up!</button>
      </div>
    );
  }

  render() {
    const { volume, channel, power } = this.props;
    const buttonClasses = type =>
      classNames({
        btn: true,
        'btn-primary': type.indexOf(channel) > -1,
        'btn-default': type.indexOf(channel) < 0,
      });
    return (
      <div className="window-content window-content--flex-inner">
        <Modal
          isOpen={power !== 'ON'}
          contentLabel="Power off :("
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          {this.renderModalContent()}
        </Modal>
        <div className={styles.slider}>
          <Slider
            onChange={this.handleVolumeChange}
            onAfterChange={this.handleVolumeAfterChange}
            value={+volume}
            min={0}
            max={75}
            step={0.5}
            pushable={false}
          />
        </div>
        <div className={['btn-group', styles.buttons].join(' ')}>
          <button className={buttonClasses('SAT/CBL')} onClick={this.handlePCClick}>PC</button>
          <button className={buttonClasses('TV')} onClick={this.handleTVClick}>TV</button>
        </div>
      </div>
    );
  }
}
