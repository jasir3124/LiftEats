import { useEffect } from "react";
import { router, Stack } from "expo-router";

import { supabase } from "@/lib/supabase";

import "../global.css"

export default function RootLayout() {

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log("✅ User already logged in:", session.user.email);
        router.replace("/home");
      }
    });

    // Listen for auth state changes
    const subscription = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === 'SIGNED_IN' && session) {
            router.replace("/home");
          } else if (event === 'SIGNED_OUT') {
            router.replace("/");
          }
        }
    );

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}