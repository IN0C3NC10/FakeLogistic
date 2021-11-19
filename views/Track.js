import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { css } from '../assets/css/Style'
import config from '../config/config.json';

export default function Track() {
    const [code, setCode] = useState(null);
    const [response, setResponse] = useState(null);
    
    // ..envia os dados para o back-end
    async function sendForm() {
        let response = await fetch(`${config.urlRoot}/show-track`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: code,
            }),
        });
        let json = await response.json();
        setResponse(json);
    }

    return (
        <View style={css.container}>
            <Image source={require('../assets/img/rastreio.png')} style={{ width: 320, height: 120 }} />
            <TextInput onChangeText={text => setCode(text)} placeholder='Código do rastreio' style={[css.loginInp, css.trackInp]} />
            <TouchableOpacity style={css.loginBtn} onPress={()=>sendForm()}>
                <Text style={css.loginBtnTxt}>Rastrear</Text>
            </TouchableOpacity>

            <Text>{response}</Text>
        </View>
    );
}