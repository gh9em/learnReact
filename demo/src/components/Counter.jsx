import React, { Component } from 'react';
import * as redux from 'redux';
// import thunk from 'redux-thunk';

const store = redux.createStore((preState, curAction) => {
    switch (curAction.type) {
        case 'counter/increase':
            return ({ ...preState, count: ++preState.count });
        case 'counter/decrease':
            return ({ ...preState, count: --preState.count });
        default:
            return preState;
    }
}, { count: 0 }/* , redux.applyMiddleware(thunk) */);

export const subscribe = render => store.subscribe(render);
export default class Counter extends Component {

    handleIncrement = () => {
        store.dispatch({ type: 'counter/increase', payload: null });
    }

    handleDecrement = () => {
        store.dispatch({ type: 'counter/decrease', payload: null });
    }

    render() {
        return (<div>
            <input type="button" value="+" onClick={this.handleIncrement} />
            <span style={{ fontSize: 40 }}>{store.getState().count}</span>
            <input type="button" value="-" onClick={this.handleDecrement} />
        </div>);
    }
}