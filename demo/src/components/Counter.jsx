import React from 'react';
import { connect } from '../react-redux';

const Counter = props => (<div>
    <input type="button" value="+" onClick={props.handleIncrement} />
    <span style={{ fontSize: 40 }}>{props.count}</span>
    <input type="button" value="-" onClick={props.handleDecrement} />
</div>);

export default connect(
    (state, props) => ({ count: state.count }),
    (dispatch, props) => ({
        handleIncrement: () => dispatch({ type: 'counter/increase', payload: null }),
        handleDecrement: () => dispatch({ type: 'counter/decrease', payload: null }),
    })
)(Counter);