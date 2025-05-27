import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { supabase } from "@/lib/supabase";

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity onPress={() => supabase.auth.signOut()}>

      <Text
        
        className="text-2xl font-bold text-white"
        >
        Sign Out
      </Text>
        </TouchableOpacity>
    </View>
  );
}
