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
        {this.state.count}
        <input type="button" value="+" onClick={this.handleIncrement} />
        <input type="button" value="-" onClick={this.handleDecrement} />
        </div>);
    }
}