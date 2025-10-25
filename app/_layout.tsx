import {useState, useEffect, useCallback} from "react";
import {Linking, View} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {Asset} from "expo-asset";
import {router, Stack} from "expo-router";
import {supabase} from "@/lib/supabase";
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
                    const params = new URL(url).searchParams;
                    const token = params.get("token");
                    const email = params.get("email");
                    if (token && email) {
                        const {error} = await supabase.auth.verifyOtp({email, token, type: "signup"});
                        if (!error) router.replace("/(main)/home");
                    }
                };
                const sub = Linking.addEventListener("url", (event) => handleLink(event.url));
                handleLink(await Linking.getInitialURL());

                // 3️⃣ Mark ready BEFORE navigating
                setAppReady(true);

                return () => sub.remove();
            } catch (e) {
                console.warn(e);
                setAppReady(true); // ensure we still show UI even if something failed
            }
        }

        prepare();

        // 4️⃣ Auth state listener (mounted once)
        const {data: listener} = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session) router.replace("/(main)/home");
            if (event === "SIGNED_OUT") router.replace("/");
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    // 5️⃣ Hide splash screen once layout is ready
    const onLayoutRootView = useCallback(async () => {
        if (appReady) {
            await SplashScreen.hideAsync();

            // Now it’s safe to check session & navigate
            const {data: {session}} = await supabase.auth.getSession();
            if (session) router.replace("/(main)/home");
            else router.replace("/");
        }
    }, [appReady]);

    if (!appReady) return null;

    return (
        <View style={{flex: 1, backgroundColor: "#fff"}} onLayout={onLayoutRootView}>
            <Stack screenOptions={{headerShown: false}}/>
        </View>
    );
}