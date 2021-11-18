import React from 'react';
import { View, Image, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { css } from '../assets/css/Style';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config/config.json';

export default function Login({ navigation }) {

    // const [display, setDisplay] = useState('none');
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [login, setLogin] = useState(null);
    const [answer, setAnswer] = useState(null);

    //................................................................
    // ..Função que envia os dados para a rota 'login'
    //................................................................
    async function sendForm() {
        let response = await fetch(`${config.urlRoot}/login`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: user,
                password: password,
            }),
        });
        // ..recupera a resposta do server
        setAnswer(await response.json());
        if (answer === 'error' || answer === null) {
            // ..define um limitador para a mensagem de erro
            setTimeout(() => {
                setAnswer(null);
            }, 5000);
            
            // ..limpa a "sessão"
            await AsyncStorage.clear();

        }else{
            // ..monta algo similar a uma sessão, apenas se dados de fato fora retornados
            let userData = await AsyncStorage.setItem('userData',JSON.stringify(answer));
            navigation.navigate('Restricted');
        }
    }

    return (
        <KeyboardAvoidingView style={[css.container, css.darkBkg]} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <View style={css.loginLogo}>
                <Image source={require('../assets/icon.png')} style={{ width: 120, height: 120 }} />
            </View>
            {answer == 'error' ?
            <View>
                <Text style={css.loginMsg}>Usuário ou senha incorreta!</Text>
            </View>
            :
            <View/>
            }
            <View style={css.loginForm}>
                <TextInput style={css.loginInp} placeholder='Usuário' onChangeText={text => setUser(text)}></TextInput>
                <TextInput style={css.loginInp} placeholder='Senha' onChangeText={text => setPassword(text)} secureTextEntry={true}></TextInput>
                <TouchableOpacity style={css.loginBtn} onPress={()=>sendForm()}>
                    <Text style={css.loginBtnTxt}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}