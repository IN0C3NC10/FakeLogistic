import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { css } from '../assets/css/Style'
import config from '../config/config.json';
import { FontAwesome } from "@expo/vector-icons"

export default function Track() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState(null);
    const [product, setProduct] = useState(null);
    const [location, setLocation] = useState(null);

    // ..envia os dados para o back-end
    async function sendForm() {
        if (validate()) {
            resetFields();
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
            if (json != 'error' && json != 'invalid') {
                setImage(json[0].Products[0].image);
                setProduct(json[0].Products[0].name);
                setLocation(json[0].local);
            } else {
                setError('Código pesquisado inválido!')
            }
        }
    }

    // ..são acionados apenas qdo os campos tiverem alterações
    useEffect(() => {
        setTimeout(() => {
            setError('');
        }, 10000);
    }, [error]);


    // ..funções de usabilidade
    function resetFields() {
        setCode('');
        setImage('');
        setProduct('');
        setLocation('');
    }

    function validate() {
        if (code == '') {
            setError('Código vazio! Preencha com ele abaixo!');
            return false;
        } else {
            return true;
        }
    }

    return (
        <View style={css.container}>
            {
                product ? (
                    <View style={[css.areaTrack]}>
                        <View style={[css.container]}>
                            {
                                image && (
                                    <Image style={[css.img, css.col6]} source={{ uri: image, }} style={{ width: 250, height: 150 }} />
                                )
                            }
                            <Text style={[css.textTrack]}>
                                Sua encomenda <Text style={[css.bold, css.mainColor]}>{product}</Text>, se encontra no seguinte local/coordenadas <Text style={[css.bold, css.mainColor]}>{location}</Text>!
                            </Text>
                            <TouchableOpacity style={[css.col4, css.btnSquare, css.mT20]} onPress={() => resetFields()} >
                                <FontAwesome name="arrow-left" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View>
                        <Image source={require('../assets/img/rastreio.png')} style={{ width: 320, height: 120 }} />
                        <Text style={[css.error, css.tAC]}>{error}</Text>
                        <TextInput value={code} onChangeText={text => setCode(text)} placeholder='Seu código aqui...' style={[css.input, css.mB30, css.mT20]} />
                        <TouchableOpacity style={[css.col4, css.button]} onPress={() => sendForm()}>
                            <FontAwesome name="search" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                )
            }

        </View>
    );
}