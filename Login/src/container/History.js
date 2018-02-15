import React, {Component} from 'react';
import {View, AsyncStorage, Alert, ToastAndroid} from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component';
import Btn from '/home/radha/Desktop/Training/React-Native/Login/src/component/Btn';

let arr2 = [];

class History extends Component{
    static navigationOptions = ({ navigation }) => {
        const { state, setParams } = navigation;
    };

    constructor(props){
        super(props);
        this.state={
            array2 : [],
            x: ''
        }
    }

    _cd = (t) => {
        Alert.alert('Delete Data', 'Are you sure?', [
            {text: 'OK', onPress:(text) => this._delete(t)},
            {text: 'Cancel', onPress: () => {}}
        ],)
    }

    _edit = (text) => {
        console.log(text)
        const { navigate } = this.props.navigation
        navigate('EditProfile', {user: text})
    }

    _delete = async (text) => {
        console.log(text.emailid)
        let user = JSON.parse(await AsyncStorage.getItem('data'))
        let y = user.map((name, index) => {
            if(name.emailid == text.emailid){
                console.log('if')
                user.splice(index, 1)
                console.log(index)
            }
            console.log(user)
        })

        AsyncStorage.setItem('data', JSON.stringify(user))
        if(user.length == 0){
            this.setState({
                array2: user
            })
        }
        else{
            this._loadInitialState().done()
        }
        ToastAndroid.showWithGravity(
            'User Deleted',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
        );
    }

    componentWillMount() {
        this._loadInitialState().done();
    }

    async _loadInitialState(){
        arr2 = []
        let user = JSON.parse(await AsyncStorage.getItem('data'))
        console.log(user)
        await user.map((name) => {
            console.log(name)
            let arr = [
                name.fname,
                name.lname,
                name.emailid,
                name.pwd,
                <Btn onPress={(t) => this._edit(name)}>Edit</Btn>,
                <Btn onPress={(t) => this._cd(name)}>Delete</Btn>
            ]
            arr2.push(arr)
            console.log(arr2)
        })
        this.setState({
            array2: arr2,
        })
        //await AsyncStorage.clear();
        //console.log('All: ' + AsyncStorage.getAllKeys())
    }

    render() {
        const tableHead = ['First Name', 'Last Name', 'Email Id','Mobile No.', 'Edit', 'Delete'];
        return (
            <View>
                <Table>
                    <Row data={tableHead}/>
                    <Rows data={this.state.array2}/>
                </Table>
            </View>
        );
    }

}

export default History