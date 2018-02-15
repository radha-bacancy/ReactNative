import React, { Component } from 'react';
import {View, TextInput, Button, Text, AsyncStorage, Alert, Keyboard, ToastAndroid} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

let userDetails = [];
let validUser = true;

class RegisterationPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            fname: '',
            lname: '',
            emailid: '',
            pwd: '',
            cpwd: '',
            vfn: '',
            vln: '',
            vei: '',
            vp: '',
            vcp: '',
        }
    }

    _validateFN = (text) => {
        this.setState({
            vfn: '',
        });

        const FL = /^[a-zA-Z]+$/;
        if (FL.test(text)) {
            this.setState({
                fname: text,
            })
        }
        else {
            this.setState({
                fname: '',
                vfn: 'Enter only alphabets'
            })
        }

        if(text === ''){
            this.setState({
                vfn: '',
            })
        }
    };

    _validateLN = (text) => {
        this.setState({
            vln: '',
        });

        const FL = /^[a-zA-Z]+$/;
        if (FL.test(text)) {
            this.setState({
                lname: text,
            })
        }
        else {
            this.setState({
                lname: '',
                vln: 'Enter only alphabets'
            })
        }

        if(text === ''){
            this.setState({
                vln: '',
            })
        }
    };

    _validateEID = (text    ) => {
        this.setState({
            vei: '',
        });

        const FL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}/;
        if (FL.test(text)) {
            this.setState({
                emailid: text,
            })
        }
        else {
            this.setState({
                emailid: '',
                vei: 'Enter valid Email'
            })
        }

        if(text === ''){
            this.setState({
                vei: '',
            })
        }
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
        try {
            const {fname, lname, emailid, pwd, cpwd} = this.state;
            let user = {
                fname: fname,
                lname: lname,
                emailid: emailid,
                pwd: pwd,
            }
            console.log(user)
            if (fname == '' || lname == '' || emailid == '' || pwd == '' || cpwd == '') {
                ToastAndroid.showWithGravity(
                    'Enter all Values',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                );
                this._clearData()
            }
            else {
                console.log(user.emailid)
                console.log(userDetails)
                console.log(JSON.parse(await AsyncStorage.getItem('data')))
                userDetails = JSON.parse(await AsyncStorage.getItem('data'));
                console.log(userDetails)
                await userDetails.map((name) => {
                    console.log(name)
                    if (emailid === name.emailid) {
                        console.log('if')
                        validUser = false
                        ToastAndroid.showWithGravity(
                            'User Already Exists',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                        );                    }
                })
                console.log(validUser)
                if (validUser === true) {
                    userDetails.push(user)
                    console.log(userDetails)
                    AsyncStorage.setItem('data', JSON.stringify(userDetails))
                    ToastAndroid.showWithGravity(
                        'User Created',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                    );
                    this._clearData()
                }
            }
        }
        catch(err){
            const {fname, lname, emailid, pwd} = this.state;
            let usr = {
                fname: fname,
                lname: lname,
                emailid: emailid,
                pwd: pwd,
            }
            userDetails = []
            userDetails.push(usr)
            console.log(userDetails)
            AsyncStorage.setItem('data', JSON.stringify(userDetails))
            ToastAndroid.showWithGravity(
                'User Created',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
            );
            this._clearData()
        }
    }

    _clearData = () => {
        this.fn.setNativeProps({text: ''});
        this.ln.setNativeProps({text: ''});
        this.eid.setNativeProps({text: ''});
        this.pd.setNativeProps({text: ''});
        this.cpd.setNativeProps({text: ''});
        this.setState({
            fname: '',
            lname: '',
            emailid: '',
            pwd: '',
            cpwd: '',
            vfn: '',
            vln: '',
            vei: '',
            vp: '',
            vcp: '',
        })
    };

    render(){
        const { navigate } = this.props.navigation;
        return(
            <KeyboardAwareScrollView>

                <View style={{flex: 1}}>

                    <View style={{flex: 1, flexDirection:'row'}}>
                        <View style={{flex: 1}}>
                            <View style={{flex: 9}}>
                                <TextInput
                                    ref={component => this.fn = component}
                                    placeholder='First Name'
                                    onSubmitEditing={() => this.ln.focus()}
                                    onChangeText={(fname) => this._validateFN(fname)}
                                />
                            </View>
                            <View>
                                <Text>{this.state.vfn}</Text>
                            </View>
                        </View>

                        <View style={{flex: 1}}>
                            <View style={{flex: 9}}>
                                <TextInput
                                    ref={component => this.ln = component}
                                    placeholder='Last Name'
                                    onSubmitEditing={() => this.eid.focus()}
                                    onChangeText={(lname) => this._validateLN(lname)}
                                />
                            </View>
                            <View>
                                <Text>{this.state.vln}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flex: 1}}>
                        <View style={{flex: 9}}>
                            <TextInput
                                ref={component => this.eid = component}
                                placeholder='Enter Email'
                                onSubmitEditing={() => this.pd.focus()}
                                onChangeText={(emailid) => this._validateEID(emailid)}
                            />
                        </View>
                        <View>
                            <Text>{this.state.vei}</Text>
                        </View>
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
                                onSubmitEditing={() => this._saveData}
                                onChangeText={(cpwd) => this._validateCPWD(cpwd)}
                            />
                        </View>
                        <View>
                            <Text>{this.state.vcp}</Text>
                        </View>
                    </View>

                    <View style={{flex: 2, justifyContent:'flex-end'}}>

                        <View style={{flex: 1, flexDirection:'row'}}>

                            <View style={{flex: 1}}>
                                <Button
                                    title='Submit'
                                    onPress={this._saveData}
                                />
                            </View>

                            <View style={{flex: 1}}>
                                <Button title='Reset' onPress={this._clearData}/>
                            </View>

                        </View>

                        <View style={{flex: 1}}>
                            <Button title='History' onPress={() => navigate('History')}/>
                        </View>

                    </View>

                </View>

            </KeyboardAwareScrollView>
        );
    };
}

export default RegisterationPage