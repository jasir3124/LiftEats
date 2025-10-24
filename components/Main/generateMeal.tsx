import {View, Text, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";

export default function GenerateMeal({ onClose }) {
    return (
        <View style={{ flex: 1 }}>
            {/* Handle bar */}
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                <View style={{
                    width: 40,
                    height: 5,
                    backgroundColor: '#e5e7eb',
                    borderRadius: 3
                }} />
            </View>

            {/* Close button */}
            <TouchableOpacity
                onPress={onClose}
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    padding: 10,
                    zIndex: 1
                }}
            >
                <Ionicons name="close" size={28} color="#6b7280" />
            </TouchableOpacity>

            {/* Content */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginBottom: 20,
                    marginTop: 10
                }}>
                    Generate Meal
                </Text>

                <Text style={{ fontSize: 16, color: '#6b7280' }}>
                    Your meal generation content goes here...
                </Text>

                {/* Add your meal generation form/content here */}
            </ScrollView>
        </View>
    )
}