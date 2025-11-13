import React, {useState} from "react";
import {View, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import GeneratedMeals from "./GeneratedMeals"
import SavedMeals from "./SavedMeals"

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import {useUser} from "@/lib/UserContext";

export default function Home() {
    const {user, loading} = useUser();
    const [Page, setPage] = useState("generatedMeals");

    const isFree = user?.tier === "free";
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}} className="flex-1 bg-white">
            <View className="flex-row justify-evenly items-center px-4 py-4">
                <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-lg">
                    <Text className="text-2xl font-semibold">Generated Meals</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={isFree}
                    className={`px-4 py-2 rounded-lg relative ${
                        isFree ? "bg-gray-200 opacity-60" : "bg-gray-100"
                    }`}
                    onPress={() => {
                        if (!isFree) {
                            console.log("Navigating to saved meals...");
                            // router.push("/(main)/savedMeals") for example
                        }
                    }}
                >
                    <Text
                        className={`text-2xl font-semibold ${
                            isFree ? "text-gray-400" : "text-black"
                        }`}
                    >
                        Saved Meals
                    </Text>
                    {isFree && (
                        <View
                            className="absolute -top-3 -right-3"
                            style={{ transform: [{ rotate: '20deg' }] }}
                        >
                            <FontAwesome6 name="crown" size={23} color="#ca8a04" />
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <View className="flex-1 px-10">
                {Page === "generatedMeals" && <GeneratedMeals />}
                {Page === "savedMeals" && <SavedMeals />}
            </View>
        </SafeAreaView>
    );
}