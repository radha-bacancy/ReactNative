import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import simpleForm from './src/Components/simpleForm'

class App extends Component{
    render(){
        return(
            <Provider store={store}>
                <simpleForm/>
            </Provider>
        );
    }
}

export default App