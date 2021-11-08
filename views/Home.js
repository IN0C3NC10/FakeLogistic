import React from 'react';
import { View,Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { css } from '../assets/css/Css'

export default function Home({navigation}){
    return(
        <View style={css.home}>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                <MaterialCommunityIcons style={css.btnHome} name="account-box" />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('Track')}>
                <MaterialCommunityIcons style={css.btnHome} name="map-search" />
            </TouchableOpacity>
        </View>
    );
}