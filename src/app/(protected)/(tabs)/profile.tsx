import React from "react";
import {
  View,
  ActivityIndicator,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTransactions } from "@/providers/TransactionProvider";

interface PasienUser {
  id: string;
  nama_lengkap: string;
  email: string;
  nomor_telepon: string;
  alamat: string;
  avatar_url?: string;
  nik: string;
}

export default function ProfileScreen() {
  const [user, setUser] = React.useState<PasienUser | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { transactions } = useTransactions();

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get authenticated user
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          console.error("Auth error:", authError);
          setError(`Authentication error: ${authError.message}`);
          return;
        }

        if (!authUser) {
          console.error("No authenticated user found");
          setError("No authenticated user found. Please log in again.");
          return;
        }

        console.log("Fetching profile for user:", authUser.id, authUser.email);

        // Fetch user profile from pasien table
        const { data: profileData, error: profileError } = await supabase
          .from("pasien")
          .select("*")
          .eq("id", authUser.id)
          .single();

        if (profileError) {
          console.error("Profile error:", profileError);

          if (profileError.code === "PGRST116") {
            setError("Profile not found. Please complete your registration.");
          } else {
            setError(`Failed to load profile: ${profileError.message}`);
          }
          return;
        }

        if (!profileData) {
          console.error("No profile data found");
          setError("Profile data not found");
          return;
        }

        console.log("Profile loaded successfully:", profileData);

        // Set user data
        setUser({
          ...profileData,
          email: authUser.email || profileData.email || "No email",
        });
      } catch (error) {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred while loading your profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await supabase.auth.signOut();
            router.replace("/(auth)/login");
          } catch (error) {
            console.error("Logout error:", error);
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#F2F0EF] justify-center items-center">
        <ActivityIndicator size="large" color="#A78DF8" />
        <Text className="text-[#1F2A37] mt-4">Loading profile...</Text>
      </View>
    );
  }

  if (error || !user) {
    return (
      <View className="flex-1 bg-[#F2F0EF] justify-center items-center px-6">
        <Ionicons name="alert-circle" size={48} color="#EF4444" />
        <Text className="text-[#1F2A37] text-lg font-semibold mt-4 text-center">
          Unable to load profile
        </Text>
        <Text className="text-[#4B5563] text-sm mt-2 text-center">
          {error || "Something went wrong"}
        </Text>
        <TouchableOpacity
          className="mt-6 bg-[#A78DF8] px-6 py-3 rounded-xl"
          onPress={() => {
            setLoading(true);
            setError(null);
            // Trigger component re-render by forcing useEffect to run again
            setUser(null);
          }}
        >
          <Text className="text-white text-base font-medium">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F2F0EF]">
      {/* Header */}
      <View className="bg-[#A78DF8] rounded-b-[20px] px-6 pt-8 pb-6">
        <View className="flex-row justify-between items-center mt-10">
          <View>
            <Text className="text-white text-2xl font-bold">Profile</Text>
            <Text className="text-white/80 text-sm">Manage your account</Text>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-white/20 rounded-full p-2"
          >
            <MaterialIcons name="logout" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View className="bg-white rounded-xl p-6 mt-6 shadow-sm">
          {/* Avatar Section */}
          <View className="items-center mb-6">
            <View className="relative">
              <Image
                source={
                  user.avatar_url
                    ? { uri: user.avatar_url }
                    : require("assets/Profile_avatar_placeholder_large.png")
                }
                className="w-24 h-24 rounded-full"
              />
              <View className="absolute -bottom-2 -right-2 bg-[#A78DF8] rounded-full p-2">
                <Ionicons name="person" size={16} color="white" />
              </View>
            </View>
            <Text className="text-[#1F2A37] text-xl font-bold mt-4">
              {user.nama_lengkap || "Unknown User"}
            </Text>
            <Text className="text-[#4B5563] text-sm">{user.email}</Text>
          </View>

          {/* Profile Information */}
          <View className="space-y-4">
            {/* Full Name */}
            <View className="flex-row items-center p-4 bg-[#F9FAFB] rounded-xl">
              <View className="bg-[#A78DF8] rounded-full p-2 mr-4">
                <Ionicons name="person-outline" size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-[#4B5563] text-xs font-medium uppercase tracking-wide">
                  Full Name
                </Text>
                <Text className="text-[#1F2A37] text-base font-medium mt-1">
                  {user.nama_lengkap || "Not provided"}
                </Text>
              </View>
            </View>

            {/* Phone Number */}
            <View className="flex-row items-center p-4 bg-[#F9FAFB] rounded-xl">
              <View className="bg-[#A78DF8] rounded-full p-2 mr-4">
                <Ionicons name="call-outline" size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-[#4B5563] text-xs font-medium uppercase tracking-wide">
                  Phone Number
                </Text>
                <Text className="text-[#1F2A37] text-base font-medium mt-1">
                  {user.nomor_telepon || "Not provided"}
                </Text>
              </View>
            </View>

            {/* Address */}
            <View className="flex-row items-start p-4 bg-[#F9FAFB] rounded-xl">
              <View className="bg-[#A78DF8] rounded-full p-2 mr-4 mt-1">
                <Ionicons name="location-outline" size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-[#4B5563] text-xs font-medium uppercase tracking-wide">
                  Address
                </Text>
                <Text className="text-[#1F2A37] text-base font-medium mt-1">
                  {user.alamat || "Not provided"}
                </Text>
              </View>
            </View>

            {/* NIK */}
            <View className="flex-row items-center p-4 bg-[#F9FAFB] rounded-xl">
              <View className="bg-[#A78DF8] rounded-full p-2 mr-4">
                <Ionicons name="card-outline" size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-[#4B5563] text-xs font-medium uppercase tracking-wide">
                  National ID (NIK)
                </Text>
                <Text className="text-[#1F2A37] text-base font-medium mt-1">
                  {user.nik || "Not provided"}
                </Text>
              </View>
            </View>

            {/* Email */}
            <View className="flex-row items-center p-4 bg-[#F9FAFB] rounded-xl">
              <View className="bg-[#A78DF8] rounded-full p-2 mr-4">
                <Ionicons name="mail-outline" size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-[#4B5563] text-xs font-medium uppercase tracking-wide">
                  Email Address
                </Text>
                <Text className="text-[#1F2A37] text-base font-medium mt-1">
                  {user.email}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Transaction History Section */}
        <View className="bg-white rounded-xl p-6 mt-6 shadow-sm">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <Text className="text-[#1F2A37] text-lg font-bold">
                Transaction History
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/transaction-history")}
            >
              <Text className="text-[#A78DF8] text-sm font-medium">
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {/* Recent Transactions */}
          <View className="space-y-3">
            {transactions.slice(0, 3).map((tx) => (
              <View key={tx.id} className="bg-[#F9FAFB] rounded-xl p-4">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1">
                    <Text className="text-[#1F2A37] text-base font-medium">
                      {tx.name}
                    </Text>
                    <Text className="text-[#6B7280] text-sm mt-1">
                      {tx.place}
                    </Text>
                    <Text className="text-[#6B7280] text-xs mt-1">
                      {tx.date} • {tx.time}
                    </Text>
                  </View>
                  <Text className="text-[#A78DF8] text-base font-bold">
                    Rp {tx.price.toLocaleString("id-ID")}
                  </Text>
                </View>
              </View>
            ))}
            {transactions.length === 0 && (
              <View className="items-center py-4">
                <Text className="text-[#9CA3AF] text-base">
                  No recent transactions
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* JKN Claim History Section */}
        <View className="bg-white rounded-xl p-6 mt-6 shadow-sm">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <Text className="text-[#1F2A37] text-lg font-bold">
                JKN Claim History
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/medchain")}>
              <View className="bg-[#A78DF8] rounded-full p-2">
                <Ionicons name="shield-outline" size={20} color="white" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Recent Claims */}
          <View className="space-y-3">
            {/* Claim Item 1 */}
            <View className="bg-[#F9FAFB] rounded-xl p-4">
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-1">
                  <Text className="text-[#1F2A37] text-base font-medium">
                    General Health Checkup
                  </Text>
                  <Text className="text-[#6B7280] text-sm mt-1">
                    RS Harapan Bunda
                  </Text>
                  <Text className="text-[#6B7280] text-xs mt-1">
                    Jan 15, 2024
                  </Text>
                </View>
                <View className="bg-green-100 px-2 py-1 rounded-full">
                  <Text className="text-green-800 text-xs font-medium">
                    Approved
                  </Text>
                </View>
              </View>
              <Text className="text-[#A78DF8] text-base font-bold">
                Rp 250,000
              </Text>
            </View>

            {/* Claim Item 2 */}
            <View className="bg-[#F9FAFB] rounded-xl p-4">
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-1">
                  <Text className="text-[#1F2A37] text-base font-medium">
                    Emergency Treatment
                  </Text>
                  <Text className="text-[#6B7280] text-sm mt-1">
                    RS Siloam Kebon Jeruk
                  </Text>
                  <Text className="text-[#6B7280] text-xs mt-1">
                    Jan 05, 2024
                  </Text>
                </View>
                <View className="bg-yellow-100 px-2 py-1 rounded-full">
                  <Text className="text-yellow-800 text-xs font-medium">
                    Processing
                  </Text>
                </View>
              </View>
              <Text className="text-[#A78DF8] text-base font-bold">
                Rp 850,000
              </Text>
            </View>

            {/* Claim Item 3 */}
            <View className="bg-[#F9FAFB] rounded-xl p-4">
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-1">
                  <Text className="text-[#1F2A37] text-base font-medium">
                    Specialist Consultation
                  </Text>
                  <Text className="text-[#6B7280] text-sm mt-1">
                    RS Pondok Indah
                  </Text>
                  <Text className="text-[#6B7280] text-xs mt-1">
                    Dec 28, 2023
                  </Text>
                </View>
                <View className="bg-green-100 px-2 py-1 rounded-full">
                  <Text className="text-green-800 text-xs font-medium">
                    Approved
                  </Text>
                </View>
              </View>
              <Text className="text-[#A78DF8] text-base font-bold">
                Rp 500,000
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
