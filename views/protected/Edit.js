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
        setProduct(json);
    };

    // ..envio do formulário
    async function sendForm() {
        setSearchCode(false);
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
        setSearchCode(false);
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
        })();
        getLocation();
    }

    // ..leitura manual
    async function readCode() {
        setSearchCode(true);
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
                        <Text>{response}</Text>
                        <View >
                            <TextInput style={[css.input, css.mH40, css.mT20]} value={product} placeholder='Ex. Goiabinha' onChangeText={text => setProduct(text)} />
                        </View>
                        <View >
                            <TextInput style={[css.input, css.mH40, css.mB30]} value={localization} placeholder='Ex. Carapicuíba/SP' onChangeText={text => setLocalization(text)} />
                        </View>
                        <TouchableOpacity style={css.button} onPress={() => sendForm()}>
                            <Text style={css.buttonTxt}>Salvar</Text>
                        </TouchableOpacity>
                        <View style={[css.fDR, css.jCC, css.mT20]}>
                            <TouchableOpacity style={[css.btnSimple, css.mR10]} onPress={() => readAgain()} >
                                <Text style={css.btnSimpleTxt}>Ler Novamente</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[css.btnSimple, css.mL10]} onPress={() => readCode()} >
                                <Text style={css.btnSimpleTxt}>Digitar Código</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            }

            {
                searchCode == true ?
                    <View style={[css.qrForm, css.jCC, css.mT20]}>
                        <View style={[css.mT20]}>
                            <TextInput value={code} placeholder='Ex. XxXxxxXXXxxxX' onChangeText={text => setCode(text)} style={[css.input, css.mB30, css.mH40]} />
                        </View>
                        <TouchableOpacity style={css.button} onPress={() => searchProduct(code)}>
                            <Text style={css.buttonTxt}>Buscar</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View />
            }

        </View>
    );
}