import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import { useState, useEffect } from 'react';
import MenuRestricted from '../../assets/components/menuRestricted';
import { css } from '../../assets/css/Style';
import config from '../../config/config.json';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from "@expo/vector-icons";

export default function Register({ navigation }) {
    const address = config.origin;
    const [code, setCode] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [product, setProduct] = useState('');
    const [image, setImage] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');


    useEffect(() => {
        getUser();
    }, []);

    // ..toda vez que o response for alterado (dados cadastrados no db), será gerado um novo code
    useEffect(() => {
        randomCode();
        setProduct('');
    }, [response]);

    // ..gerar um código random
    async function randomCode() {
        let result = '';
        let length = 20;
        let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
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
        if (validate()) {
            resetFields();
            let response = await fetch(`${config.urlRoot}/store`, {
                method: "POST",
                body: JSON.stringify({
                    id: idUser,
                    code: code,
                    image: image,
                    product: product,
                    address: address,
                }),
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
            });
            let json = await response.json();
            setResponse(json);
            setMessage('Produto Cadastrado! Confira acima seu código de rastreio!')
        }
    }

    // ..compartilha o QRCode
    async function shareQR() {
        const imageQR = config.urlRoot + '/assets/img/code.png';
        FileSystem.downloadAsync(
            imageQR,
            FileSystem.documentDirectory + 'code.png'
        ).then(({ uri }) => {
            Sharing.shareAsync(uri);
        });
        await Sharing.shareAsync();
    }

    // ..são acionados apenas qdo os campos tiverem alterações
    useEffect(() => {
        setTimeout(() => {
            setMessage('');
        }, 10000);
    }, [message]);
    useEffect(() => {
        setTimeout(() => {
            setError('');
        }, 3000);
    }, [error]);

    // ..funções de usabilidade
    function resetFields() {
        setProduct('');
        setImage('');
    }

    function validate() {
        if (product == '') {
            setError('Nome do produto, vazio!');
            return false;
        } else {
            return true;
        }
    }

    return (
        <View style={[css.container, css.containerTop]}>
            <MenuRestricted title='CADASTRO DE PRODUTO' navigation={navigation} />
            {
                response && (
                    <View>
                        <Image source={{ uri: response, height: 180, width: 180 }} />
                        <TouchableOpacity style={[css.col4, css.btnSimple]} onPress={() => shareQR()}>
                            <FontAwesome name="share-alt" size={15} color="white" />
                        </TouchableOpacity>
                    </View>
                )
            }
            <View >
                <Text style={[css.error, css.tAC]}>{error}</Text>
                <Text style={[css.note, css.tAC]}>{message}</Text>
                <Text style={[css.label, css.mT20]}>Url da imagem</Text>
                <TextInput value={image} placeholder='Ex. www.google.com' onChangeText={text => setImage(text)} onFocus={response => setResponse(null)} style={[css.input,]} />
                <Text style={[css.label, css.mT20]}>Nome do produto*</Text>
                <TextInput value={product} placeholder='Ex. Goiabinha' onChangeText={text => setProduct(text)} onFocus={response => setResponse(null)} style={[css.input, css.mB30,]} />
            </View>
            <TouchableOpacity style={[css.col4, css.button]} onPress={() => sendForm()}>
                <FontAwesome name="floppy-o" size={20} color="white" />
            </TouchableOpacity>
        </View>
    );
}