import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // Install with npm install expo-linear-gradient
import { User } from "@/types";
import { Alert, StyleSheet } from "react-native";
import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0)); // For fade animation
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }
  // Animation on mount
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [fadeAnim]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please fill in all fields.");
      return;
    }
    try {
      setLoading(true);
      const {error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert("Login failed", error.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("An error occurred during login. Please try again.");
      
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <View
      className="flex-1 bg-black justify-center items-center p-4"
      onTouchStart={() => Keyboard.dismiss()}
    >
      {/* Animated Logo or Title */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text className="text-white text-4xl font-bold mb-6 tracking-widest">
          Thread
        </Text>
      </Animated.View>

      {/* Login Form Container */}
      <View className="w-11/12 max-w-md bg-gray-900 p-6 rounded-xl shadow-lg">
        {/* email Input */}
        <View className="mb-4">
          <Text className="text-gray-400 text-sm mb-1">email</Text>
          <TextInput
            className="text-white bg-gray-800 p-4 rounded-lg border border-gray-700 focus:border-blue-500"
            placeholder="Enter your email"
            placeholderTextColor="#8a8a8a"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Password Input */}
        <View className="mb-4">
          <Text className="text-gray-400 text-sm mb-1">Password</Text>
          <View className="relative">
            <TextInput
              className="text-white bg-gray-800 p-4 rounded-lg border border-gray-700 focus:border-blue-500 pr-12"
              placeholder="Enter your password"
              placeholderTextColor="#8a8a8a"
              secureTextEntry={isSecureEntry}
              value={password}
              onChangeText={(text) => setPassword(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              className="absolute right-4 top-4"
              onPress={() => setIsSecureEntry(!isSecureEntry)}
            >
              <Feather
                name={isSecureEntry ? "eye-off" : "eye"}
                size={20}
                color="#8a8a8a"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity className="mb-6">
          <Text className="text-blue-400 text-sm text-right">
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <LinearGradient
          colors={["#4B5EFC", "#A66BFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="p-4 rounded-lg"
        >
          <TouchableOpacity onPress={handleLogin} className="items-center">
            <Text className="text-white font-bold text-lg">Login</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Sign Up Prompt */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-500 text-sm">Don’t have an account? </Text>
          <Link href="/signup">
            <Text className="text-blue-400 text-sm font-semibold">Sign Up</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
