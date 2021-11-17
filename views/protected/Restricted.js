import React from 'react';
import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile, Register, Edit } from '../_index'
import { css } from '../../assets/css/Style';
import { FontAwesome } from "@expo/vector-icons"

export default function Restricted() {
    const Tab = createBottomTabNavigator();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUser() {
            let response = await AsyncStorage.getItem('userData');
            let json = JSON.parse(response);
            setUser(json.name);
        }
        getUser();
    }, []);

    return (
        <Tab.Navigator
            active-color='#999'
            inactiveColor='#fff'
            tabBarItemStyle={css.areaTab}
        >
            <Tab.Screen 
            name="Profile" 
            component={Profile}
            options={{
                headerShown:false,
                tabBarIcon:()=>{
                    <FontAwesome name="user" size={18} color="#333" />
                }
            }} />
            <Tab.Screen name="Register" component={Register} />
            <Tab.Screen name="Edit" component={Edit} />
        </Tab.Navigator>
    );
}