import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  count: store.count
});

const mapDispatchToProps = dispatch => ({
  increment: count => dispatch(actions.increment(count)),
  decrement: count => dispatch(actions.decrement(count))
});

@connect(mapStateToProps,mapDispatchToProps)
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {count, increment, decrement} = this.props;

    return (
      <div>
        <h1>The count is {count}</h1>
        <button onClick={() => increment(count)}>+</button>
        <button onClick={() => decrement(count)}>-</button>
      </div>
    );
  }
}
export default App;

// TODO: 或不用@connect的形式，用下面这种连接
// export default connect(mapStateToProps, mapDispatchToProps)(App);