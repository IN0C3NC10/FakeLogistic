import React from 'react';
import { View, Text, TextInput } from 'react-native';
import MenuRestricted from '../../assets/components/menuRestricted';
import { useState, useEffect } from 'react';
import { css } from '../../assets/css/Style';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default function Edit({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [localization, setLocalization] = useState(null);
    const [code, setCode] = useState(null);

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
    };

    // ..envio do formulário
    async function sendForm() {
        // let response = await fetch(`${config.urlRoot}/store`,{
        //     method:"POST",
        //     body:JSON.stringify({
        //         id:idUser,
        //         code:code,
        //         product:product,
        //         address:address,
        //     }),
        //     headers: {
        //         Accept: 'application/json',
        //         "Content-Type": "application/json"
        //     },
        // });
        // let json = await response.json();
        // setResponse(json);
    }

    return (
        <View style={[css.container, css.containerTop]}>
            <MenuRestricted title='Edição' navigation={navigation} />
            {
                scanned == false ?
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : value => handleBarCodeScanned(value)}
                        style={css.qrCode}
                    />
                    :
                    <View style={css.qrForm}>
                        <Text>Código do produto: {code}</Text>
                        <View style={css.loginInp}>
                            <TextInput value={product} placeholder='Nome do produto' onChangeText={text => setProduct(text)} />
                        </View>
                        <View style={css.loginInp}>
                            <TextInput value={localization} placeholder='Localização do produto' onChangeText={text => setLocalization(text)} />
                        </View>
                        <TouchableOpacity style={css.loginBtn} onPress={() => sendForm()}>
                            <Text>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
            }
        </View>
    );
}