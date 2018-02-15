import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

class Recent extends Component
{
  render()
  {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Text> Recent </Text>
        <Button
          onPress = {() => navigate('Chat', {user: 'Lucy'})}
          title = "Chat with Lucy"
        />
      </View>
    );
  }
}

export default Recent;