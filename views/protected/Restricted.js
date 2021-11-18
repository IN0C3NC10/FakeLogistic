import React from 'react';
import { View, Text, BackHandler, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile, Register, Edit } from '../_index'
import { css } from '../../assets/css/Style';
import { FontAwesome } from "@expo/vector-icons"

export default function Restricted({ navigation }) {
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

    //................................................................
    // ..BackHandle
    //................................................................
    useEffect(() => {
        const backAction = () => {
            Alert.alert('Opa!', 'Deseja mesmo sair?', [
                {
                    text: 'Não',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'Sim', onPress: () => {
                    navigation.navigate('Home');
                    BackHandler.exitApp();
                }},
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, []);
    //................................................................
    // ..BackHandle
    //................................................................

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
                    headerShown: false,
                    tabBarIcon: () => {
                        <FontAwesome name="user" size={18} color="#333" />
                    }
                }} />
            <Tab.Screen name="Register" component={Register} options={{ headerShown: false, }} />
            <Tab.Screen name="Edit" component={Edit} options={{ headerShown: false, }} />
        </Tab.Navigator>
    );
}