import { useState, useEffect, useCallback } from "react";
import { Linking, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import { Stack, router } from "expo-router";
import { supabase } from "@/lib/supabase";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [appReady, setAppReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                // 1️⃣ Preload assets
                const images = [
                    require("../assets/images/food-board-onboard-page-2.jpg"),
                    require("../assets/images/well-done-steak-homemade-potatoes.jpg"),
                ];
                await Promise.all(images.map((img) => Asset.fromModule(img).downloadAsync()));

                // 2️⃣ Handle deep links
                const handleLink = async (url: string | null) => {
                    if (!url) return;

                    try {
                        // Exchange confirmation / OAuth link for a session
                        const { data, error } = await supabase.auth.exchangeCodeForSession(url);
                        if (error) {
                            console.error("Failed to exchange session:", error.message);
                            return;
                        }

                        if (data?.session) {
                            router.replace("/(main)/home");
                        }
                    } catch (err) {
                        console.error("Deep link handling error:", err);
                    }
                };

                const linkingSub = Linking.addEventListener("url", (event) => handleLink(event.url));
                // Handle initial URL if app opened via link
                const initialUrl = await Linking.getInitialURL();
                await handleLink(initialUrl);

                setAppReady(true);

                return () => linkingSub.remove();
            } catch (e) {
                console.warn("App preparation error:", e);
                setAppReady(true);
            }
        }

        prepare();

        // 3️⃣ Listen to auth state changes
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session) router.replace("/(main)/home");
            if (event === "SIGNED_OUT") router.replace("/");
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    // 4️⃣ Hide splash screen and check session
    const onLayoutRootView = useCallback(async () => {
        if (appReady) {
            await SplashScreen.hideAsync();

            // Fallback: check current session
            const { data: { session } } = await supabase.auth.getSession();
            if (session) router.replace("/(main)/home");
            else router.replace("/");
        }
    }, [appReady]);

    if (!appReady) return null;

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }} onLayout={onLayoutRootView}>
            <Stack screenOptions={{ headerShown: false }} />
        </View>
    );
}
