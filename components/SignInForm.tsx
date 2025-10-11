import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/supabase";

import Entypo from '@expo/vector-icons/Entypo';
import { Ionicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";

// Schema for sign in
const signInSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(30, "Password must be at most 30 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInForm() {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    });

    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const onSubmit = async (data: SignInFormData) => {
        setFormError(null);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (error) {
                setFormError(error.message);
                return;
            }

            console.log("Signed in successfully!");
        } catch (err) {
            setFormError("Something went wrong. Try again later.");
        }
    };

    return (
        <View className="w-4/5 gap-7">
            {formError && (
                <Text className="text-red-500 text-center mb-2 text-lg">{formError}</Text>
            )}

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <View className="flex-row items-center bg-white px-4 h-16 rounded-xl border border-gray-300">
                            <Entypo name="email" size={20} color="gray" />
                            <TextInput
                                placeholder="Email"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                className="flex-1 ml-3 text-md text-black"
                                placeholderTextColor="#9ca3af"
                            />
                        </View>

                        {errors.email && (
                            <Text className="text-red-500 mt-1 ml-1">{errors.email.message}</Text>
                        )}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <View className="flex-row items-center bg-white h-16 px-4 rounded-xl border border-gray-300 relative">
                            <AntDesign name="lock" size={22} color="gray" />
                            <TextInput
                                placeholder="Password"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                className="flex-1 ml-3 text-md text-black"
                                placeholderTextColor="#9ca3af"
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? "eye-off" : "eye"}
                                    size={22}
                                    color="#555"
                                />
                            </TouchableOpacity>
                        </View>

                        {errors.password && (
                            <Text className="text-red-500 mt-1 ml-1">{errors.password.message}</Text>
                        )}
                    </View>
                )}
            />

            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="bg-tealAccent py-3 rounded-lg items-center w-full self-center"
            >
                <Text className="text-white font-semibold">
                    {isSubmitting ? "Signing in..." : "Sign In"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="mt-4 self-center"
                onPress={() => router.push("/(auth)/ForgotPassword")}
            >
                <Text className="text-blue-500">Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    );
}
