import React,{ Component } from 'react';
import { Text, View, TextInput, AsyncStorage, Button, ToastAndroid } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {NavigationActions} from "react-navigation";

class ChangePassword extends Component{

    constructor(props){
        super(props);

        this.state = {
            cpd: '',
            pwd: '',
            cpwd: '',
        }
    }

    _validateCPD = (text) => {
        this.setState({
            cpd: text
        })
    };

    _validatePWD = (text) => {
        this.setState({
            vp: '',
        });

        const FL = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[a-zA-Z0-9]{8,}$/;
        if (FL.test(text)) {
            this.setState({
                pwd: text,
                vp: '',
            })
        }
        else {
            this.setState({
                pwd: '',
                vp: 'Enter valid Password '
            })
        }

        if(text === ''){
            this.setState({
                vp: '',
            })
        }
    };

    _validateCPWD = (text) => {
        this.setState({
            vcp: '',
        });

        if(text === this.state.pwd){
            this.setState({
                cpwd: text,
                vcp: '',
            })
        }
        else{
            this.setState({
                cpwd: '',
                vcp: 'Passwords do not match'
            })
        }
    };

    _saveData = async () => {
        let loggedUser = JSON.parse(await AsyncStorage.getItem('LogIn'));
        let users = JSON.parse(await AsyncStorage.getItem('data'));
        if(this.state.cpd === loggedUser.pwd) {
            for(let i =0; i < users.length; i++){
                if(loggedUser.emailid === users[i].emailid){
                    users[i].pwd = this.state.pwd;
                    loggedUser.pwd = this.state.pwd;
                    ToastAndroid.showWithGravity(
                        'Password Changed',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                    );
                    AsyncStorage.setItem('LogIn', JSON.stringify(loggedUser))
                }
            }
            AsyncStorage.setItem('data', JSON.stringify(users))
        }
        else{
            ToastAndroid.showWithGravity(
                'Current Password Incorrect',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            )
        }
        this.props.navigation.dispatch(NavigationActions.back())
    };

    render(){
        return(
            <KeyboardAwareScrollView>

                <View style={{flex: 1}}>
                    <TextInput
                        ref={component => this.cpd = component}
                        secureTextEntry={true}
                        placeholder='Enter Current Password'
                        onSubmitEditing={() => this.pd.focus()}
                        onChangeText={(cpd) => this._validateCPD(cpd)}
                    />
                </View>

                <View style={{flex: 1}}>
                    <View style={{flex: 9}}>
                        <TextInput
                            ref={component => this.pd = component}
                            secureTextEntry={true}
                            placeholder='Enter Password'
                            onSubmitEditing={() => this.cpd.focus()}
                            onChangeText={(pwd) => this._validatePWD(pwd)}
                        />
                    </View>
                    <View>
                        <Text>{this.state.vp}</Text>
                    </View>
                </View>

                <View style={{flex: 1}}>
                    <View style={{flex: 9}}>
                        <TextInput
                            ref={component => this.cpd = component}
                            secureTextEntry={true}
                            placeholder='Confirm Password'
                            onChangeText={(cpwd) => this._validateCPWD(cpwd)}
                        />
                    </View>
                    <View>
                        <Text>{this.state.vcp}</Text>
                    </View>
                </View>

                <View style={{flex: 1}}>
                    <Button
                        title='Change Password'
                        onPress={this._saveData}
                    />
                </View>

            </KeyboardAwareScrollView>
        )
    }

}

export default ChangePassword