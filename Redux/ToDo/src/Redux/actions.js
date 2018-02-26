import store from '../Redux/store'

export const _addTodo = (text, id) => {
    store.dispatch({
        type: 'ADD_TODO',
        text: text,
        id: id
    });
};

export const _filterTodo = (txt) => {
    store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: txt,
    })
};

export const _getVisibleTodos = (to, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return to.todos;
        case 'SHOW_COMPLETED':
            return to.todos.filter(
                t => t.completed
            );
        case 'SHOW_ACTIVE':
            return to.todos.filter(
                t => !t.completed
            );
    }
};

export const _toggleTodo = (txt) => {
    store.dispatch({
        type: 'TOGGLE_TODO',
        id: txt
    })
};