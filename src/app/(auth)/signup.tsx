import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [telepon, setTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nik, setNik] = useState("");
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    const nikRegex = /^\d{16}$/;
    const teleponRegex = /^(08|\+628)\d{7,12}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nama || !email || !password || !telepon || !alamat || !nik) {
      Alert.alert("Validasi Gagal", "Semua field wajib diisi.");
      return false;
    }

    if (!emailRegex.test(email)) {
      Alert.alert("Validasi Gagal", "Email tidak valid.");
      return false;
    }

    if (!teleponRegex.test(telepon)) {
      Alert.alert("Validasi Gagal", "Nomor telepon tidak valid.");
      return false;
    }

    if (!nikRegex.test(nik)) {
      Alert.alert("Validasi Gagal", "NIK harus 16 digit angka.");
      return false;
    }

    if (password.length < 6) {
      Alert.alert("Validasi Gagal", "Password minimal 6 karakter.");
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return;

    setLoading(true);

    try {
      // First, sign up the user
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: nama,
          },
        },
      });

      if (error) {
        console.error("Auth signup error:", error);
        throw error;
      }

      const user = data?.user;
      if (!user) {
        throw new Error("User creation failed - no user data received");
      }

      console.log("User created:", user.id, user.email);

      // Insert user profile into pasien table
      const { error: insertError } = await supabase.from("pasien").insert([
        {
          id: user.id,
          nama_lengkap: nama,
          email: user.email,
          nomor_telepon: telepon,
          alamat: alamat,
          nik: nik,
        },
      ]);

      if (insertError) {
        console.error("Profile creation error:", insertError);
        // If profile creation fails, we should sign out the user
        await supabase.auth.signOut();
        throw new Error(`Failed to create profile: ${insertError.message}`);
      }

      console.log("Profile created successfully");

      Alert.alert(
        "Registration Successful",
        "Please check your email for verification before logging in.",
        [
          {
            text: "OK",
            onPress: () => {
              // Clear form
              setNama("");
              setEmail("");
              setTelepon("");
              setAlamat("");
              setNik("");
              setPassword("");
            },
          },
        ]
      );
    } catch (error: any) {
      console.error("❌ Registration error:", error);
      Alert.alert(
        "Registration Failed",
        error.message || "An unexpected error occurred during registration."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F2EDFE] justify-start items-center p-4"
      onTouchStart={Keyboard.dismiss}
    >
      <Text className="text-black text-3xl font-semibold mb-6 tracking-widest">
        Daftar
      </Text>

      <View className="w-11/12 max-w-md p-6 rounded-xl">
        {[
          {
            label: "Nama Lengkap",
            value: nama,
            setter: setNama,
            placeholder: "Nama lengkap",
          },
          {
            label: "Email",
            value: email,
            setter: setEmail,
            placeholder: "Email",
          },
          {
            label: "Nomor Telepon",
            value: telepon,
            setter: setTelepon,
            placeholder: "08xxxx / +628xxx",
          },
          {
            label: "Alamat",
            value: alamat,
            setter: setAlamat,
            placeholder: "Alamat rumah",
          },
          { label: "NIK", value: nik, setter: setNik, placeholder: "16 digit" },
        ].map(({ label, value, setter, placeholder }, idx) => (
          <View className="mb-4" key={idx}>
            <Text className="text-gray-500 text-md mb-1">{label}</Text>
            <TextInput
              value={value}
              onChangeText={setter}
              placeholder={placeholder}
              placeholderTextColor="#8a8a8a"
              className="text-black border-b border-[#71717A] p-4 rounded-lg"
            />
          </View>
        ))}

        {/* Password */}
        <View className="mb-4">
          <Text className="text-gray-500 text-md mb-1">Password</Text>
          <View className="relative">
            <TextInput
              className="text-black border-b border-[#71717A] p-4 rounded-lg pr-12"
              placeholder="Minimal 6 karakter"
              placeholderTextColor="#8a8a8a"
              secureTextEntry={isSecureEntry}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
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

        {/* Daftar Button */}
        <TouchableOpacity
          onPress={handleSignUp}
          className="items-center bg-[#A78DF8] py-4 rounded-[8%] mt-4"
          disabled={loading}
        >
          <Text className="text-white font-semibold text-lg">
            {loading ? "Mendaftar..." : "Daftar"}
          </Text>
        </TouchableOpacity>

        {/* Link to Login */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-500 text-md">Sudah punya akun? </Text>
          <Link href="/login">
            <Text className="text-[#A78DF8] text-md font-semibold">Masuk</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
