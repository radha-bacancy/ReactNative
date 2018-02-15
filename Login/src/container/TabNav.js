import React from "react";
import { TabNavigator } from 'react-navigation';
import HomePage from "./HomePage";
import ViewProfile from "./ViewProfile";
import Academics from './Academics';
import Icon from 'react-native-vector-icons/FontAwesome'

const TabNav = new TabNavigator(
    {
        HomePage: {
            screen: HomePage,
            navigationOptions: {
                title: 'Home',
                tabBarIcon: < Icon name={'home'} size={20} color="#ffffff" />
            }
        },
        ViewProfile: {
            screen: ViewProfile,
            navigationOptions: {
                title: 'Profile',
                tabBarIcon: < Icon name={'user'} size={20} color="#ffffff" />
            }
        },
        Academics: {
            screen: Academics,
            navigationOptions: {
                title: 'Academics',
                tabBarIcon: < Icon name={'graduation-cap'} size={20} color="#ffffff" />
            }
        },
    },
    {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showIcon: true,
        },
    },
);

export default TabNav