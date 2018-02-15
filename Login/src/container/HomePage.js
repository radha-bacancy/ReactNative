import React, { Component } from 'react'
import {Text, Button, View, AsyncStorage, ToastAndroid} from 'react-native'

class HomePage extends Component{
    static navigationOptions: {
        title: 'Home',
    }

    constructor(){
        super();
        this.state={
            name: ''
        }
    }

    componentWillMount = async () => {
        x = JSON.parse(await AsyncStorage.getItem('LogIn'));
        console.log(x);
        if(x === null){
            const { navigate } = this.props.navigation
            navigate('Login')
        }
        else{
            this.setState({
                name: x.fname+' '+x.lname,
            })
        }
    }

    _logout = async () => {
        await AsyncStorage.removeItem('LogIn')
        ToastAndroid.showWithGravity(
            'Logged Out',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
        );
        const { navigate } = this.props.navigation
        navigate('Login')
    }

    render(){
        const { params } = this.props.navigation.state;
        return(
            <View>
                <Text> Welcome {this.state.name}</Text>
                <Button
                    onPress={this._logout}
                    title='Logout'
                />
            </View>
        )
    }
}

export default HomePage