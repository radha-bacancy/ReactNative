import React from 'react';
import Counter from './src/Components/Counter';
import { createStore } from 'redux';

const counter = ( state = 0, action ) => {
    switch ( action.type ) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

export let store = createStore(counter);

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            c1: store.getState(),
        };
    }

    componentWillMount = () => {
        store.subscribe(this._refresh);
    };

    _increment = () => {
        store.dispatch({type: 'INCREMENT'});
        store.subscribe(this._refresh);
    };

    _decrement = () => {
        store.dispatch({type: 'DECREMENT'});
        store.subscribe(this._refresh);
    };

    _refresh = () => {
        this.setState({
            c1: store.getState()
        })
    };

    render(){
        return(
            <Counter
                increment={this._increment}
                decrement={this._decrement}
            >
                {this.state.c1}
            </Counter>
        );
    }
}

export default App;