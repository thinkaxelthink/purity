# There and back again
## React.Component, React.PureComponent, Stateless Functional Component

- Components are renderable units
- Consider the rule: *“All React components must act like **pure** functions with respect to their props.“*
- Under the hood, ES6 classes are not a new type, they mainly provide more convenient syntax to create constructor functions. via [ExploringJS ES6
overview](http://exploringjs.com/es6/ch_classes.html#sec_overview-classes)
  - `Class` may appear similar to object, but is in fact of type `function`
 - Understanding `Class` as type `function` is crucial while interpreting historical context of the 3 available react components (more thoroughly `React.PureComponent`)

##### Pure Functions
Proper definition:

 - The function always evaluates the same result value given the same argument value(s).
  - Evaluation of the result does not cause any semantically observable side effect or output, such as mutation of mutable objects or output to I/O devices.

React definition:
  - component that never calls `this.setState` and that doesn’t use `this.state`.
  - “purity” is a spectrum

### `Stateless Functional Component`

```Javascript
(props) => {
  return (
    <h1>Hello, {props.name}. What time is it?</h1>
  );
}
```

- smallest renderable unit
- Accept arbitrary input thru `this.props`
- Return React elements describing what should appear on the screen
- stateless: no life cycle methods or `this.state`
- *pure* function


### `React.Component`
```Javascript
import { Component } from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>What time is it?</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

>*Conceptually, components are like JavaScript functions.*

- Accept arbitrary input: “props”
- Return React elements describing what should appear on the screen.
- Have `state` thru `this` keyword
- Accept life-cycle events invoked thru [respective methods](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle)



### `React.PureComponent`

```JavaScript
class Clock extends React.PureComponent {
  ...
}
```

- Same as `React.Component`
- Implements `shouldComponentUpdate()` by default or as they refer “under the hood” [source](https://facebook.github.io/react/docs/pure-render-mixin.html)
- *Some kind of performance boost* is contingent on the “purity” of your components
  - *Shallowly* compares the current `props` and `state` with the next ones and returns `false` if the equalities pass

##### PureRenderMixin

There appear to be contractual differences between `PureRenderMixin` -- the previous implementation -- & `PureComponent`

>`shouldComponentUpdate` skips updates for the whole component subtree. Make sure all the children components are also “pure”


The use case for `PureComponent` seems to be
