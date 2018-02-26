import React from 'react';
import { View, Text } from 'react-native';

class ListView extends React.Component {
    render(){
        return (
            <View>
                {
                    (this.props.todos === undefined) ? <Text/> : this.props.todos.map((todo) => {
                        return(
                            <View style = {{flexDirection: 'row'}}>
                                <Text> o   </Text>
                                <Text
                                    onPress={() => this.props.func(todo.id)}
                                    style={{textDecorationLine: (todo.completed === true)
                                            ? 'line-through'
                                            : 'none'}}
                                >{todo.text}</Text>
                            </View>
                        );
                    })
                }
            </View>
        );
    }
}

export default ListView;