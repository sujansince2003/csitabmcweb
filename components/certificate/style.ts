import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
    family: "Cardo",
    src: "/Cardo-Bold.ttf",

});

Font.register({
    family: "Montserrat",
    src: "/Montserrat.ttf",
    fallback: "sans-serif",
});
Font.register({
    family: "GreatVibes",
    src: "/GreatVibes.ttf",
    fallback: "sans-serif",
});

export const styles = StyleSheet.create({
    page: {
        //   width: "820px",
        //   height: "480px",
        //   flexDirection: "column",
        //   position: "relative",
        padding: "50px",
        backgroundColor: "pink",
    },
    pageBackground: {
        position: "absolute",
        minWidth: "100%",
        minHeight: "100%",
        // display: 'block',
        objectPosition: "fixed",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        objectFit: "contain",
    },
    head: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingVertical: "20px",
    },
    batchA: {
        height: " 80px",
        width: "80px",
        objectFit: "contain",
        flex: 1,
        display: "flex",
        alignItems: "flex-end",
    },
    copContainer: {
        height: " 100px",
        textAlign: "center",
        fontFamily: "Cardo",
        flex: 3,
    },
    cop: {
        fontSize: "27px",
        fontWeight: "bold",
        paddingVertical: "10px",
        letterSpacing: "6px",
    },
    awardedTo: {
        fontSize: "20px",
        paddingTop: "35px",
        fontFamily: "Montserrat",
    },
    batch: {
        height: " 100px",
        flex: 1,
    },
    body: {
        paddingTop: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    name: {
        fontSize: "3rem",
        // textOverflow: "ellipsis",
        overflow: "hidden",
        textAlign: "center",
        fontFamily: "GreatVibes",
        color: "red",
    },
    para: {
        paddingTop: "30px",
        fontSize: "14px",
        textAlign: "center",
        fontFamily: "Montserrat",
    },
    signs: {
        position: "absolute",
        bottom: "-170px",
        left: "0px",
        width: "100%",
        display: "flex",
        paddingHorizontal: "50px",
        flexDirection: "row",
    },
    qr: {
        width: "100%",
        height: "100px",
        margin: "10px",
        display: "flex",
        alignItems: "flex-start",
    },
    signContainer: {
        width: "100%",
        height: "120px",
        margin: "10px",
    },
    sign: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "70px",
    },
    signName: {
        fontSize: "20px",
        fontFamily: "Montserrat",
        textAlign: "center",
        paddingVertical: "5px",
        borderTop: "1px solid black",
        color: "red",
        width: "100%",
    },
    postName: {
        fontSize: "15px",
        fontFamily: "Montserrat",
        width: "100%",
        textAlign: "center",
        marginTop: "5px",
    },
});