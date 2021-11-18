import { StyleSheet } from "react-native";
import Login from "../../views/Login";
let shadow = "#333";
let light = "#fff";
let main = "#004aad";
const css = StyleSheet.create({
    darkBkg: {
        backgroundColor: shadow,
    },
    container: {
        flex: 1,
        backgroundColor: light,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerTop: {
        justifyContent: 'flex-start',
    },
    home: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: light,
        alignItems: 'center',
        justifyContent: 'center',
    },

    btnHome: {
        fontSize: 100,
        color: main,
        marginRight: 20,
    },
    // login
    loginLogo: {
        marginBottom: 10,
    },
    loginForm: {
        width: '80%',
    },
    loginMsg: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'red',
        marginVertical: 10,
    },
    loginInp: {
        backgroundColor: light,
        fontSize: 19,
        padding: 7,
        marginBottom: 15,
    },
    loginBtn: {
        padding: 12,
        backgroundColor: main,
        alignSelf: "center",
        borderRadius: 5,
    },
    loginBtnTxt: {
        fontWeight: 'bold',
        fontSize: 22,
        color: light,
    },
    areaTab: {
        backgroundColor: shadow,
        fontSize: 20,
        fontWeight: "bold",
        color: shadow,
    },
    // ..profile
    btnHome2: {
        textAlign: "left",
    },
    btnLogout: {
        textAlign: "right",
    },
    areaMenu: {
        flexDirection: "row",
        paddingTop: 40,
        paddingBottom: 10,
        width: "100%",
        backgroundColor: "#111",
        alignItems: "center",
        justifyContent: "center",
    },
    areaTitle: {
        width: "100%",
        fontWeight: "bold",
        fontSize: 20,
        color: light,
        textAlign: "center"
    },
});

export { css };