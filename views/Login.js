import React from 'react';
import { View, Image, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { css } from '../assets/css/Style';
import { useState, useEffect } from 'react';

export default function Login({ navigation }) {
    const [display, setDisplay] = useState('none');
    return (
        <KeyboardAvoidingView style={[css.container, css.darkBkg]} behavior={Platform.OS=="ios"?"padding":"height"}>
            <View style={css.loginLogo}>
                <Image source={require('../assets/icon.png')} style={{width: 120, height: 120}}/>
            </View>
            <View>
                <Text style={css.loginMsg}>Usuário ou senha incorreta!</Text>
            </View>
            <View style={css.loginForm}>
                <TextInput style={css.loginInp} placeholder='Usuário'></TextInput>
                <TextInput style={css.loginInp} placeholder='Senha' secureTextEntry={true}></TextInput>
                <TouchableOpacity style={css.loginBtn}>
                    <Text style={css.loginBtnTxt}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}