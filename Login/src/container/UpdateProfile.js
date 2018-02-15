import React, { Component } from 'react';
import {AsyncStorage, View, Text, TextInput, Image, Button, ToastAndroid, StyleSheet, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import {NavigationActions} from "react-navigation";

var y;
let arr = [];

class UpdateProfile extends Component{

    componentWillMount = async () => {
        y = JSON.parse(await AsyncStorage.getItem('LogIn'));
        this.setState({
            fname: y.fname,
            lname: y.lname,
            emailid: y.emailid,
            mobNum: y.mobNum,
            ProPic: y.ProPic,
        })
        console.log(this.state.fname + '   ' + y.lname)
    };

    constructor(props){
        super(props);

        this.state={
            fname: '',
            vfn: '',
            lname: '',
            vln: '',
            emailid: '',
            vei: '',
            mobNum: '',
            vm: '',
            ProPic: '',
        }
    }

    _upldPic = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    ProPic: source
                });
            }
        });
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

    _validateMN = (text) => {
        this.setState({
            vm: '',
        });

        const FL = /[7-9][0-9]{9}/;
        if (FL.test(text)) {
            this.setState({
                mobNum: text,
            });
            console.log()
        }
        else {
            this.setState({
                mobNum: '',
                vm: 'Enter valid Contact Number'
            })
        }

        if(text === ''){
            this.setState({
                vm: '',
            })
        }
    };

    _submit = async () => {
        let usr = JSON.parse(await AsyncStorage.getItem('LogIn'));
        let userDetails = JSON.parse(await AsyncStorage.getItem('data'));
        let x = {
            fname: this.state.fname,
            lname: this.state.lname,
            emailid: this.state.emailid,
            pwd: this.state.pwd,
            ProPic: this.state.ProPic,
            mobNum: this.state.mobNum
        };
        for(let i = 0; i < userDetails.length; i++) {
            console.log('usr.emailid : ' + usr.emailid);
            console.log('userDetails[i].emailid : ' + userDetails[i].emailid);
            if(usr.emailid === userDetails[i].emailid){
                if(x.emailid === userDetails[i].emailid){
                    if(x.emailid === usr.emailid){
                        console.log('if 3');
                        userDetails[i].ProPic = this.state.ProPic;
                        userDetails[i].mobNum = this.state.mobNum;
                        userDetails[i].emailid = this.state.emailid;
                        AsyncStorage.setItem('LogIn', JSON.stringify(userDetails[i]));
                        ToastAndroid.showWithGravity(
                            'Details Updated',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                        )
                    }
                    else{
                        console.log('else 3');
                        ToastAndroid.showWithGravity(
                            'User already Exits',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                        )
                    }
                }
                else{
                    ToastAndroid.showWithGravity(
                        'User Already Exists',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                    )
                }
            }
        }
        AsyncStorage.setItem('data', JSON.stringify(userDetails));
        this.props.navigation.dispatch(NavigationActions.back())
    };

    _nav = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    };

    render(){
        return(
            <KeyboardAwareScrollView>

                <View style={{flex: 1}}>

                    <View style={styles.container}>
                        <TouchableOpacity onPress={()=>{this._upldPic()}}>
                            <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                                { ( this.state.ProPic === '' || this.state.ProPic === undefined )
                                    ? <Text>Select a Photo</Text>
                                    : <Image style={styles.avatar} source={this.state.ProPic}/>
                                }
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 1, flexDirection:'row'}}>

                        <View style={{flex: 1}}>
                            <View style={{flex: 9}}>
                                <TextInput
                                    ref={component => this.fn = component}
                                    placeholder='First Name'
                                    onSubmitEditing={() => this.ln.focus()}
                                    onChangeText={(fname) => this._validateFN(fname)}
                                >{this.state.fname}</TextInput>
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
                                >{this.state.lname}</TextInput>
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
                                onSubmitEditing={() => this.mn.focus()}
                                onChangeText={(emailid) => this._validateEID(emailid)}
                            >{this.state.emailid}</TextInput>
                        </View>
                        <View>
                            <Text>{this.state.vei}</Text>
                        </View>
                    </View>

                    <View style={{flex: 1}}>
                        <View style={{flex: 9}}>
                            <TextInput
                                ref={component => this.mn = component}
                                placeholder='Mobile No.'
                                onChangeText={(mobNum) => this._validateMN(mobNum)}
                            />
                        </View>
                        <View>
                            <Text>{this.state.vm}</Text>
                        </View>
                    </View>

                    <View style={{flex: 1}}>

                        <View style={{flex: 1}}>
                            <Button title='Submit' onPress={this._submit}/>
                        </View>

                        <View>
                            <Button title='Cancel' onPress={this._nav}/>
                        </View>

                    </View>

                </View>

            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarContainer: {
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 5,
        width: 150,
        height: 150
    }
});

export default UpdateProfile