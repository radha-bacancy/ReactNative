import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native'

class Table extends Component {
    render(){
        return(
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Text>Abc</Text>
                </View>
                <View style={{flex: 1}}>
                   <Text>Abc</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text>Abc</Text>
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity><Text>Abc</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Table