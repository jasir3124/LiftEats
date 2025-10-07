import {View, Text, Image, Dimensions, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import {router} from "expo-router";
import SignInForm from "@/components/SignInForm";

const { height } = Dimensions.get("window");

export default function SingIn() {
    return (
        <SafeAreaView className="flex-1 bg-limeSoft" edges={["left", "right"]}>
            {/* Top Image + Gradient */}
            <View style={styles.headerContainer}>
                <Image
                    source={require("../../assets/images/well-done-steak-homemade-potatoes.jpg")}
                    style={styles.image}
                    resizeMode="cover"
                />

                <View className="absolute w-full h-full bg-black/40" />

                <LinearGradient
                    colors={["transparent", "#bce08a"]}
                    locations={[0, 0.6, 1]}
                    style={{
                        position: "absolute",
                        bottom: -100,
                        left: 0,
                        right: 0,
                        height: 300,
                    }}
                />


                <View style={styles.textContainer}>
                    <Text style={styles.title}>Welcome Back</Text>
                </View>
            </View>

            <View className="flex-1 px-6 pt-7 justify-around items-center">
                <SignInForm />

                <TouchableOpacity className={"mb-10"} onPress={() => router.push("/SignUp")}>
                    <Text className="text-white">
                        Dont have an account? <Text className="text-tealAccent">Sign Up</Text>
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
        bottom: "40%",
        left: "50%",
        transform: [{ translateX: "-50%" }, { translateY: "-40%" }],
        zIndex: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 45,
        fontWeight: "600",
        color: "#fff",
    }
});
