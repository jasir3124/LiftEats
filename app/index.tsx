import { View, Image, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

import { supabase } from "../lib/supabase"; // adjust path
import * as WebBrowser from "expo-web-browser";
import * as Linking from 'expo-linking'


export default function Index() {

	const signInWithGoogle = async () => {
		try {
			const redirectUrl = Linking.createURL('/')

			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: redirectUrl, // Expo dev URL; for production use your app scheme
				},
			});

			if (error) {
				console.error("Error signing in:", error.message);
			} else {
				// This URL opens the OAuth page
				if (data.url) {
					WebBrowser.openBrowserAsync(data.url);
				}
			}
		} catch (err) {
			console.error(err);
		}
	};



	return (
		<View className="flex-1 relative">
			{/* Top Image */}
			<View className="flex-[5]">
				<Image
					source={require("../assets/images/food-board-onboard-page-2.jpg")}
					className="w-full h-full"
					resizeMode="cover"
				/>
			</View>

			{/* Bottom Green Section */}
			<View className="flex-[5] bg-brandGreen items-center pt-10 relative">
				{/* Fake shadow with gradient */}
				<LinearGradient
					colors={["#93c572", "transparent"]}
					start={{ x: 0, y: 1 }} // bottom
					end={{ x: 0, y: 0 }}   // top
					style={{
						position: "absolute",
						top: -300,
						left: 0,
						right: 0,
						height: 300,
					}}
				/>

				<Link href={"/SignUp"} asChild={true}>
					<TouchableOpacity className="bg-black w-2/3 h-12 items-center justify-center rounded-md z-10 mb-4">
						<Text className="text-white font-bold text-xl">Sign Up With Email</Text>
					</TouchableOpacity>
				</Link>

				<View className="flex-row items-center justify-center mt-5 mb-10 w-full z-10">
					<View className="w-20 h-0.5 bg-gray-300" />
					<Text className="mx-3 text-gray-300 font-semibold text-lg">
						or use social sign up
					</Text>
					<View className="w-20 h-0.5 bg-gray-300" />
				</View>

				<View className="flex-col gap-7 w-2/3 z-10">
					<TouchableOpacity
						className="bg-white h-12 flex-row items-center justify-center rounded-md shadow"
						onPress={signInWithGoogle}
					>
						<Text className="text-black font-semibold text-base ml-2">
							Sign in with Google
						</Text>
					</TouchableOpacity>

					<TouchableOpacity className="bg-blue-600 h-12 flex-row items-center justify-center rounded-md shadow">
						<Text className="text-white font-semibold text-base ml-2">
							Sign in with Facebook
						</Text>
					</TouchableOpacity>

					<Text className={"text-white text-center text-lg"}>Already have an account? <Link href="/SignIn"
						className="font-semibold underline">Sign In</Link></Text>
				</View>

			</View>
		</View>
	);
}
