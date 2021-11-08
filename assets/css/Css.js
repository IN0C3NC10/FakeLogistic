import { StyleSheet } from "react-native";
let main = "#004aad";
const css = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    home: {
        flex:1,
        flexDirection:'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    btnHome:{
        fontSize:100,
        color: main,
        marginRight:20,
    }
});

export { css };