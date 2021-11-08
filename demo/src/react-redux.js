import React, { Component } from 'react';

const ReduxContext = React.createContext();

export const Provider = props => (<ReduxContext.Provider value={props.store} {...props} />);
export function connect(mapStateToProps, mapDispatchToProps) {
    return WrappedComponent => {
        class WrapperComponent extends Component {
            render() {
                return (
                    <ReduxContext.Consumer>
                        {store => {
                            if (!store)
                                throw new Error(`Component '${WrapperComponent.displayName}' must wrapped with '${Provider.name}'`);
                            store.subscribe(() => this.forceUpdate());
                            return (<WrappedComponent
                                {...this.props}
                                {...mapStateToProps(store.getState(), this.props)}
                                {...mapDispatchToProps(store.dispatch, this.props)}
                                ref={this.props.forwardedRef} />);
                        }}
                    </ReduxContext.Consumer>
                );
            }
        };
        /* manual copy static methods */
        WrapperComponent.displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

        return React.forwardRef((props, ref) => {
            const wrappedRef = React.useRef();
            /* append wrappedRef method to ref */
            React.useImperativeHandle(ref, () => ({
                doSomthing: (...args) => wrappedRef.current.doSomthing(...args),
            }));
            return (<WrapperComponent {...props} forwardedRef={wrappedRef} />);
        });
    };
};