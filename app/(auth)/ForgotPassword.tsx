import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
} from "react-native";
import { supabase } from "../../lib/supabase";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleResetPassword = async () => {
        if (!email.trim()) {
            setMessage("Please enter your email address.");
            return;
        }

        setLoading(true);
        setMessage(null);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "lifteats://reset",
        });

        if (error) {
            setMessage(error.message);
        } else {
            setModalVisible(true);
        }

        setLoading(false);
    };

    const handleResend = async () => {
        await handleResetPassword();
    };

    return (
        <View className="flex-1 bg-white px-6">
            <MaterialIcons
                onPress={() => router.replace("/(auth)/SignIn")}
                className="mt-10"
                name="keyboard-arrow-left"
                size={55}
                color="black"
            />

            <View className="flex-1 items-center justify-center">
                <Text className="text-3xl font-bold text-greenSoft mb-4">
                    Forgot Password
                </Text>
                <Text className="text-gray-600 text-center mb-8">
                    Enter your email and we'll send you a password reset link.
                </Text>

                <TextInput
                    placeholder="Email address"
                    placeholderTextColor="#9ca3af"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base text-black mb-4"
                />

                <TouchableOpacity
                    disabled={loading}
                    onPress={handleResetPassword}
                    className={`w-full py-3 rounded-xl ${
                        loading ? "bg-gray-400" : "bg-greenSoft"
                    } items-center`}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white font-semibold text-lg">
                            Send Reset Link
                        </Text>
                    )}
                </TouchableOpacity>

                {message && (
                    <Text className="text-center mt-4 text-red-500">{message}</Text>
                )}
            </View>

            {/* ✅ Success Modal */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white w-4/5 rounded-2xl p-6 items-center">
                        <Text className="text-2xl font-bold text-greenSoft mb-2">
                            Email Sent!
                        </Text>
                        <Text className="text-gray-600 text-center mb-6">
                            Check your inbox for the password reset link.
                        </Text>

                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            className="bg-greenSoft w-full py-3 rounded-xl mb-3"
                        >
                            <Text className="text-white font-semibold text-lg text-center">
                                OK
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleResend}
                            className="border border-greenSoft w-full py-3 rounded-xl"
                        >
                            <Text className="text-greenSoft font-semibold text-lg text-center">
                                Resend Email
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
