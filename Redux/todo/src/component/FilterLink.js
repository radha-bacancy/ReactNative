import React from 'react';
import { View, Text } from 'react-native';

class FilterLink extends React.Component {
    render(){
        return(
            <View style={{flexDirection: 'row'}}>
                <Text onPress={() => this.props.filterLink('SHOW_ALL')}> All </Text>
                <Text onPress={() => this.props.filterLink('SHOW_ACTIVE')}> Active </Text>
                <Text onPress={() => this.props.filterLink('SHOW_COMPLETED')}> Completed </Text>
            </View>
        );
    }
}

export default FilterLink;