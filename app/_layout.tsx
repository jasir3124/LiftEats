import { useEffect } from "react";
import { Linking } from "react-native";
import { router, Stack } from "expo-router";
import { supabase } from "@/lib/supabase";

import "../global.css";

export default function RootLayout() {
    useEffect(() => {
        const handleLink = async (url: string | null) => {
            if (!url) return;

            const params = new URL(url).searchParams;
            const token = params.get("token");
            const email = params.get("email");

            if (token && email) {
                // Optional: verify OTP if you still want Supabase to check
                const { error } = await supabase.auth.verifyOtp({
                    email,
                    token,
                    type: "signup",
                });

                if (!error) router.replace("/(main)/home");
            }
        };

        const subscription = Linking.addEventListener("url", (event) => handleLink(event.url));
        Linking.getInitialURL().then((url) => handleLink(url));

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                router.replace("/home");
            }
        });

        const authSub = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session) {
                router.replace("/home");
            } else if (event === "SIGNED_OUT") {
                router.replace("/");
            }
        });

        // Clean up
        return () => {
            subscription.remove();
            authSub.data.subscription.unsubscribe();
        };
    }, []);

    return <Stack screenOptions={{ headerShown: false }} />;
}
