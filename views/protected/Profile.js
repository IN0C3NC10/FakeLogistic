import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { css } from '../../assets/css/Style';
import { FontAwesome } from "@expo/vector-icons"
import MenuRestricted from '../../assets/components/menuRestricted';
// import { Profile, Register, Edit} from './views/_index'

export default function Profile({ navigation }) {

    return (
        <View style={[css.container, css.containerTop]}>
            <MenuRestricted title='Perfil' navigation={navigation} />
        </View>
    );
}