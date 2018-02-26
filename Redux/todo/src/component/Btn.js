import React from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';

class Btn extends React.Component {
    render(){
        return (
            <View>
                <TextInput
                    onChangeText={(ToDo) => this.props.enter(ToDo)}
                />
                <TouchableOpacity onPress={this.props.onPress}>
                    <Text>{this.props.children}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Btn;