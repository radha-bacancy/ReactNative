import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, TextInput } from 'react-native';
import EnterTodo from '../Component/EnterTodo';
import FilterLink from '../Component/FilterLink';
import ListView from '../Component/ListView';
import * as actions from '../Redux/actions'

let nextTodoId = 1;

class TodoApp extends Component {

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

    componentWillReceiveProps = ( nextProps ) => {
        this.setState({
            td: {
                todos: nextProps.todos,
                visibilityFilter: nextProps.visibilityFilter
            },
        })
    };

    render(){
        let visibleTodos = actions._getVisibleTodos(this.state.td, this.state.td.visibilityFilter);
        return(
            <View>
                <TextInput
                    onChangeText={(txt) => this._enterTodo(txt)}
                />
                <EnterTodo onPress={() => actions._addTodo(this.state.ToDo, nextTodoId++)}>Add Todo</EnterTodo>
                <ListView todos={visibleTodos} func={actions._toggleTodo}/>
                <FilterLink filterLink={actions._filterTodo}/>
            </View>
        );

    }
}

function mapStateToProps(state, props) {
    return {
        todos: state.todos,
        visibilityFilter: state.visibilityFilter
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
