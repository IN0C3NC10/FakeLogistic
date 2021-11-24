import { StyleSheet } from "react-native";

let shadow = "#333";
let light = "#fff";
let main = "#004aad";
const css = StyleSheet.create({
    darkBkg: {
        backgroundColor: "black",
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

    menuHome: {
        fontSize: 20,
        color: shadow,
    },

    input: {
        backgroundColor: light,
        fontSize: 19,
        padding: 7,
        borderColor: '#ccc',
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        textAlign: "center",
    },

    button: {
        padding: 12,
        backgroundColor: main,
        alignSelf: "center",
        textAlign: "center",
        borderRadius: 5,
        textTransform: "uppercase",
    },
    buttonTxt: {
        fontWeight: 'bold',
        fontSize: 22,
        color: light,
    },

    btnSimple: {
        padding: 6,
        backgroundColor: main,
        alignSelf: "center",
        borderRadius: 5,
        textAlign: "center",
        textTransform: "uppercase",
    }, btnSimpleTxt: {
        fontWeight: 'bold',
        fontSize: 12,
        color: light,
    },

    btnSquare: {
        padding: 12,
        backgroundColor: main,
        alignSelf: "center",
        textAlign: "center",
        textTransform: "uppercase",
        borderWidth: 1,
        borderColor: light,
    },

    error: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'red',
        marginVertical: 10,
    },

    note: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#a6a6a6',
        marginVertical: 10,
    },

    areaTrack: {
        padding: 40,
        justifyContent: "center",
    },
    textTrack: {
        textAlign: "center",
        fontSize: 15,
        marginHorizontal: 10,
        marginTop: 20,
    },

    // ..helpers
    col12: {
        width: "100%"
    },
    col6: {
        width: "50%",
    },
    col4: {
        width: "25%",
    },
    bold: {
        fontWeight: "bold",
    },
    mainColor: {
        color: main,
    },
    mB15: {
        marginBottom: 15,
    },
    mB30: {
        marginBottom: 30,
    },
    mT20: {
        marginTop: 20,
    },
    mL10: {
        marginLeft: 10,
    },
    mR10: {
        marginRight: 10,
    },
    mH20: {
        marginHorizontal: 20,
    },
    mH40: {
        marginHorizontal: 40,
    },
    fDR: {
        flexDirection: "row",
    },
    jCC: {
        justifyContent: "center",
    },
    tAC: {
        textAlign: "center",
    },
    // ..helpers

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

    areaTab: {
        backgroundColor: shadow,
        fontSize: 20,
        fontWeight: "bold",
        color: shadow,
    },
    // ..profile
    btnHome2: {
        textAlign: "left",
        marginLeft: 15,
    },
    btnLogout: {
        textAlign: "right",
        marginRight: 15,
    },
    areaMenu: {
        flexDirection: "row",
        paddingTop: 40,
        paddingBottom: 10,
        width: "100%",
        backgroundColor: "#004aad",
        alignItems: "center",
        justifyContent: "center",
    },
    areaTitle: {
        width: "100%",
        fontWeight: "bold",
        fontSize: 20,
        color: light,
        textAlign: "center",
    },
    // ..edit
    qrCode: {
        width: '100%',
        height: '100%',
        backgroundColor: shadow,
        justifyContent: 'center',
    },
    qrForm: {
        width: '100%',
    },
});

export { css };