import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {supabase} from "@/lib/supabase";

export default function Profile() {

    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            // The layout.tsx listener will handle redirect automatically.
        } catch (err: any) {
            console.error("Logout error:", err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            <Text>Profile</Text>

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
    )
}
