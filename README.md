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
## Modules
### **Redux**(Observer-mode global state manager)
#### Principle

![redux work principle](https://redux.js.org/assets/images/ReduxAsyncDataFlowDiagram-d97ff38a0f4da0f327163170ccc13e80.gif)

Concept
+ Redux(`Module`)
  + `Store` class
  + `Store createStore(Reducer reducer, Object initalState)` api
+ Store(`Object` type): state global storage
  + `Object getState()` api
  + `void dispath(Action action)` api
  + `void subscribe(Subscriber subscriber)` api
+ Reducer(`Function` type): accept params `(preState, curAction)` and return immutable state `Object`, similar to `Array.property.reduce(preResult, curItem)`
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
    // import { combineReducers } from 'redux';
    const combineReducers = reducers => 
        (state = {}, action) => Object.entries(reducers)
            .reduce((preState, [namespace, reduce]) => 
                Object.defineProperty(preState, namespace, {value: reduce(state[namespace], action)}), {});

    const rootReducer = combineReduer({
        action1: function reducerSlice1(preState, action1) { return ({...preState}); },
        action2: function reducerSlice2(preState, action2) { return ({...preState}); },
    });
    ```
#### Install
```bash
npm install redux
```
#### Config
1. modify `@/components/Counter.jsx`
    ```jsx
    ...
    import { createStore } from 'redux';

    const store = createStore((preState, curAction) => {
        switch (curAction.type) {
            case 'counter/increase':
                return ({ ...preState, count: ++preState.count });
            case 'counter/decrease':
                return ({ ...preState, count: --preState.count });
            default:
                return preState;
        }
    }, { count: 0 });

    export const subscribe = render => store.subscribe(render);
    export default class Counter extends Component {
        ...
        handleIncrement = () => {
            store.dispatch({ type: 'counter/increase', payload: null });
        }

        handleDecrement = () => {
            store.dispatch({ type: 'counter/decrease', payload: null });
        }

        render() {
            return (<div>
                ...
                <span ... >{store.getState().count}</span>
                ...
            </div>);
        }
    }
    ...
    ```
2. modify `@/index.js`
    ```js
    ...
    import {subscribe} from './components/Counter';

    const render = () => ReactDOM.render(
        ...
    );

    render();
    subscribe(render);
    ```

#### Add-on(*@reduxjs/toolkit*)
+ Toolkit(`Module`)
  + `Store configureStore({ reducer: { namespace: Reducer } })` api
  + `Slice createSlice({ name: string, initialState: Object, reducers: { namespace: Reducer* } })` api
    + `Reducer*`: similar to `Reducer` but supports mutable state (by lib `Immer`)
  + Slice(`Object` type): slice toolkit
    + `Action actions.namespace()` api
    + `Object reducer(Object preState, Action curAction)` (`Reducer` type) api

### **React-Redux**
