import React from 'react';
import { View,Text } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default function Restricted(){
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUser(){
            let response = await AsyncStorage.getItem('userData');
            let json = JSON.parse(response);
            setUser(json.name);
        }
        getUser();
    }, []);

    return(
        <View>
            <Text>Esta é a Dashboard {user}</Text>
        </View>
    );
}