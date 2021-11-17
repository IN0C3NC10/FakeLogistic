import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { css } from '../../assets/css/Style';
import { FontAwesome } from "@expo/vector-icons"
// import { Profile, Register, Edit} from './views/_index'

export default function Profile({ navigation }) {

    async function logout() {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    return (
        <View style={css.areaMenu}>
            <TouchableOpacity style={css.btnHome2} onPress={()=>navigation.navigate('Home')}>
                <FontAwesome name="home" size={20} color="#999" />
            </TouchableOpacity>
            <Text style={css.areaTitle}>Profile</Text>
            <TouchableOpacity style={css.btnLogout} onPress={()=>logout()}>
                <FontAwesome name="sign-out" size={20} color="#999" />
            </TouchableOpacity>
        </View>
    );
}