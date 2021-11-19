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
            <TextInput onChangeText={text => setCode(text)} placeholder='Ex. XxXxxxXXXxxxX' style={[css.input, css.mB30, css.mT20]} />
            <TouchableOpacity style={css.button} onPress={() => sendForm()}>
                <Text style={css.buttonTxt}>Rastrear</Text>
            </TouchableOpacity>

            <View style={[css.areaTrack]}>
                <Text style={[css.textTrack]}>{response}</Text>
            </View>
        </View>
    );
}