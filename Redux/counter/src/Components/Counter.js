import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';

const Counter = (props) => {
    return (
        <View>
            <Text>{props.children}</Text>
            <TouchableOpacity onPress={props.increment}>
                <Text> INCREMENT </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.decrement}>
                <Text> DECREMENT </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Counter;