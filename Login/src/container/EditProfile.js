import React, { Component } from 'react';
import {View, TextInput, Button, Text, AsyncStorage, Alert, Keyboard, ToastAndroid} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {NavigationActions} from "react-navigation";

let userDetails = [];
let validUser = true;

class EditProfile extends Component{

    constructor(props){
        super(props);
        this.state = {
            fname: '',
            lname: '',
            emailid: '',
            vfn: '',
            vln: '',
            vei: '',
        }
    }

    componentWillMount = () => {
        const { params } = this.props.navigation.state;

        console.log(params.user);

        this.setState({
            fname: params.user.fname,
            lname: params.user.lname,
            emailid: params.user.emailid,
        })
    };

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

    _validateEID = (text) => {
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

    _saveData = async () => {
        const {fname, lname, emailid} = this.state;
        let user = {
            fname: fname,
            lname: lname,
            emailid: emailid,
        }
        console.log(user)
        if (fname == '' || lname == '' || emailid == '') {
            ToastAndroid.showWithGravity(
                'Enter all Values',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
            );
        }
        else {
            let userDetails = JSON.parse(await AsyncStorage.getItem('data'));
            await userDetails.map((name) => {
                console.log(name);
                if(emailid === name.emailid) {
                    name.fname = fname;
                    name.lname = lname;
                    AsyncStorage.setItem('data', JSON.stringify(userDetails));
                    ToastAndroid.showWithGravity(
                        'Details Updated',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                    );
                }
            })
        }
        this.props.navigation.dispatch(NavigationActions.back())
    };

    _nav = async () =>{
        this.props.navigation.dispatch(NavigationActions.back())
    };

    render(){
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;

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
                                >{params.user.fname}</TextInput>
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
                                >{params.user.lname}</TextInput>
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
                                onChangeText={(emailid) => this._validateEID(emailid)}
                            >{params.user.emailid}</TextInput>
                        </View>
                        <View>
                            <Text>{this.state.vei}</Text>
                        </View>
                    </View>

                    <View style={{flex: 1}}>
                        <Button
                            title='Submit'
                            onPress={this._saveData}
                        />
                    </View>

                    <View>
                        <Button
                            title='Cancel'
                            onPress={this._nav}
                        />
                    </View>

                </View>

            </KeyboardAwareScrollView>
        );
    };
}

export default EditProfile