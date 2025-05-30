import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { supabase } from "@/lib/supabase";

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
    console.log("🟢 Tombol daftar ditekan");
    if (!validateInputs()) return;

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      const user = data?.user;

      if (!user) throw new Error("User tidak dibuat");

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

      if (insertError) throw insertError;

      Alert.alert("Registrasi berhasil", "Cek email untuk verifikasi.");
    } catch (error: any) {
      console.error("❌ Error saat registrasi:", error);
      Alert.alert("Gagal mendaftar", error.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      className="flex-1 bg-black justify-center items-center p-4"
      onTouchStart={Keyboard.dismiss}
    >
      <Text className="text-white text-4xl font-bold mb-6 tracking-widest">
        MedBay
      </Text>

      <View className="w-full max-w-md bg-gray-900 p-6 rounded-xl">
        {[
          { label: "Nama Lengkap", value: nama, setter: setNama, placeholder: "Nama lengkap" },
          { label: "Email", value: email, setter: setEmail, placeholder: "Email" },
          { label: "Nomor Telepon", value: telepon, setter: setTelepon, placeholder: "08xxxx / +628xxx" },
          { label: "Alamat", value: alamat, setter: setAlamat, placeholder: "Alamat rumah" },
          { label: "NIK", value: nik, setter: setNik, placeholder: "16 digit" },
        ].map(({ label, value, setter, placeholder }, idx) => (
          <View className="mb-3" key={idx}>
            <Text className="text-gray-400 text-sm mb-1">{label}</Text>
            <TextInput
              value={value}
              onChangeText={setter}
              placeholder={placeholder}
              placeholderTextColor="#8a8a8a"
              className="text-white bg-gray-800 p-4 rounded-lg border border-gray-700"
            />
          </View>
        ))}

        {/* Password */}
        <View className="mb-4">
          <Text className="text-gray-400 text-sm mb-1">Password</Text>
          <View className="relative">
            <TextInput
              className="text-white bg-gray-800 p-4 rounded-lg border border-gray-700 pr-12"
              placeholder="Minimal 6 karakter"
              placeholderTextColor="#8a8a8a"
              secureTextEntry={isSecureEntry}
              value={password}
              onChangeText={setPassword}
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

        {/* Sign Up Button */}
        <TouchableOpacity onPress={handleSignUp} disabled={loading}>
          <LinearGradient
            colors={["#4B5EFC", "#A66BFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="p-4 rounded-lg mb-3"
          >
            <Text className="text-white font-bold text-lg text-center">
              {loading ? "Mendaftar..." : "Daftar"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Link to Login */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-500 text-sm">Sudah punya akun? </Text>
          <Link href="/login" asChild>
            <Text className="text-blue-400 text-sm font-semibold">Masuk</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
