import icons from "@/constants/icons";
import images from "@/constants/images";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";
import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
    const { refetch, loading, isLoggedIn } = useGlobalContext();

    if(!loading && isLoggedIn) return <Redirect href="/" />;

    const handleLogin = async () => {
        const result = await login();

        if(result) {
            refetch();
        } else {
            Alert.alert("Error", "Failed to login");
        }
    }

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerClassName="h-full">
                <Image source={images.onboarding} resizeMode="contain"
                    className="w-full h-4/6"
                />
                <View className="px-10">
                    <Text className="text-base text-center uppercase font-rubik
                        text-black-200"
                        >
                        Welcome to ReState
                    </Text>
                    <Text className="text-3xl font-rubik-bold text-black-300
                        text-center mt-2"
                        >
                        Let's get you Closer to {"\n"}
                        <Text className="text-primary-300">Your Ideal Home</Text>
                    </Text>
                    <Text className="text-lg font-rubik text-black-200
                        text-center mt-12"
                        >
                        Login to ReState with google
                    </Text>

                    <TouchableOpacity onPress={handleLogin} 
                        className="bg-white shadow-md shadow-zinc-300 rounded-full
                        py-4 mt-5"
                        >
                            <View className="flex flex-row items-center justify-center">
                                <Image source={icons.google} resizeMode="contain"
                                className="w-5 h-5"
                                />
                                <Text className="text-lg font-rubik-medium ml-2 text-black-300">
                                Continue with Google
                                </Text>
                            </View>
                        </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default SignIn;