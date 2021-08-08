import React, { Component } from 'react'

export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.count || 0,
        };
    }

    handleIncrement = () => {
        this.setState((preState, preProps) => ({...preState, count: ++preState.count}));
    }

    handleDecrement = () => {
        this.setState((preState, preProps) => ({...preState, count: --preState.count}));
    }

    render() {
        return (<div>
        <input type="button" value="+" onClick={this.handleIncrement} />
        <span style={{fontSize: 40}}>{this.state.count}</span>
        <input type="button" value="-" onClick={this.handleDecrement} />
        </div>);
    }
}