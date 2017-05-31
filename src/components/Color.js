import React, { Component } from 'react';

export default class Color extends Component {
  render() {
    const color = this.props.color;
    return (
      <li className="colorItem"
        style={{
          background: `rgb(
          ${color.rgb[0]},
          ${color.rgb[1]},
          ${color.rgb[2]})`
        }}
        onClick={ () => this.props.handleClick(color.id) }>
        { `key: ${this.props.display}` }
        <div className="colorItem__remove"> X </div>
      </li>
    );
  }
}
