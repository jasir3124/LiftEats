import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function MainLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#10b981",
                tabBarInactiveTintColor: "#6b7280",
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 1,
                    borderTopColor: "#e5e7eb",
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                },
            }}
        >
            {/* Left tab */}
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
                }}
            />

            {/* Middle “plus” button */}
            <Tabs.Screen
                name="generateMeal"
                options={{
                title: "",
                tabBarIcon: () => null,
                tabBarButton: (props) => (
                    <TouchableOpacity
                        {...props}
                        style={[
                            styles.middleButton,
                            { left: '50%', marginLeft: -50 } // center horizontally
                        ]}
                    >
                        <Ionicons name="add" size={50} color="white" />
                    </TouchableOpacity>
                ),
            }}
                />


                {/* Right tab */}
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    middleButton: {
        top: -60, // float above the tab bar
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#10b981", // green
        width: 100,
        height: 100,
        borderRadius: 50,
        elevation: 10, // shadow for Android
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 4,
    },
});
