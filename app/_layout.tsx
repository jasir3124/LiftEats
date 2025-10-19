// import { useEffect } from "react";
// import { Linking } from "react-native";
// import { router, Stack } from "expo-router";
// import { supabase } from "@/lib/supabase";
//
// import "../global.css";
//
// export default function RootLayout() {
//     useEffect(() => {
//         const handleLink = async (url: string | null) => {
//             if (!url) return;
//
//             const params = new URL(url).searchParams;
//             const token = params.get("token");
//             const email = params.get("email");
//
//             if (token && email) {
//                 // Optional: verify OTP if you still want Supabase to check
//                 const { error } = await supabase.auth.verifyOtp({
//                     email,
//                     token,
//                     type: "signup",
//                 });
//
//                 if (!error) router.replace("/(main)/home");
//             }
//         };
//
//         const subscription = Linking.addEventListener("url", (event) => handleLink(event.url));
//         Linking.getInitialURL().then((url) => handleLink(url));
//
//         supabase.auth.getSession().then(({ data: { session } }) => {
//             if (session) {
//                 router.replace("/home");
//             }
//         });
//
//         const authSub = supabase.auth.onAuthStateChange((event, session) => {
//             if (event === "SIGNED_IN" && session) {
//                 router.replace("/home");
//             } else if (event === "SIGNED_OUT") {
//                 router.replace("/");
//             }
//         });
//
//         // Clean up
//         return () => {
//             subscription.remove();
//             authSub.data.subscription.unsubscribe();
//         };
//     }, []);
//
//     return <Stack screenOptions={{ headerShown: false }} />;
// }



import { useState, useEffect, useCallback } from "react";
import { Linking, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { router, Stack } from "expo-router";
import { supabase } from "@/lib/supabase";

import "../global.css";

// Keep splash screen visible
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [appReady, setAppReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                // Load fonts
                // await Font.loadAsync({
                //     Inter: require("../assets/fonts/Inter-Regular.ttf"),
                //     InterBold: require("../assets/fonts/Inter-Bold.ttf"),
                // });

                // Preload images
                const images = [
                    require("../assets/images/food-board-onboard-page-2.jpg"),
                    require("../assets/images/well-done-steak-homemade-potatoes.jpg"),
                    // require("../assets/images/Google__G__logo.svg"),
                ];
                const cacheImages = images.map((img) => Asset.fromModule(img).downloadAsync());
                await Promise.all(cacheImages);

                // Check Supabase session
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    router.replace("/(main)/home");
                }

                // Listen for auth changes
                supabase.auth.onAuthStateChange((event, session) => {
                    if (event === "SIGNED_IN" && session) router.replace("/(main)/home");
                    if (event === "SIGNED_OUT") router.replace("/");
                });

                // Handle deep links
                const handleLink = async (url: string | null) => {
                    if (!url) return;
                    const params = new URL(url).searchParams;
                    const token = params.get("token");
                    const email = params.get("email");
                    if (token && email) {
                        const { error } = await supabase.auth.verifyOtp({ email, token, type: "signup" });
                        if (!error) router.replace("/(main)/home");
                    }
                };
                const subscription = Linking.addEventListener("url", (event) => handleLink(event.url));
                const initialUrl = await Linking.getInitialURL();
                handleLink(initialUrl);

                // Mark app ready
                setAppReady(true);

                // Clean up on unmount
                return () => {
                    subscription.remove();
                };
            } catch (e) {
                console.warn(e);
            }
        }

        prepare();
    }, []);

    // Hide splash once layout is ready
    const onLayoutRootView = useCallback(async () => {
        if (appReady) await SplashScreen.hideAsync();
    }, [appReady]);

    if (!appReady) return null; // Keep splash screen visible

    return <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Stack screenOptions={{ headerShown: false }} />
    </View>;
}
