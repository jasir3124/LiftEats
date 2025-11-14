// import { View, Text, TouchableOpacity, ScrollView, TextInput, Switch } from 'react-native';
// import { Ionicons } from "@expo/vector-icons";
// import { useState } from 'react';
//
// export default function GenerateMeal({ onClose }) {
//     const [mealDescription, setMealDescription] = useState('');
//     const [includeCustomMacros, setIncludeCustomMacros] = useState(false);
//     const [macros, setMacros] = useState({
//         protein: '',
//         carbs: '',
//         fats: '',
//         calories: ''
//     });
//     const [quickSugest, setQuickSugest] = useState([])
//     const [isGenerating, setIsGenerating] = useState(false);
//
//     const handleGenerate = async () => {
//         if (!mealDescription.trim()) return;
//
//         setIsGenerating(true);
//         // Your generation logic here
//         setTimeout(() => {
//             setIsGenerating(false);
//             // Handle generated meal
//         }, 2000);
//     };
//
//     const isFormValid = mealDescription.trim().length > 0;
//
//     return (
//         <View style={{ flex: 1 }}>
//             {/* Handle bar */}
//             <View style={{ alignItems: 'center', marginBottom: 10 }}>
//                 <View style={{
//                     width: 40,
//                     height: 5,
//                     backgroundColor: '#e5e7eb',
//                     borderRadius: 3
//                 }} />
//             </View>
//
//             {/* Close button */}
//             <TouchableOpacity
//                 onPress={onClose}
//                 style={{
//                     position: 'absolute',
//                     right: 0,
//                     top: 0,
//                     padding: 10,
//                     zIndex: 1
//                 }}
//             >
//                 <Ionicons name="close" size={28} color="#6b7280" />
//             </TouchableOpacity>
//
//             {/* Content */}
//             <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
//                 <View style={{ paddingBottom: 20 }}>
//                     <Text style={{
//                         fontSize: 24,
//                         fontWeight: 'bold',
//                         marginBottom: 8,
//                         marginTop: 10
//                     }}>
//                         Generate Meal
//                     </Text>
//
//                     <Text style={{
//                         fontSize: 14,
//                         color: '#6b7280',
//                         marginBottom: 24
//                     }}>
//                         Describe what you'd like to eat and we'll create a meal plan for you
//                     </Text>
//
//                     {/* Meal Description */}
//                     <View style={{ marginBottom: 24 }}>
//                         <Text style={{
//                             fontSize: 16,
//                             fontWeight: '600',
//                             marginBottom: 8,
//                             color: '#1f2937'
//                         }}>
//                             What would you like to eat?
//                         </Text>
//                         <TextInput
//                             value={mealDescription}
//                             onChangeText={setMealDescription}
//                             placeholder="e.g., Grilled chicken with rice and vegetables"
//                             multiline
//                             numberOfLines={4}
//                             textAlignVertical="top"
//                             style={{
//                                 borderWidth: 1,
//                                 borderColor: '#d1d5db',
//                                 borderRadius: 12,
//                                 padding: 12,
//                                 fontSize: 15,
//                                 color: '#1f2937',
//                                 backgroundColor: '#f9fafb',
//                                 minHeight: 100
//                             }}
//                         />
//                         <Text style={{
//                             fontSize: 12,
//                             color: '#9ca3af',
//                             marginTop: 6
//                         }}>
//                             Be as specific or general as you'd like
//                         </Text>
//                     </View>
//
//                     {/* Custom Macros Toggle */}
//                     <View style={{
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         marginBottom: 16,
//                         padding: 16,
//                         backgroundColor: '#f3f4f6',
//                         borderRadius: 12
//                     }}>
//                         <View style={{ flex: 1, marginRight: 12 }}>
//                             <Text style={{
//                                 fontSize: 16,
//                                 fontWeight: '600',
//                                 color: '#1f2937',
//                                 marginBottom: 4
//                             }}>
//                                 Custom Macros
//                             </Text>
//                             <Text style={{
//                                 fontSize: 13,
//                                 color: '#6b7280'
//                             }}>
//                                 Specify target macros for this meal
//                             </Text>
//                         </View>
//                         <Switch
//                             value={includeCustomMacros}
//                             onValueChange={setIncludeCustomMacros}
//                             trackColor={{ false: '#d1d5db', true: '#86efac' }}
//                             thumbColor={includeCustomMacros ? '#22c55e' : '#f3f4f6'}
//                         />
//                     </View>
//
//                     {/* Macro Inputs */}
//                     {includeCustomMacros && (
//                         <View style={{
//                             backgroundColor: '#f9fafb',
//                             padding: 16,
//                             borderRadius: 12,
//                             marginBottom: 24,
//                             borderWidth: 1,
//                             borderColor: '#e5e7eb'
//                         }}>
//                             <Text style={{
//                                 fontSize: 15,
//                                 fontWeight: '600',
//                                 color: '#1f2937',
//                                 marginBottom: 12
//                             }}>
//                                 Target Macros (optional)
//                             </Text>
//
//                             <View style={{ gap: 12 }}>
//                                 {/* Protein */}
//                                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                     <View style={{ flex: 1 }}>
//                                         <Text style={{
//                                             fontSize: 14,
//                                             color: '#6b7280',
//                                             marginBottom: 6
//                                         }}>
//                                             Protein (g)
//                                         </Text>
//                                         <TextInput
//                                             value={macros.protein}
//                                             onChangeText={(text) => setMacros({...macros, protein: text})}
//                                             placeholder="30"
//                                             keyboardType="numeric"
//                                             style={{
//                                                 borderWidth: 1,
//                                                 borderColor: '#d1d5db',
//                                                 borderRadius: 8,
//                                                 padding: 10,
//                                                 fontSize: 15,
//                                                 backgroundColor: '#ffffff'
//                                             }}
//                                         />
//                                     </View>
//                                     <View style={{ width: 12 }} />
//                                     <View style={{ flex: 1 }}>
//                                         <Text style={{
//                                             fontSize: 14,
//                                             color: '#6b7280',
//                                             marginBottom: 6
//                                         }}>
//                                             Carbs (g)
//                                         </Text>
//                                         <TextInput
//                                             value={macros.carbs}
//                                             onChangeText={(text) => setMacros({...macros, carbs: text})}
//                                             placeholder="50"
//                                             keyboardType="numeric"
//                                             style={{
//                                                 borderWidth: 1,
//                                                 borderColor: '#d1d5db',
//                                                 borderRadius: 8,
//                                                 padding: 10,
//                                                 fontSize: 15,
//                                                 backgroundColor: '#ffffff'
//                                             }}
//                                         />
//                                     </View>
//                                 </View>
//
//                                 {/* Fats and Calories */}
//                                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                     <View style={{ flex: 1 }}>
//                                         <Text style={{
//                                             fontSize: 14,
//                                             color: '#6b7280',
//                                             marginBottom: 6
//                                         }}>
//                                             Fats (g)
//                                         </Text>
//                                         <TextInput
//                                             value={macros.fats}
//                                             onChangeText={(text) => setMacros({...macros, fats: text})}
//                                             placeholder="15"
//                                             keyboardType="numeric"
//                                             style={{
//                                                 borderWidth: 1,
//                                                 borderColor: '#d1d5db',
//                                                 borderRadius: 8,
//                                                 padding: 10,
//                                                 fontSize: 15,
//                                                 backgroundColor: '#ffffff'
//                                             }}
//                                         />
//                                     </View>
//                                     <View style={{ width: 12 }} />
//                                     <View style={{ flex: 1 }}>
//                                         <Text style={{
//                                             fontSize: 14,
//                                             color: '#6b7280',
//                                             marginBottom: 6
//                                         }}>
//                                             Calories
//                                         </Text>
//                                         <TextInput
//                                             value={macros.calories}
//                                             onChangeText={(text) => setMacros({...macros, calories: text})}
//                                             placeholder="500"
//                                             keyboardType="numeric"
//                                             style={{
//                                                 borderWidth: 1,
//                                                 borderColor: '#d1d5db',
//                                                 borderRadius: 8,
//                                                 padding: 10,
//                                                 fontSize: 15,
//                                                 backgroundColor: '#ffffff'
//                                             }}
//                                         />
//                                     </View>
//                                 </View>
//                             </View>
//
//                             <Text style={{
//                                 fontSize: 12,
//                                 color: '#9ca3af',
//                                 marginTop: 8
//                             }}>
//                                 Leave empty to let AI decide the portions
//                             </Text>
//                         </View>
//                     )}
//
//                     {/* Quick Suggestions */}
//                     <View style={{ marginBottom: 24 }}>
//                         <Text style={{
//                             fontSize: 15,
//                             fontWeight: '600',
//                             color: '#1f2937',
//                             marginBottom: 10
//                         }}>
//                             Quick Suggestions
//                         </Text>
//                         <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
//                             {['High Protein', 'Low Carb', 'Vegetarian', 'Quick & Easy'].map((suggestion) => (
//                                 <TouchableOpacity
//                                     key={suggestion}
//                                     onPress={() => setQuickSugest(prev =>
//                                         prev ? `${prev}, ${suggestion.toLowerCase()}` : suggestion.toLowerCase()
//                                     )}
//                                     style={{
//                                         paddingHorizontal: 14,
//                                         paddingVertical: 8,
//                                         backgroundColor: '#ffffff',
//                                         borderWidth: 1,
//                                         borderColor: '#d1d5db',
//                                         borderRadius: 20
//                                     }}
//                                 >
//                                     <Text style={{
//                                         fontSize: 13,
//                                         color: '#4b5563'
//                                     }}>
//                                         {suggestion}
//                                     </Text>
//                                 </TouchableOpacity>
//                             ))}
//                         </View>
//                     </View>
//                 </View>
//             </ScrollView>
//
//             {/* Generate Button */}
//             <View style={{
//                 padding: 16,
//                 paddingBottom: 20,
//                 borderTopWidth: 1,
//                 borderTopColor: '#e5e7eb',
//                 backgroundColor: '#ffffff'
//             }}>
//                 <TouchableOpacity
//                     onPress={handleGenerate}
//                     disabled={!isFormValid || isGenerating}
//                     style={{
//                         backgroundColor: isFormValid && !isGenerating ? '#22c55e' : '#d1d5db',
//                         paddingVertical: 16,
//                         borderRadius: 12,
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'center'
//                     }}
//                 >
//                     {isGenerating ? (
//                         <Text style={{
//                             color: '#ffffff',
//                             fontSize: 16,
//                             fontWeight: '600'
//                         }}>
//                             Generating...
//                         </Text>
//                     ) : (
//                         <>
//                             <Ionicons name="sparkles" size={20} color="#ffffff" style={{ marginRight: 8 }} />
//                             <Text style={{
//                                 color: '#ffffff',
//                                 fontSize: 16,
//                                 fontWeight: '600'
//                             }}>
//                                 Generate Meal
//                             </Text>
//                         </>
//                     )}
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }

import { View, Text, TouchableOpacity, ScrollView, TextInput, Switch } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useState } from 'react';

export default function GenerateMeal({ onClose }) {
    const [mealDescription, setMealDescription] = useState<string>('');
    const [includeCustomMacros, setIncludeCustomMacros] = useState<boolean>(false);
    const [quickSuggestions, setQuickSuggestions] = useState<string[]>([]);
    const [macros, setMacros] = useState<{
        protein: string;
        carbs: string;
        fats: string;
        calories: string;
    }>({
        protein: '',
        carbs: '',
        fats: '',
        calories: ''
    });
    const [isGenerating, setIsGenerating] = useState(false);

    const colors = {
        yellowAccent: "#f6d809",
        tealAccent: "#a4dad2",
        greenSoft: "#93c572",
        limeSoft: "#bce08a",
        blueGray: "#569099"
    };

    const handleGenerate = async () => {
        if (!mealDescription.trim()) return;

        setIsGenerating(true);
        // Your generation logic here
        setTimeout(() => {
            setIsGenerating(false);
            // Handle generated meal
        }, 2000);
    };

    const isFormValid = mealDescription.trim().length > 0;

    return (
        <View style={{ flex: 1 }}>
            {/* Handle bar */}
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                <View style={{
                    width: 40,
                    height: 5,
                    backgroundColor: colors.blueGray,
                    borderRadius: 3,
                    opacity: 0.3
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
                <Ionicons name="close" size={28} color={colors.blueGray} />
            </TouchableOpacity>

            {/* Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        marginBottom: 8,
                        marginTop: 10,
                        color: colors.blueGray
                    }}>
                        Generate Meal
                    </Text>

                    <Text style={{
                        fontSize: 14,
                        color: colors.blueGray,
                        opacity: 0.7,
                        marginBottom: 24
                    }}>
                        Describe what you'd like to eat and we'll create a meal plan for you
                    </Text>

                    {/* Meal Description */}
                    <View style={{ marginBottom: 24 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '600',
                            marginBottom: 8,
                            color: colors.blueGray
                        }}>
                            What would you like to eat?
                        </Text>
                        <TextInput
                            value={mealDescription}
                            onChangeText={setMealDescription}
                            placeholder="e.g., Grilled chicken with rice and vegetables"
                            placeholderTextColor={colors.blueGray + '60'}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            style={{
                                borderWidth: 2,
                                borderColor: colors.tealAccent,
                                borderRadius: 12,
                                padding: 12,
                                fontSize: 15,
                                color: colors.blueGray,
                                backgroundColor: colors.tealAccent + '20',
                                minHeight: 100
                            }}
                        />
                        <Text style={{
                            fontSize: 12,
                            color: colors.blueGray,
                            opacity: 0.6,
                            marginTop: 6
                        }}>
                            Be as specific or general as you'd like
                        </Text>
                    </View>

                    {/* Custom Macros Toggle */}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 16,
                        padding: 16,
                        backgroundColor: colors.limeSoft + '30',
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: colors.limeSoft
                    }}>
                        <View style={{ flex: 1, marginRight: 12 }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: colors.blueGray,
                                marginBottom: 4
                            }}>
                                Custom Macros
                            </Text>
                            <Text style={{
                                fontSize: 13,
                                color: colors.blueGray,
                                opacity: 0.7
                            }}>
                                Specify target macros for this meal
                            </Text>
                        </View>
                        <Switch
                            value={includeCustomMacros}
                            onValueChange={setIncludeCustomMacros}
                            trackColor={{ false: colors.blueGray + '40', true: colors.greenSoft }}
                            thumbColor={includeCustomMacros ? colors.limeSoft : '#f4f3f4'}
                        />
                    </View>

                    {/* Macro Inputs */}
                    {includeCustomMacros && (
                        <View style={{
                            backgroundColor: colors.tealAccent + '20',
                            padding: 16,
                            borderRadius: 12,
                            marginBottom: 24,
                            borderWidth: 1,
                            borderColor: colors.tealAccent
                        }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: '600',
                                color: colors.blueGray,
                                marginBottom: 12
                            }}>
                                Target Macros (optional)
                            </Text>

                            <View style={{ gap: 12 }}>
                                {/* Protein & Carbs */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{
                                            fontSize: 14,
                                            color: colors.blueGray,
                                            marginBottom: 6,
                                            opacity: 0.8
                                        }}>
                                            Protein (g)
                                        </Text>
                                        <TextInput
                                            value={macros.protein}
                                            onChangeText={(text) => setMacros({...macros, protein: text})}
                                            placeholder="30"
                                            placeholderTextColor={colors.blueGray + '50'}
                                            keyboardType="numeric"
                                            style={{
                                                borderWidth: 1.5,
                                                borderColor: colors.greenSoft,
                                                borderRadius: 8,
                                                padding: 10,
                                                fontSize: 15,
                                                backgroundColor: '#ffffff',
                                                color: colors.blueGray
                                            }}
                                        />
                                    </View>
                                    <View style={{ width: 12 }} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={{
                                            fontSize: 14,
                                            color: colors.blueGray,
                                            marginBottom: 6,
                                            opacity: 0.8
                                        }}>
                                            Carbs (g)
                                        </Text>
                                        <TextInput
                                            value={macros.carbs}
                                            onChangeText={(text) => setMacros({...macros, carbs: text})}
                                            placeholder="50"
                                            placeholderTextColor={colors.blueGray + '50'}
                                            keyboardType="numeric"
                                            style={{
                                                borderWidth: 1.5,
                                                borderColor: colors.greenSoft,
                                                borderRadius: 8,
                                                padding: 10,
                                                fontSize: 15,
                                                backgroundColor: '#ffffff',
                                                color: colors.blueGray
                                            }}
                                        />
                                    </View>
                                </View>

                                {/* Fats & Calories */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{
                                            fontSize: 14,
                                            color: colors.blueGray,
                                            marginBottom: 6,
                                            opacity: 0.8
                                        }}>
                                            Fats (g)
                                        </Text>
                                        <TextInput
                                            value={macros.fats}
                                            onChangeText={(text) => setMacros({...macros, fats: text})}
                                            placeholder="15"
                                            placeholderTextColor={colors.blueGray + '50'}
                                            keyboardType="numeric"
                                            style={{
                                                borderWidth: 1.5,
                                                borderColor: colors.greenSoft,
                                                borderRadius: 8,
                                                padding: 10,
                                                fontSize: 15,
                                                backgroundColor: '#ffffff',
                                                color: colors.blueGray
                                            }}
                                        />
                                    </View>
                                    <View style={{ width: 12 }} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={{
                                            fontSize: 14,
                                            color: colors.blueGray,
                                            marginBottom: 6,
                                            opacity: 0.8
                                        }}>
                                            Calories
                                        </Text>
                                        <TextInput
                                            value={macros.calories}
                                            onChangeText={(text) => setMacros({...macros, calories: text})}
                                            placeholder="500"
                                            placeholderTextColor={colors.blueGray + '50'}
                                            keyboardType="numeric"
                                            style={{
                                                borderWidth: 1.5,
                                                borderColor: colors.greenSoft,
                                                borderRadius: 8,
                                                padding: 10,
                                                fontSize: 15,
                                                backgroundColor: '#ffffff',
                                                color: colors.blueGray
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>

                            <Text style={{
                                fontSize: 12,
                                color: colors.blueGray,
                                opacity: 0.6,
                                marginTop: 8
                            }}>
                                Leave empty to let AI decide the portions
                            </Text>
                        </View>
                    )}

                    {/* Quick Suggestions */}
                    <View style={{ marginBottom: 24 }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: '600',
                            color: colors.blueGray,
                            marginBottom: 10
                        }}>
                            Quick Suggestions
                        </Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                            {['High Protein', 'Low Carb', 'Vegetarian', 'Quick & Easy'].map((suggestion) => {
                                const isSelected = quickSuggestions.includes(suggestion);
                                return (
                                    <TouchableOpacity
                                        key={suggestion}
                                        onPress={() => {
                                            if (isSelected) {
                                                // Remove from selection
                                                setQuickSuggestions(prev => prev.filter(s => s !== suggestion));
                                            } else {
                                                // Add to selection
                                                setQuickSuggestions(prev => [...prev, suggestion]);
                                            }
                                        }}
                                        style={{
                                            paddingHorizontal: 14,
                                            paddingVertical: 8,
                                            backgroundColor: isSelected ? colors.yellowAccent : colors.yellowAccent + '30',
                                            borderWidth: 1.5,
                                            borderColor: isSelected ? colors.yellowAccent : colors.yellowAccent + '80',
                                            borderRadius: 20
                                        }}
                                    >
                                        <Text style={{
                                            fontSize: 13,
                                            color: colors.blueGray,
                                            fontWeight: isSelected ? '600' : '500'
                                        }}>
                                            {suggestion}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Generate Button - Compact */}
            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderTopWidth: 1,
                borderTopColor: colors.tealAccent + '50',
                backgroundColor: '#ffffff'
            }}>
                <TouchableOpacity
                    onPress={handleGenerate}
                    disabled={!isFormValid || isGenerating}
                    style={{
                        backgroundColor: isFormValid && !isGenerating ? colors.greenSoft : colors.blueGray + '40',
                        paddingVertical: 14,
                        borderRadius: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        shadowColor: colors.greenSoft,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 3
                    }}
                >
                    {isGenerating ? (
                        <Text style={{
                            color: '#ffffff',
                            fontSize: 16,
                            fontWeight: '600'
                        }}>
                            Generating...
                        </Text>
                    ) : (
                        <>
                            <Ionicons name="sparkles" size={18} color="#ffffff" style={{ marginRight: 8 }} />
                            <Text style={{
                                color: '#ffffff',
                                fontSize: 16,
                                fontWeight: '600'
                            }}>
                                Generate Meal
                            </Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}