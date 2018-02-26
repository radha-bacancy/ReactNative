import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class EnterTodo extends Component{
    render(){
        return(
            <View>
                <TouchableOpacity onPress={this.props.onPress}>
                    <Text>{this.props.children}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default EnterTodo;