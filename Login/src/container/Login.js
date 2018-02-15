import React, { Component } from 'react'
import {View, Text, TextInput, Alert, Button, TouchableOpacity, AsyncStorage, ToastAndroid} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

let userDetails = []
let user = 0;

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            login: '',
            vln: '',
            pd: '',
            vpd: ''
        }
    }

    _validateEID = (text) => {
        this.setState({
            login: text,
        })
    }

    _enter = (text) => {
        this.setState({
            pd: text
        })
    }

    _login = async () => {
        const {login, pd} = this.state
        check = false
        if(login == '' || pd == ''){
            ToastAndroid.showWithGravity(
                'Enter values',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
            );
            this._clearData()
        }
        else{
            userDetails = JSON.parse(await AsyncStorage.getItem('data'))
            console.log(userDetails)
            await userDetails.map((name)=>{
                console.log('name: ' + name)
                if(login != name.emailid || pd != name.pwd){
                    user = 1;
                }
                else{
                    user = 0;
                    ToastAndroid.showWithGravity(
                        'Logged In',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                    );
                    AsyncStorage.setItem('LogIn', JSON.stringify(name))
                    const { navigate } = this.props.navigation
                    navigate('HomePage');
                }
            })
            if(user>=0){
                ToastAndroid.showWithGravity(
                    'Incorrect Login Credentials',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                )
            }
            this._clearData()
        }
    }

    _clearData = () => {
        this.login.setNativeProps({text: ''});
        this.pd.setNativeProps({text: ''});
        this.setState({
            login: '',
            vln: '',
            pd: '',
            vpd: ''
        })
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <KeyboardAwareScrollView style={{flex:1}}>
                <View style={{flex:6}}>
                    <View style={{flex:1}}>
                        <View style={{flex:9}}>
                            <TextInput
                                ref={component => this.login = component}
                                placeholder='Enter Email Id'
                                onSubmitEditing={() => this.pd.focus()}
                                onChangeText={(login) => this._validateEID(login)}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <Text>{this.state.vln}</Text>
                        </View>
                    </View>

                    <View style={{flex: 1}}>
                        <View style={{flex: 9}}>
                            <TextInput
                                ref={component => this.pd = component}
                                secureTextEntry={true}
                                placeholder='Enter Password'
                                onChangeText={(pd) => this._enter(pd)}
                            />
                        </View>
                        <View>
                            <Text>{this.state.vp}</Text>
                        </View>
                    </View>

                    <View style={{flex: 1}}>
                        <Button title='Login' onPress={this._login}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Button
                            onPress = {()=>navigate('RegisterationPage')}
                            title = 'Register'
                        />
                    </View>
                </View>

            </KeyboardAwareScrollView>
        );
    }
}

export default Login