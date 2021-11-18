import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import MenuRestricted from '../../assets/components/menuRestricted';
import { useState, useEffect } from 'react';
import { css } from '../../assets/css/Style';
import { BarCodeScanner } from 'expo-barcode-scanner';
import config from '../../config/config.json';
import * as Location from 'expo-location';


export default function Edit({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [product, setProduct] = useState(null);
    const [localization, setLocalization] = useState(null);
    const [code, setCode] = useState(null);
    const [searchCode, setSearchCode] = useState(false);
    const [response, setResponse] = useState(null);

    // ..pede a permissão para usar a câmera do usuário
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

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
                setErrorMsg('Permission to access location was denied');
                return;
            }
        })();
        getLocation();
    }, []);

    // ..pesquisa o produto
    async function searchProduct(proId) {
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
        setProduct(json);
    };

    // ..envio do formulário
    async function sendForm() {
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

    // ..função que retorna as coordenadas do usuário
    async function getLocation() {
        let location = await Location.getCurrentPositionAsync({});
        setLocalization(`${location.coords.latitude}, ${location.coords.longitude}`);
    }

    // ..nova leitura do QRCode
    async function readAgain() {
        // setScanned(false);
        setCode('');
        setProduct('');
        setLocalization('');
    }

    // ..leitura manual
    async function readCode() {
        setSearchCode(true);
    }

    return (
        <View style={[css.container, css.containerTop]}>
            <MenuRestricted title='Edição' navigation={navigation} />
            {
                scanned == true ?
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : value => handleBarCodeScanned(value)}
                        style={css.qrCode}
                    />
                    :
                    <View style={css.qrForm}>
                        <Text>{response}</Text>
                        <View style={css.loginInp}>
                            <TextInput value={product} placeholder='Nome do produto' onChangeText={text => setProduct(text)} />
                        </View>
                        <View style={css.loginInp}>
                            <TextInput value={localization} placeholder='Localização do produto' onChangeText={text => setLocalization(text)} />
                        </View>
                        <TouchableOpacity style={css.loginBtn} onPress={() => sendForm()}>
                            <Text>Cadastrar</Text>
                        </TouchableOpacity>
                        <View>
                            <Button title='Escanear Novamente' onPress={() => readAgain()} />
                        </View>
                        <View>
                            <Button title='Escanear Manualmente' onPress={() => readCode()} />
                        </View>
                    </View>
            }

            {
                searchCode == true ?
                    <View style={css.qrForm}>
                        <Text>Pesquise pelo código</Text>
                        <View style={css.loginInp}>
                            <TextInput value={code} placeholder='Código do produto' onChangeText={text => setCode(text)} />
                        </View>
                        <TouchableOpacity style={css.loginBtn} onPress={() => searchProduct(code)}>
                            <Text>Buscar</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View />
            }

        </View>
    );
}