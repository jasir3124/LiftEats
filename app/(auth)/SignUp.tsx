import {View, Text, Image, Dimensions, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";

import SignUpForm from "@/components/SignUpForm";
import {router} from "expo-router";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const {height} = Dimensions.get("window");

export default function SignUp() {
    return (
        <SafeAreaView className="flex-1 bg-greenSoft" edges={["left", "right"]}>
            {/* Top Image + Gradient */}
            <View style={styles.headerContainer}>
                <Image
                    source={require("../../assets/images/well-done-steak-homemade-potatoes.jpg")}
                    style={styles.image}
                    resizeMode="cover"
                />

                <View className="absolute w-full h-full bg-black/40"/>

                <LinearGradient
                    colors={["transparent", "#93c572"]}
                    locations={[0, 0.6, 1]}
                    style={{
                        position: "absolute",
                        bottom: -100,
                        left: 0,
                        right: 0,
                        height: 300,
                    }}
                />

                <MaterialIcons onPress={() => router.replace("/")} className={"mt-7 ms-3 "} name="keyboard-arrow-left" size={55} color="white" />

                <View style={styles.textContainer}>
                    <Text style={styles.title}>Register</Text>
                    <Text style={styles.subtitle}>Create your new account</Text>
                </View>
            </View>

            <View className="flex-1 px-6 pt-7 justify-around items-center">
                <SignUpForm/>

                <TouchableOpacity className={"mb-10"} onPress={() => router.push("/SignIn")}>
                    <Text className="text-white">
                        Already have an account? <Text className="text-yellowAccent">Sign In</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: height * 0.45,
        position: "relative",
        overflow: "hidden",
    },
    image: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    gradient: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    textContainer: {
        position: "absolute",
        bottom: "30%",
        left: "50%",
        transform: [{translateX: "-50%"}, {translateY: "-30%"}],
        zIndex: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 45,
        fontWeight: "600",
        color: "#fff",
    },
    subtitle: {
        fontSize: 18,
        color: "#fff",
        marginTop: 8,
    },
});
