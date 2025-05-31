import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // Install with npm install expo-linear-gradient

import { Alert, StyleSheet } from "react-native";
import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0)); // For fade animation
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [fadeAnim]);

  const validateFields = () => {
    let valid = true;

    // Reset errors
    setEmailError("");
    setPasswordError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError("Email tidak boleh kosong.");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Alamat email tidak valid.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Kata sandi tidak boleh kosong.");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Kata sandi minimal 8 karakter.");
      valid = false;
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validateFields()) {
      Alert.alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const {
        data: { session },
        error,
      } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) Alert.alert(error.message);

      // Update the corresponding record in the pasien table
      const userProfile = {
        id: session?.user.id,
        nama_lengkap: "",
        email: session?.user.email,
        nomor_telepon: "",
        alamat: "",
        avatar_url: "",
      };
      const { error: profileError } = await supabase
        .from("pasien")
        .update([userProfile])
        .eq("id", session?.user.id);

      if (profileError) console.error(profileError);
    } catch (error) {
      console.error("Error during sign in:", error);
      Alert.alert("An error occurred during sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F2EDFE] justify-start items-center p-4"
      onTouchStart={() => Keyboard.dismiss()}
    >
      {/* Animated Logo or Title */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text className="text-black text-3xl font-semibold mb-6 tracking-widest">
          Login
        </Text>
      </Animated.View>

      {/* Login Form Container */}
      <View className="w-11/12 max-w-md p-6 rounded-xl ">
        {/* email Input */}
        <View className="mb-4">
          <Text className="text-gray-400 text-md mb-1">Email</Text>
          <TextInput
            className="text-black border-b border-[#71717A] p-4 rounded-lg  focus:border-blue-500"
            placeholder="Enter your email"
            placeholderTextColor="#8a8a8a"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        {emailError ? (
          <Text className="text-red-500 text-md mb-2">{emailError}</Text>
        ) : null}

        {/* Password Input */}
        <View className="mb-4">
          <Text className="text-gray-400 text-md mb-1">Password</Text>
          <View className="relative">
            <TextInput
              className="text-black border-b border-[#71717A] p-4 rounded-lg  focus:border-blue-500"
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
          {passwordError ? (
            <Text className="text-red-500 text-md mb-2 mt-4">{passwordError}</Text>
          ) : null}
        </View>

        {/* Forgot Password */}
        <TouchableOpacity className="mb-6">
          <Text className="text-black text-sm text-right">
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          className="items-center bg-[#A78DF8] py-4 rounded-[8%] mt-4"
        >
          <Text className="text-white font-semibold text-lg">Log in</Text>
        </TouchableOpacity>

        {/* Sign Up Prompt */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-500 text-md">Don’t have an account? </Text>
          <Link href="/signup">
            <Text className="text-[#A78DF8] text-md font-semibold">
              Register
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
