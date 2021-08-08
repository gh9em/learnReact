# learnReact
## Install
```bash
# npm install --save-dev create-react-app
# ./node_modules/.bin/create-react-app demo
npx create-react-app demo
cd demo
```
## Config
~~`npm run eject`~~`npm install react-app-rewired`
> see [react project custom 'dist' path](https://segmentfault.com/a/1190000018593030)
## Component
1. create file `@/components/Counter.jsx`
    ```jsx
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
    ```
2. modify `@/App.js`
    ```jsx
    ...
    import Counter from './components/Counter';

    function App() {
        return (
            ...
            <Counter />
            <Counter count="1"/>
            ...
        );
    }
    ...
    ```

## Redux

![redux work principle](http://cn.redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

+ Redux(`Module`)
  + `Store` class
  + `Store createStore(Reducer reducer)` api
+ Store(`Object` type): state global storage
  + `Object getState()` api
  + `void dispath(Action action)` api
  + `void subscribe(Subscriber subscriber)` api
+ Reducer(`Function` type): accept params `(preState, curAction)`, similar to `Array.property.reduce(preResult, curItem)`
  + Reducer Slice(`Function` type): all combined into a root reducer, for example
    ```js
    /**
     *          |-rootReducer(Reducer)----------------------------------|
     *          |  |--------------|  |--------------|  |--------------| |
     * preState>|>>|reducerSlice1 |>>|reducerSlice2 |>>|      ...     | |
     * newState<|<<|(ReducerSlice)|<<|(ReducerSlice)|<<|(ReducerSlice)| |
     *          |  |--------------|  |--------------|  |--------------| |
     *          |-------------------------------------------------------|
     */
    // import { combineReduer } from 'redux';
    const combineReducers = reducers => 
        (state = {}, action) => Object.entries(reducers)
            .reduce((preState, [namespace, reduce]) => 
                Object.defineProperty(preState, namespace, {value: reduce(state[namespace], action)}), {});

    const rootReducer = combineReduer({
        action1: reducerSlice1(preState, action1) => ({...preState}),
        action2: reducerSlice2(preState, action2) => ({...preState}),
    });
    ```
