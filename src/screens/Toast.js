import { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export default function Toast({visivel, msg}) {
    const opacidade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visivel) {
            Animated.sequence([
                Animated.timing(opacidade, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.delay(1500),
                Animated.timing(opacidade, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visivel]);

    return (
        <Animated.View style={[styles.toast, {opacity: opacidade}]}>
            <Text style={styles.texto}>{msg}</Text>
        </Animated.View>
    );
}

    const styles = StyleSheet.create({
    toast: {
        position: "absolute",
        bottom: 90,
        alignSelf: "center",
        backgroundColor: colors.textDark,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 24,
    },
    texto: {
        color: colors.white,
        fontSize: 13,
        fontWeight: "600",
    },
    });
