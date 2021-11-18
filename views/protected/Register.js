import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import MenuRestricted from '../../assets/components/menuRestricted';
import { css } from '../../assets/css/Style';
import config from '../../config/config.json';

export default function Register({navigation}) {
    const address = config.origin;
    const [code, setCode] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [product, setProduct] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        randomCode();
    }, []);

    useEffect(() => {
        getUser();
    }, []);

    // ..gerar um código random
    async function randomCode() {
        let result = '';
        let length=20;
        let chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
        setCode(result);
    }

    // ..recupera o id do usuario
    async function getUser() {
        let response = await AsyncStorage.getItem('userData');
        let json = JSON.parse(response);
        setIdUser(json.id);
    }

    // ..envia o formulario
    async function sendForm() {
        let response = await fetch(`${config.urlRoot}/store`,{
            method:"POST",
            body:JSON.stringify({
                id:idUser,
                code:code,
                product:product,
                address:address,
            }),
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
        });
        // let json = await response.json();
        // setMsg(json);
    }

    return (
        <View style={[css.container, css.containerTop]}>
            <MenuRestricted title='Cadastro' navigation={navigation} />
            <View style={css.loginInp}>
                <TextInput placeholder='Nome do produto' onChangeText={text=>setProduct(text)}/>
            </View>
            <TouchableOpacity style={css.loginBtn} onPress={()=>sendForm()}>
                <Text>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}