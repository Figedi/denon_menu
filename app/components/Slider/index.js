import React, { Component } from 'react';
import { debounce } from 'lodash';

export default class Slider extends Component {
  props: {
    min: number,
    max: number,
    step: number,
    onChange: ($event: SyntheticEvent) => void,
  };

  componentWillMount() {
    this.delayedCallback = debounce(this.props.onChange, 400);
  }

  onChange = $e => {
    $e.persist();
    this.delayedCallback($e);
  };

  render() {
    const { min, max, step } = this.props;

    return (
      <form>
        <div className="form-group">
          <input onChange={this.onChange} min={min} max={max} step={step} type="range" className="form-control" />
        </div>
      </form>
    );
  }
}
