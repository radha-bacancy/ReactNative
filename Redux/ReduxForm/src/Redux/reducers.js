import React from 'react';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    form: formReducer
});

export default reducers
