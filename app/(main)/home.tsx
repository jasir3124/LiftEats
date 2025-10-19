import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { supabase } from "@/lib/supabase";

export default function Home() {
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            // The layout.tsx listener will handle redirect automatically.
        } catch (err) {
            console.error("Logout error:", err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <Text className="text-2xl font-semibold mb-6">Home</Text>

            <TouchableOpacity
                onPress={handleLogout}
                disabled={loading}
                className="bg-red-500 px-6 py-3 rounded-lg"
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white font-semibold text-lg">Logout</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}
