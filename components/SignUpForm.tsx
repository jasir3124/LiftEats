import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/supabase";

import Entypo from '@expo/vector-icons/Entypo';
import { Ionicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import {router} from "expo-router";

const signUpSchema = z
    .object({
        email: z.string().email("Invalid email"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(30, "Password must be at most 30 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const onSubmit = async (data: SignUpFormData) => {
        setFormError(null);
        try {
            const { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
            });

            if (error) {
                setFormError(error.message);
                return;
            }

            console.log("Signed up successfully!");
            router.push("/(auth)/ConfirmEmail");
        } catch (err) {
            setFormError("Something went wrong. Try again later.");
        }
    };

    return (
        <View className="w-4/5 gap-7">
            {formError && (
                <Text className="text-red-500 text-center mb-2 text-lg">{formError}</Text>
            )}

            {/* Email Field */}
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <View className="">
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
                                placeholderTextColor="#9ca3af" // optional light gray placeholder
                            />
                        </View>

                        {errors.email && (
                            <Text className="text-red-500 mt-1 ml-1">{errors.email.message}</Text>
                        )}
                    </View>

                )}
            />

            {/* Password Field */}
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <View className="">
                        <View className="flex-row items-center bg-white h-16 px-4 rounded-xl border border-gray-300 relative">
                            {/* Lock Icon */}
                            <AntDesign name="lock" size={22} color="gray" />

                            {/* Input Field */}
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

                            {/* Eye / Eye-off toggle */}
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? "eye-off" : "eye"}
                                    size={22}
                                    color="#555"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Validation error */}
                        {errors.password && (
                            <Text className="text-red-500 mt-1 ml-1">{errors.password.message}</Text>
                        )}
                    </View>

                )}
            />

            {/* Confirm Password Field */}
            <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                    <View className="">
                        <View className="flex-row items-center bg-white h-16 px-4 rounded-xl border border-gray-300 relative">
                            {/* Lock Icon */}
                            <AntDesign name="lock" size={22} color="gray" />

                            {/* Password Input */}
                            <TextInput
                                placeholder="Confirm Password"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                secureTextEntry={!showConfirmPassword}
                                autoCapitalize="none"
                                className="flex-1 ml-3 text-md text-black"
                                placeholderTextColor="#9ca3af"
                            />

                            {/* Eye Icon */}
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Ionicons
                                    name={showConfirmPassword ? "eye-off" : "eye"}
                                    size={22}
                                    color="#555"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Error Message */}
                        {errors.confirmPassword && (
                            <Text className="text-red-500 mt-1 ml-1">{errors.confirmPassword.message}</Text>
                        )}
                    </View>

                )}
            />

            {/* Submit Button */}
            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="bg-tealAccent py-3 rounded-lg items-center w-1/3 self-center"
            >
                <Text className="text-white font-semibold">
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
