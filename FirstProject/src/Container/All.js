import React, { Component } from 'react'
import {View, Text, Button} from 'react-native'

class All extends Component
{
  render()
  {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Text> All </Text>
        <Button
          onPress={() => navigate('Chat', {user: 'Luke'})}
          title="Chat with Luke"
        />
      </View>
    );
  }
}

export default All;
