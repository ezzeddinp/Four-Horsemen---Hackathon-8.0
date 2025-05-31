import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTransactions } from "@/providers/TransactionProvider";

const formatPrice = (price: number) => `Rp ${price.toLocaleString("id-ID")}`;

export default function TransactionHistoryPage() {
  const { transactions } = useTransactions();

  return (
    <SafeAreaView className="flex-1 bg-[#F2F0EF]">
      {/* Header */}
      <View className="flex-row items-center px-6 pt-4 pb-6 bg-[#A78DF8] rounded-b-2xl">
        <TouchableOpacity onPress={() => router.back()} className="mr-6">
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-semibold flex-1">
          Transaction History
        </Text>
      </View>
      <ScrollView className="flex-1 px-6 mt-4">
        {transactions.map((tx) => (
          <View key={tx.id} className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <Text className="text-[#1F2A37] text-base font-medium">
                  {tx.name}
                </Text>
                <Text className="text-[#6B7280] text-sm mt-1">{tx.place}</Text>
                <Text className="text-[#6B7280] text-xs mt-1">
                  {tx.date} • {tx.time}
                </Text>
              </View>
              <Text className="text-[#A78DF8] text-base font-bold">
                {formatPrice(tx.price)}
              </Text>
            </View>
          </View>
        ))}
        {transactions.length === 0 && (
          <View className="items-center py-16">
            <Text className="text-[#9CA3AF] text-base">
              No transactions found.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
