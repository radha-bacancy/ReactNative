import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const Btn = (props) => {
    return(
        <TouchableOpacity onPress={props.onPress}>
            <Text style={{color: '#FF4500'}}> { props.children } </Text>
        </TouchableOpacity>
    );
};

export default Btn