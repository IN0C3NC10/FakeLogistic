import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { css } from '../../assets/css/Style';
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from '@react-native-community/async-storage';

export default function MenuRestricted(props){
    async function logout() {
        await AsyncStorage.clear();
        props.navigation.navigate('Home');
    }

    return (
        <View style={css.areaMenu}>
            <Text style={css.areaTitle}>{props.title}</Text>
            <TouchableOpacity style={css.btnLogout} onPress={()=>logout()}>
                <FontAwesome name="sign-out" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}