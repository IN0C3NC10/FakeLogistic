import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { css } from '../../assets/css/Style';
import { FontAwesome } from "@expo/vector-icons"
import MenuRestricted from '../../assets/components/menuRestricted';
import config from '../../config/config.json';

export default function Profile({ navigation }) {
    const [idUser, setIdUser] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confNewPass, setConfNewPass] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // ..recupera o id do usuario salvo no AsyncStorage
        async function getUserId() {
            let response = await AsyncStorage.getItem('userData');
            let json = JSON.parse(response);
            setIdUser(json.id);
        }
        getUserId();
    }, []);

    // ..são acionados apenas qdo os campos tiverem alterações
    useEffect(() => {
        setTimeout(() => {
            setResponse('');
        }, 3000);
    }, [response]);
    useEffect(() => {
        setTimeout(() => {
            setError('');
        }, 3000);
    }, [error]);

    // ..função para o envio do formulário
    async function sendForm() {
        if (validate()) {
            resetFields();
            let response = await fetch(`${config.urlRoot}/verifyPass`, {
                method: "POST",
                body: JSON.stringify({
                    id: idUser,
                    oldPass: oldPass,
                    newPass: newPass,
                    confNewPass: confNewPass,
                }),
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
            });
            let json = await response.json();
            if (json != 'invalid') {
                setResponse(json);
            } else {
                setError('Senha Inválida');
            }
        }
    }

    // ..funções de usabilidade
    function resetFields() {
        setOldPass('');
        setNewPass('');
        setConfNewPass('');
    }

    function validate() {
        if (oldPass == '') {
            setError('Senha anterior, vazia!');
            return false;
        } else if (newPass == '') {
            setError('Nova senha, vazia!');
            return false;
        } else if (confNewPass == '') {
            setError('Confirmação de senha, vazia!');
            return false;
        } else {
            return true;
        }
    }


    return (
        <View style={[css.container, css.containerTop]}>
            <MenuRestricted title='REDEFINIR SENHA' navigation={navigation} />

            <View>
                <Text style={[css.error, css.tAC]}>{error}</Text>
                <Text style={[css.note, css.tAC]}>{response}</Text>
                <TextInput style={[css.input, css.mH40, css.mT20]} placeholder='Senha Antiga:' onChangeText={text => setOldPass(text)} secureTextEntry={true} />
                <TextInput style={[css.input, css.mH40]} placeholder='Nova Senha:' onChangeText={text => setNewPass(text)} secureTextEntry={true} />
                <TextInput style={[css.input, css.mH40, css.mB30]} placeholder='Confirmação de Senha:' onChangeText={text => setConfNewPass(text)} secureTextEntry={true} />

                <TouchableOpacity onPress={() => sendForm()} style={[css.col4, css.button]}>
                    <FontAwesome name="floppy-o" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}