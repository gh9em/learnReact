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
