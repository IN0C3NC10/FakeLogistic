import React from 'react';
import { View, Text } from 'react-native';
import MenuRestricted from '../../assets/components/menuRestricted';
import { css } from '../../assets/css/Style';


export default function Edit({navigation}) {
    

    return (
        <View style={[css.container, css.containerTop]}>
            <MenuRestricted title='Edição' navigation={navigation} />
        </View>
    );
}