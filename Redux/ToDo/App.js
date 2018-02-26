import React, { Component } from 'react';
import { Provider } from 'react-redux';
import TodoApp from './src/Containers/TodoApp';
import store from './src/Redux/store';

class App extends Component{
    render(){
        return(
            <Provider store={store}>
                <TodoApp/>
            </Provider>
        );
    }
}

export default App;