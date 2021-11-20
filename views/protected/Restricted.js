import React from 'react';
import { View, Text, BackHandler, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile, Register, Edit } from '../_index'
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
                {
                    text: 'Sim', onPress: () => {
                        navigation.navigate('Home');
                        BackHandler.exitApp();
                    }
                },
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
            tabBarOptions={{
                activeTintColor: '#fff',
                inactiveTintColor: '#999',
                activeBackgroundColor: '#000',
                inactiveBackgroundColor: '#333',
                style: {
                    fontWeight: 'bold',
                    backgroundColor: '#333',
                    paddingBottom: 3
                }
            }}
        >
            <Tab.Screen
                name="Register"
                component={Register}
                options={{
                    title: 'Cadastrar',
                    headerShown: false,
                    tabBarIcon: () => (
                        <FontAwesome name="archive" size={20} color="white" />
                    )
                }}
            />
            <Tab.Screen
                name="Edit"
                component={Edit}
                options={{
                    title: 'Atualizar',
                    headerShown: false,
                    tabBarIcon: () => (
                        <FontAwesome name="pencil-square" size={20} color="white" />
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: 'Perfil',
                    headerShown: false,
                    tabBarIcon: () => (
                        <FontAwesome name="user" size={20} color="white" />
                    )
                }}
            />
        </Tab.Navigator>
    );
}