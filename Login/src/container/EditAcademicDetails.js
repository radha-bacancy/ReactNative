import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    AsyncStorage,
    Button,
    Picker,
    Image,
    DatePickerAndroid,
    ToastAndroid,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome'

const AcademicType = [
    {
        label: 'SSC',
        value: 'SSC',
    },
    {
        label: 'HSC',
        value: 'HSC',
    },
    {
        label: "Bachelor's Degree",
        value: "Bachelor's Degree",
    },
    {
        label: "Master's Degree",
        value: "Master's Degree",
    },
    {
        label: 'PhD',
        value: 'PhD',
    },
];

const Status = [
    {
        label: 'Complete',
        value: 'Complete'
    },
    {
        label: 'Ongoing',
        value: 'Ongoing'
    },
];

let loggedInUser;

let s = 'Select Date';
let e = 'Select Date';

class EditAcademicDetails extends Component{

    constructor(props){
        super(props);

        this.state={
            fname:'',
            lname:'',
            ProPic:'',
            emailid: '',
            academicType:'SSC',
            institute: '',
            vi: '',
            status: 'Complete',
            startDate:'',
            endDate: '',
            sd: 'Select Date',
            ed: 'Select Date',
            degree: '',
            vdg: '',
        }
    }

    _selectAcademicType = async (text) => {
        await this.setState({
            academicType: text
        });
    };

    _validateIN = (text) => {
        this.setState({
            vin: '',
        });

        const FL = /^[a-zA-Z\s]+$/;
        if (FL.test(text)) {
            this.setState({
                institute: text,
            })
        }
        else {
            this.setState({
                institute: '',
                vin: 'Enter only alphabets'
            })
        }

        if(text === ''){
            this.setState({
                vin: '',
            })
        }
    };

    _validateDegree = (text) => {
        this.setState({
            vdg: '',
        });

        const FL = /^[a-zA-Z\s]+$/;
        if (FL.test(text)) {
            this.setState({
                degree: text,
            })
        }
        else {
            this.setState({
                degree: '',
                vdg: 'Enter only alphabets'
            })
        }

        if(text === ''){
            this.setState({
                vdg: '',
            })
        }
    };

    _selectStatus = async (text) => {
        if(text === 'Ongoing'){
            this.setState({
                endDate: 'Select Date',
                ed: 'Select Date'
            })
        }
        await this.setState({
            status: text
        })
    };

    _saveData = async () => {
        const { index, academicType, institute, status, startDate, endDate, degree} = this.state;

        if(
            institute === '' ||
            degree === '' ||
            startDate === 'Select Date' ||
            (endDate === 'Select Date' && status === 'Complete') ||
            (endDate !== 'Select Date' && status === 'Ongoing')
        ){
            alert('Enter all values')
        }
        else{
            let users = JSON.parse(await AsyncStorage.getItem('data'));
            let details = {
                academicDetailsIndex: index,
                academicType: academicType,
                institute: institute,
                status: status,
                startDate: startDate,
                endDate: endDate,
                degree: degree,
            };
            for(let i = 0; i < users.length; i++){
                if(loggedInUser.emailid === users[i].emailid) {
                    loggedInUser.academicDetails[this.state.index] = details;
                    users[i].academicDetails[this.state.index] = details;
                    ToastAndroid.showWithGravity(
                        'Details Updated',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                    )
                }
            }
            AsyncStorage.setItem('LogIn', JSON.stringify(loggedInUser));
            AsyncStorage.setItem('data', JSON.stringify(users));
            this.props.navigation.navigate('Academics');
        }
    };

    _startDate = async () => {
        try{
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: (this.state.startDate === 'Select Date')? new Date() : new Date(this.state.startDate),
                minDate: new Date(1997, 0, 30),
                maxDate: (this.state.endDate === 'Select Date') ? new Date() : new Date(this.state.endDate),
            });
            if(action !== DatePickerAndroid.dismissedAction){
                let date = new Date(year, month, day);
                this.state.sd = await date.toLocaleDateString();
                date = date.toString();
                this.setState({
                    startDate: date
                });
            }
        }
        catch(err){
            console.warn(err)
        }
    };

    _endDate = async () => {
        if(this.state.status === 'Complete'){
            try{
                const {action, year, month, day} = await DatePickerAndroid.open({
                    date: (this.state.endDate === 'Select Date')? new Date() : new Date(this.state.endDate),
                    minDate: (this.state.startDate === 'Select Date') ? new Date(1997, 0, 30) : new Date(this.state.startDate),
                    maxDate: new Date(),
                });
                if(action !== DatePickerAndroid.dismissedAction){
                    let date = new Date(year, month, day);
                    this.state.ed = await date.toLocaleDateString();
                    date = date.toString();
                    this.setState({
                        endDate: date
                    });
                }
            }
            catch(err){
                console.warn(err)
            }
        }
        else{
            ToastAndroid.showWithGravity(
                'The course is ongoing',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            )
        }
    };

    componentWillMount(){
        this._loadInitialState().done();
    };

    _loadInitialState = async () => {
        const { params } = this.props.navigation.state;
        loggedInUser = JSON.parse(await AsyncStorage.getItem('LogIn'));
        this.setState({
            fname: loggedInUser.fname,
            lname: loggedInUser.lname,
            ProPic: loggedInUser.ProPic,
            emailid: loggedInUser.emailid,
            index: params.index,
            academicType: loggedInUser.academicDetails[params.index].academicType,
            institute: loggedInUser.academicDetails[params.index].institute,
            status: loggedInUser.academicDetails[params.index].status,
            startDate: loggedInUser.academicDetails[params.index].startDate,
            endDate: loggedInUser.academicDetails[params.index].endDate,
            degree: loggedInUser.academicDetails[params.index].degree
        });
        s = new Date(this.state.startDate);
        s = await s.toLocaleDateString();
        if(this.state.endDate !== 'Select Date'){
            e = new Date(this.state.endDate);
            e = await e.toLocaleDateString();
        }
        this.setState({
            sd: s,
            ed: e
        })
    };

    render(){
        return(
            <View style={{flex: 1, backgroundColor: '#fff', padding: 35, justifyContent: 'space-between' }}>

                <View style={{paddingRight: 5, paddingLeft: 5, paddingTop: 3}}>

                    <KeyboardAwareScrollView>

                        <View style={[styles.container, {paddingBottom: 15}]}>
                            <View style={[styles.avatar, {height: 79}]}>
                                { ( this.state.ProPic === '' || this.state.ProPic === undefined )
                                    ? <Icon name={'user-circle'} size={100}/>
                                    : <Image style={styles.avatar} source={this.state.ProPic}/>
                                }
                            </View>
                            <View style={{backgroundColor: '#ffffff'}}>
                                <Text style={{fontSize: 25}}>{this.state.fname} {this.state.lname}</Text>
                            </View>
                        </View>

                        <View style={{paddingBottom: 10, paddingTop: 3}}>
                            <View>
                                <Text style={{fontSize: 16}}>Academic Type:</Text>
                            </View>
                            <View style={{ borderWidth: 1, borderColor: '#aeaeae'}}>
                                <Picker
                                    style={{padding: 0, height: 35}}
                                    ref={component => this.at = component}
                                    selectedValue={(this.state && this.state.academicType)}
                                    onValueChange = {(text) => this._selectAcademicType(text)}
                                >
                                    {
                                        AcademicType.map((i, index) => (
                                            <Picker.Item key={index} label={i.label} value={i.value}/>
                                        ))
                                    }
                                </Picker>
                            </View>
                        </View>

                        <View style={{paddingBottom: 10, paddingTop: 3}}>
                            <View>
                                <Text style={{fontSize: 16}}>Institute Name*</Text>
                            </View>
                            <View style={{ borderWidth: 1, borderColor: '#aeaeae'}}>
                                <TextInput
                                    placeholder='Enter Institute Name'
                                    onChangeText={(institute) => this._validateIN(institute)}
                                    style={{padding: 0, height: 35}}
                                    underlineColorAndroid='transparent'
                                >{this.state.institute}</TextInput>
                            </View>
                            <View>
                                <Text style={{fontSize: 8, color: '#f00'}}>{this.state.vin}</Text>
                            </View>
                        </View>

                        <View style={{paddingBottom: 10, paddingTop: 3}}>
                            <View>
                                <Text style={{fontSize: 16}}>Status:</Text>
                            </View>
                            <View style={{ borderWidth: 1, borderColor: '#aeaeae'}}>
                                <Picker
                                    style={{padding: 0, height: 35}}
                                    selectedValue={(this.state && this.state.status)}
                                    onValueChange = {(status) => this._selectStatus(status)}
                                >
                                    {
                                        Status.map((i, index) => (
                                            <Picker.Item key={index} label={i.label} value={i.value}/>
                                        ))
                                    }
                                </Picker>
                            </View>
                        </View>

                        <View  style={{flexDirection: 'row', paddingBottom: 10, paddingTop: 3}}>
                            <View style={{flex: 1, flexDirection: 'column', paddingRight: 5}}>
                                <View>
                                    <Text style={{fontSize: 16}}>Start Date:</Text>
                                </View>
                                <View style={{
                                    borderWidth: 1,
                                    borderColor: '#aeaeae',
                                    height: 35,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <TouchableOpacity onPress={this._startDate}>
                                        <Text style={{fontSize: 18}}>
                                            {this.state.sd}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column', paddingLeft: 5}}>
                                <View>
                                    <Text style={{fontSize: 16}}>End Date:</Text>
                                </View>
                                <View style={{
                                    borderWidth: 1,
                                    borderColor: '#aeaeae',
                                    height: 35,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <TouchableOpacity onPress={this._endDate}>
                                        <Text style={{fontSize: 18}}>
                                            {this.state.ed}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{paddingBottom: 10, paddingTop: 3}}>
                            <View>
                                <Text style={{fontSize: 16}}>Degree*</Text>
                            </View>
                            <View style={{ borderWidth: 1, borderColor: '#aeaeae'}}>
                                <TextInput
                                    placeholder='Enter Degree'
                                    onChangeText={(degree) => this._validateDegree(degree)}
                                    style={{padding: 0, height: 35}}
                                    underlineColorAndroid='transparent'
                                >{this.state.degree}</TextInput>
                            </View>
                            <View>
                                <Text style={{fontSize: 8, color: '#f00'}}>{this.state.vdg}</Text>
                            </View>
                        </View>

                    </KeyboardAwareScrollView>
                </View>

                <View style={{alignItems: 'center', justifyContent: 'center', height: 40}}>
                    <View style={{width: 180}}>
                        <Button
                            onPress={this._saveData}
                            title={'Update Data'}
                            color='#FF4500'
                        />
                    </View>
                </View>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 75,
        width: 90,
        height: 90
    }
});

export default EditAcademicDetails