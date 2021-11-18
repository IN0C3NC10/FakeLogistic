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
    const [idUser, setIdUser] = useState(null);
    const [oldPass, setOldPass] = useState(null);
    const [newPass, setNewPass] = useState(null);
    const [confNewPass, setConfNewPass] = useState(null);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        // ..recupera o id do usuario salvo no AsyncStorage
        async function getUserId(){
            let response = await AsyncStorage.getItem('userData');
            let json = JSON.parse(response);
            setIdUser(json.id);
        }
        getUserId();
    }, []);

    async function sendForm() {
        let response = await fetch(`${config.urlRoot}/verifyPass`,{
            method:"POST",
            body:JSON.stringify({
                id:idUser,
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
        setMsg(json);
    }


    return (
        <View style={[css.container, css.containerTop]}>
            <MenuRestricted title='Perfil' navigation={navigation} />

            <View>
                <Text>{msg}</Text>
                <TextInput placeholder='Senha Antiga:' onChangeText={text=>setOldPass(text)}/>
                <TextInput placeholder='Nova Senha:' onChangeText={text=>setNewPass(text)}/>
                <TextInput placeholder='Confirmação de Senha:' onChangeText={text=>setConfNewPass(text)}/>

                <TouchableOpacity onPress={()=>sendForm()}>
                    <Text>Alterar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}