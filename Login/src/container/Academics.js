import React, {Component} from 'react';
import {View,Text, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Table, Rows } from 'react-native-table-component';

let arr2 = [];

class Academics extends Component{

    constructor(props){
        super(props);
        this.state={
            array2 : [],
            x: '',
        }
    }

    componentWillMount() {
        this._loadInitialState().done();
    }

    async _loadInitialState(){
        arr2 = [];
        let user = JSON.parse(await AsyncStorage.getItem('LogIn'));
        console.log(user);
        if(user.academicDetails === undefined){

        }
        else {
            await user.academicDetails.map((name) => {
                console.log(name);
                if(name.endDate === 'Select Date'){
                    name.endDate = ''
                }
                let arr = [
                    <View style={{ flexDirection: 'column', borderBottomWidth: 3, borderBottomColor: '#aeaeae'}}>
                        <View style={{paddingTop: 1.5}}>
                            <TouchableOpacity onPress={() => this._edit(name.academicDetailsIndex)}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{color: '#FF4500', fontSize: 16}}> {name.institute}</Text>
                                        <Text style={{color: '#FF4500', fontSize: 14}}>
                                            ({(new Date(name.startDate)).getFullYear()}
                                            -
                                            {(name.status === 'Ongoing')
                                                ? 'Current'
                                                : (new Date(name.endDate)).getFullYear()
                                            })
                                        </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 1.5}}>
                            <Text style={{fontSize: 16}}>  {name.degree}</Text>
                            <Text style={{fontSize:14}}> ({name.status})</Text>
                        </View>
                    </View>
                ];
                arr2.push(arr);
                console.log(arr2)
            });
            this.setState({
                array2: arr2,
            })
        }
        //await AsyncStorage.clear();
        //console.log('All: ' + AsyncStorage.getAllKeys())
    }

    _navi = () => {
        const { navigate } = this.props.navigation;
        navigate('AcademicDetails')
    };

    _edit = (text) => {
        const { navigate } = this.props.navigation;
        navigate('EditAcademicDetails', {index: text});
    };

    render(){
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>

                <View style={{
                    flex: 1,
                    paddingTop: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 15
                }}>
                    <View><Text style={{fontSize: 35}}>Academics</Text></View>
                    <View><Text style={{fontSize: 15}}>Tell us about your education, and professional</Text></View>
                    <View><Text style={{fontSize: 15}}>licenses and certifications</Text></View>
                </View>

                <View style={{flex: 4, paddingRight: 40, paddingLeft: 40 }}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        borderBottomWidth: 3,
                        borderBottomColor: '#aeaeae'
                    }}>
                        <View>
                            <Text style={{fontWeight: 'bold', fontSize: 17}}>Academics</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={this._navi}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{paddingRight: 4}}>
                                        <Icon name={'plus-circle'} size={21}/>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight: 'bold', fontSize: 17, color: '#00f'}}>Add</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <Table borderStyle={{borderWidth: 0}}>
                            <Rows data={this.state.array2}/>
                        </Table>
                    </View>
                </View>
            </View>
        );
    }
}

export default Academics