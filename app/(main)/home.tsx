import React, {useState} from "react";
import {View, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import {supabase} from "@/lib/supabase";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Home() {

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}} className="flex-1 bg-white">
            <View className="flex-row justify-evenly items-center px-4 py-4">
                <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-lg">
                    <Text className="text-2xl font-semibold">Generated Meals</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-lg">
                    <Text className="text-2xl font-semibold">Saved Meals</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}