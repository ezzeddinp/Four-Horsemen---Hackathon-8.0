// app/doctor/[id].tsx
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAppKnowledge } from "@/providers/AppKnowledgeProvider";

interface Doctor {
  id: string;
  nama_dokter: string;
  keahlian: string;
  sertifikat: string;
  id_rumah_sakit: string;
  avatar_url?: string;
  jadwal: string;
  bio?: string;
  pengalaman?: number;
  rating?: number;
  distance?: string;
}

export default function DoctorDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { markVisited } = useAppKnowledge();

  const fetchDoctor = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("dokter")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw new Error(fetchError.message);

      const enhancedDoctor = {
        ...data,
        rating: 5.0, // Placeholder, adjust based on reviews
        distance: "1 km Away", // Placeholder, adjust based on geolocation
      };
      setDoctor(enhancedDoctor);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch doctor details"
      );
      console.error("❌ Error fetching doctor:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center">
        <ActivityIndicator size="large" color="#A78DF8" />
      </View>
    );
  }

  if (error || !doctor) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center">
        <Text className="text-red-500 text-lg">
          {error || "Doctor not found"}
        </Text>
        <TouchableOpacity
          className="mt-4 bg-[#A78DF8] px-4 py-2 rounded-lg"
          onPress={fetchDoctor}
        >
          <Text className="text-white text-base">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 mt-20">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Doctor Card */}
      <View className="bg-white mx-4 mt-4 p-6 rounded-2xl shadow-md">
        <Image
          source={{
            uri: doctor.avatar_url || "https://via.placeholder.com/100",
          }}
          className="w-32 h-32 rounded-full self-center -mt-20 bg-gray-200 border-4 border-white"
        />
        <View className="items-center mt-4">
          <Text className="text-black text-2xl font-bold">
            {doctor.nama_dokter}
          </Text>
          <Text className="text-gray-500 text-lg mt-1">{doctor.keahlian}</Text>
          <Text className="text-indigo-500 text-base mt-1">
            @{doctor.id_rumah_sakit || "Golden Cardiology Center"}
          </Text>
        </View>

        {/* Stats */}
        <View className="flex-row justify-around mt-8">
          <View className="items-center">
            <FontAwesome6 name="users" size={24} color="#A78DF8" />
            <Text className="text-gray-500 text-base mt-1">2,000+</Text>
            <Text className="text-gray-500 text-sm">patients</Text>
          </View>
          <View className="items-center">
            <FontAwesome6 name="award" size={24} color="#A78DF8" />
            <Text className="text-gray-500 text-base mt-1">10+ years</Text>
            <Text className="text-gray-500 text-sm">experience</Text>
          </View>
          <View className="items-center">
            <FontAwesome6 name="star" size={24} color="#A78DF8" />
            <Text className="text-gray-500 text-base mt-1">5</Text>
            <Text className="text-gray-500 text-sm">rating</Text>
          </View>
          <View className="items-center">
            <FontAwesome6 name="comments" size={24} color="#A78DF8" />
            <Text className="text-gray-500 text-base mt-1">1,872</Text>
            <Text className="text-gray-500 text-sm">reviews</Text>
          </View>
        </View>

        {/* About Me */}
        <View className="mt-8">
          <Text className="text-black text-xl font-bold">About me</Text>
          <Text className="text-gray-600 text-base mt-3 leading-6">
            {doctor.bio ||
              "Dr. David Patel, a dedicated cardiologist, brings a wealth of experience to Golden Gate Cardiology Center in Golden Gate, CA. With over a decade of practice, Dr. Patel specializes in preventive cardiology, heart disease management, and advanced cardiac procedures. His patient-centered approach and commitment to staying at the forefront of cardiac care make him a trusted healthcare provider in the community."}
          </Text>
        </View>

        {/* Working Time */}
        <View className="mt-8">
          <Text className="text-black text-xl font-bold">Working Time</Text>
          <View className="bg-gray-50 p-4 rounded-xl mt-3">
            <Text className="text-gray-600 text-base">09:00 AM - 17:30 PM</Text>
          </View>
        </View>

        {/* Certification */}
        <View className="mt-8">
          <View className="flex-row justify-between items-center">
            <Text className="text-black text-xl font-bold">Certification</Text>
            <TouchableOpacity>
              <Text className="text-indigo-500 text-base">See All</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-gray-50 p-4 rounded-xl mt-3">
            <Text className="text-gray-600 text-base leading-6">
              {doctor.sertifikat ||
                "This doctor is licensed and board-certified by the American Board of Medical Specialties. Verified qualifications and professional standing ensure high-quality and trustworthy care. Additional certifications include Advanced Cardiac Life Support (ACLS) and Basic Life Support (BLS)."}
            </Text>
          </View>
        </View>

        {/* Book Now Button */}
        <TouchableOpacity
          className="bg-[#A78DF8] mt-8 py-4 rounded-full"
          onPress={() => router.push("/book")}
        >
          <Text className="text-white text-lg font-semibold text-center">
            Book Now
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Padding */}
      <View className="h-20" />
    </ScrollView>
  );
}

// Define navigation options
DoctorDetail.options = {
  headerBackButtonDisplayMode: "minimal",
};
