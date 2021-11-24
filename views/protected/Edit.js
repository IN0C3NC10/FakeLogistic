import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import MenuRestricted from '../../assets/components/menuRestricted';
import { useState, useEffect } from 'react';
import { css } from '../../assets/css/Style';
import { BarCodeScanner } from 'expo-barcode-scanner';
import config from '../../config/config.json';
import * as Location from 'expo-location';
import { FontAwesome } from "@expo/vector-icons";


export default function Edit({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [product, setProduct] = useState('');
    const [localization, setLocalization] = useState('');
    const [code, setCode] = useState('');
    const [searchCode, setSearchCode] = useState(false);
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');

    // ..pede a permissão para usar a câmera do usuário
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
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

    // ..leitura do código QR
    async function handleBarCodeScanned({ type, data }) {
        setScanned(true);
        setCode(data);
        await searchProduct(data);
    };

    // ..pede a permissão para pegar o local do usuário
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permissão para acessar a localização negada!');
                return;
            }
        })();
        getLocation();
    }, []);

    // ..função que retorna as coordenadas do usuário
    async function getLocation() {
        let location = await Location.getCurrentPositionAsync({});
        setLocalization(`${location.coords.latitude}, ${location.coords.longitude}`);
    }

    // ..pesquisa o produto
    async function searchProduct(proId) {
        if (code != '') {
            setSearchCode(false);
            let response = await fetch(`${config.urlRoot}/show`, {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: proId,
                }),
            });
            let json = await response.json();
            if (json != '{}' && json != '[]' && json != 'error') {
                setProduct(json[0].Products[0].name);
                if (localization == null || localization == '') {
                    setLocalization(json[0].local);
                }
            } else {
                setError('Código especificado NÃO encontrado!');
            }
        } else {
            setError('Código vazio! Escaneie o QRCode ou Pesquise-o!');
        }
    };

    // ..envio do formulário
    async function sendForm() {
        if (validate()) {
            resetFields();
            let response = await fetch(`${config.urlRoot}/update`, {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: code,
                    product: product,
                    local: localization,
                }),
            });
            let json = await response.json();
            setResponse(json);
        }
    }

    // ..deleta o produto e seu rastreio (entregue)
    async function delivered() {
        if (validate()) {
            resetFields();
            let response = await fetch(`${config.urlRoot}/delete`, {
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
    }

    // ..nova leitura do QRCode
    async function readAgain() {
        resetFields();
        setError('');
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permissão de acesso negado!');
                return;
            }
        })();
        getLocation();
    }

    // ..leitura manual
    async function readCode() {
        if (searchCode == true) {
            setSearchCode(false);
        } else {
            setSearchCode(true);
        }
    }

    // ..funções de usabilidade
    function resetFields() {
        setCode('');
        setProduct('');
        setLocalization('');
        setSearchCode(false);
    }

    function validate() {
        if (code == '') {
            setError('Código vazio! Escaneie o QRCode ou Pesquise-o!');
            return false;
        } else if (product == '') {
            setError('Produto vazio! Escaneie o QRCode ou Pesquise-o!');
            return false;
        } else if (localization == '') {
            setError('Local vazio! Pegue o seu local ou mantenha o anterior!');
            return false;
        } else {
            return true;
        }
    }

    return (
        <View style={[css.container, css.containerTop]}>
            <MenuRestricted title='Atualização' navigation={navigation} />
            {
                scanned == true ?
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : value => handleBarCodeScanned(value)}
                        style={css.qrCode}
                    />
                    :
                    <View style={css.qrForm}>
                        <Text style={[css.error, css.tAC]}>{error}</Text>
                        <Text style={[css.note, css.tAC]}>{response}</Text>
                        <View >
                            <TextInput style={[css.input, css.mH40, css.mT20]} value={product} placeholder='Ex. Goiabinha' onChangeText={text => setProduct(text)} />
                        </View>
                        <View >
                            <TextInput style={[css.input, css.mH40, css.mB30]} value={localization} placeholder='Ex. Carapicuíba/SP' onChangeText={text => setLocalization(text)} />
                        </View>
                        <View style={[css.fDR, css.jCC, css.mT20, css.mB15]}>
                            <TouchableOpacity style={[css.col4, css.btnSquare]} onPress={() => sendForm()}>
                                <FontAwesome name="floppy-o" size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[css.col4, css.btnSquare]} onPress={() => readCode()} >
                                <FontAwesome name="code" size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[css.col4, css.btnSquare,]} onPress={() => delivered()} >
                                <FontAwesome name="map-marker" size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[css.col4, css.btnSquare,]} onPress={() => readAgain()} >
                                <FontAwesome name="refresh" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
            }

            {
                searchCode == true ?
                    <View style={[css.qrForm, css.jCC, css.mT20]}>
                        <View style={[css.mT20]}>
                            <TextInput value={code} placeholder='Seu código aqui...' onChangeText={text => setCode(text)} style={[css.input, css.mB30, css.mH40]} />
                        </View>
                        <TouchableOpacity style={[css.col4, css.button]} onPress={() => searchProduct(code)}>
                            <FontAwesome name="search" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    :
                    <View />
            }

        </View>
    );
}