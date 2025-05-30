import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { supabase } from "@/lib/supabase";

export default function NotificationScreen() {
  return (
    <TouchableOpacity
      onPress={() => supabase.auth.signOut()}
      className="py-3 px-6 rounded-lg bg-red-600"
    >
      <Text className="text-white font-semibold">Keluar</Text>
    </TouchableOpacity>
  );
}
