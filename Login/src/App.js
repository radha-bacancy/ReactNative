import React from 'react';
import { StackNavigator } from 'react-navigation'
import TabNav from './container/TabNav'
import Login from './container/Login'
import RegisterationPage from './container/RegisterationPage';
import UpdateProfile from './container/UpdateProfile'
import ChangePassword from './container/ChangePassword';
import History from './container/History';
import EditProfile from './container/EditProfile'
import AcademicDetails from "./container/AcademicDetails";
import EditAcademicDetails from './container/EditAcademicDetails'

const App = new StackNavigator({
        TabNav: {
            screen: TabNav,
            navigationOptions: {
                headerLeft: null
            }
        },

        Login: {
            screen: Login,
            navigationOptions: {
                title: 'Login',
                headerLeft: null
            }
        },

        RegisterationPage: {
            screen: RegisterationPage,
            navigationOptions: {
                title: 'Registeration',
            }
        },

        UpdateProfile: {
            screen: UpdateProfile,
            navigationOptions: {
                title: 'Update Profile',
            }
        },

        ChangePassword: {
            screen: ChangePassword,
            navigationOptions: {
                title: 'Change Password',
            }
        },

        History: {
            screen: History,
            navigationOptions: {
                title: 'History'
            }
        },

        EditProfile: {
            screen: EditProfile,
            navigationOptions: {
                title: 'Edit Profile Info',
            },
        },

        AcademicDetails: {
            screen: AcademicDetails,
            navigationOptions: {
                title: 'Academic Details'
            }
        },

        EditAcademicDetails: {
            screen: EditAcademicDetails,
            navigationOptions: {
                title: 'Edit Academic Details'
            }
        }
});

export default App;