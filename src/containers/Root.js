import React, { Component } from 'react';
import Perf from 'react-addons-perf';

import randomColor from 'randomColor';

import Color from '../components/Color';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorsList: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    window.Perf = Perf;
    const randomRGBArrays = randomColor({
       count: 1000,
       format: 'rgbArray'
    });

    this.setState({
      colorsList: randomRGBArrays.map((rgb, index) => ({ rgb, id: index }))
    });
  }

  handleClick(id) {
    console.log('was clicked', id);
    this.setState({
      colorsList: this.state.colorsList.filter((color) => color.id !== id)
    })
  }

  render() {

    return (
      <div className="container">
        <ul className="container__list">
          { this.state.colorsList && this.state.colorsList.map( (color, index) => {
              const key = index;
              return (
                <Color
                    key={ key }
                    display={ key.toFixed(2) }
                    color={ color }
                    handleClick={ this.handleClick } />
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default Root;
