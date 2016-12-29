import React, { Component } from 'react';
import { debounce } from 'lodash';

export default class Slider extends Component {

  componentWillMount() {
    this.delayedCallback = debounce(this.props.onChange, 400);
  }

  onChange($e) {
    $e.persist();
    this.delayedCallback($e);
  }

  props: {
    min: number,
    max: number,
    step: number,
    current: number,
    onChange: ($event: SyntheticEvent) => void,
  }

  render() {
    const { min, max, step, current } = this.props;

    return (
      <form>
        <div className="form-group">
          <input
            onChange={this.onChange.bind(this)}
            min={min}
            max={max}
            step={step}
            type="range"
            className="form-control"
          />
        </div>
      </form>
    );
  }
}
