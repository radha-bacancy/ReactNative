import React, { Component } from 'react'
import {Text, View, Button, AsyncStorage, Image, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

let x;

class ViewProfile extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            emailid: '',
            mobNum: '',
            ProPic: ''
        }
    }

    componentWillMount = async () => {
        x = JSON.parse(await AsyncStorage.getItem('LogIn'))
        console.log(x)
        this.setState({
            name: x.fname + ' ' + x.lname,
            emailid: x.emailid,
            mobNum: x.mobNum,
            ProPic: x.ProPic
        });
    }

    _update = () => {
        const {navigate} = this.props.navigation;
        navigate('UpdateProfile')
    }

    _changePassword = () => {
        const {navigate} = this.props.navigation;
        navigate('ChangePassword');
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: '#eaeaea'}}>
                <View style={{ flexDirection: 'row', backgroundColor: '#ffffff', margin: 10, borderRadius: 6, padding: 10}}>
                    <View style={styles.container}>
                        { (this.state.ProPic == undefined || this.state.ProPic == '')
                            ? < Icon name={'user'} size={90}/>
                            : <Image style={styles.avatar} source={this.state.ProPic} />
                        }
                    </View>
                    <View style={{paddingLeft: 10}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View>
                                <Text>Name          : </Text>
                            </View>
                            <View>
                                <Text>{this.state.name}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View>
                                <Text>Email          : </Text>
                            </View>
                            <View>
                                <Text>{this.state.emailid}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1}}>
                            {
                                (this.state.mobNum == undefined || this.state.mobNum == '') ? <Text/> :
                                    <View style={{flexDirection: 'row'}}>
                                        <View>
                                            <Text>Mobile No  : </Text>
                                        </View>
                                        <View>
                                            <Text>{this.state.mobNum}</Text>
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                </View>
                <View style={{justifyContent: 'flex-end'}}>
                    <Button onPress={this._update} title='Update Content'/>
                </View>
                <View>
                    <Button onPress={this._changePassword} title='Change Password'/>
                </View>
            </View>
        );
    }
 }


const styles = StyleSheet.create({
    container: {
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 5,
        width: 90,
        height: 90
    }
});


export default ViewProfile