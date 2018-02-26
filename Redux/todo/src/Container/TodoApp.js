import React, { Component } from 'react';
import { View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import Btn from '../component/Btn';
import ListView from '../component/ListView';
import FilterLink from '../component/FilterLink';

const todoApp = combineReducers({todos, visibilityFilter});

const store = createStore(todoApp);

let nextTodoId = 1;

class TodoApp extends Component{

    constructor(props){
        super(props);
        this.state={
            td: [],
            ToDo: '',
        }
    }

    _enterTodo = (txt) => {
        this.setState({
            ToDo: txt
        });
    };


    render() {
        store.subscribe(this._refresh);
        let visibleTodos = this._getVisibleTodos(this.state.td, this.state.td.visibilityFilter);
        return(
            <View>
                <Btn enter={this._enterTodo} onPress={this._addTodo}>Add Todo</Btn>
                <ListView todos={visibleTodos} func={this._toggleTodo}/>
                <FilterLink filterLink={this._filterTodo}/>
                <FilterLink/>
            </View>
        );
    };
}

export default TodoApp;