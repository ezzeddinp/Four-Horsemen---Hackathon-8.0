import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface BlockchainRecord {
  id: string;
  transactionHash: string;
  timestamp: string;
  type: "claim" | "payment" | "prescription";
  description: string;
  amount?: number;
  status: "verified" | "pending" | "rejected";
}

const MedChainScreen = () => {
  // Mock blockchain data
  const blockchainRecords: BlockchainRecord[] = [
    {
      id: "1",
      transactionHash: "0x8b7e9c2a1f3d4e5b6c7a8d9e0f1a2b3c4d5e6f7a8b9c",
      timestamp: "2024-01-15T10:30:00Z",
      type: "claim",
      description: "JKN Medical Claim - General Checkup",
      amount: 250000,
      status: "verified",
    },
    {
      id: "2",
      transactionHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
      timestamp: "2024-01-10T14:15:00Z",
      type: "payment",
      description: "Medicine Purchase - Paracetamol 500mg",
      amount: 15000,
      status: "verified",
    },
    {
      id: "3",
      transactionHash: "0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c",
      timestamp: "2024-01-08T09:45:00Z",
      type: "prescription",
      description: "Digital Prescription from Dr. Sarah Wilson",
      status: "verified",
    },
    {
      id: "4",
      transactionHash: "0x4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f",
      timestamp: "2024-01-05T16:20:00Z",
      type: "claim",
      description: "JKN Emergency Treatment Claim",
      amount: 850000,
      status: "pending",
    },
  ];

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "claim":
        return (
          <MaterialCommunityIcons
            name="shield-check"
            size={20}
            color="#A78DF8"
          />
        );
      case "payment":
        return <Ionicons name="card" size={20} color="#10B981" />;
      case "prescription":
        return <Ionicons name="document-text" size={20} color="#F59E0B" />;
      default:
        return <Ionicons name="cube" size={20} color="#6B7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "verified":
        return "Verified";
      case "pending":
        return "Pending";
      case "rejected":
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F0EF]">
      {/* Header */}
      <View className="bg-[#A78DF8] rounded-b-[20px] px-6 pt-4 pb-6">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-white text-xl font-bold">MedChain</Text>
            <Text className="text-white/80 text-sm">
              Blockchain Health Records
            </Text>
          </View>
          <View className="w-6" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Blockchain Info Card */}
        <View className="bg-white rounded-xl p-6 mt-6 shadow-sm">
          <View className="flex-row items-center mb-4">
            <View className="bg-[#A78DF8] rounded-full p-3 mr-4">
              <MaterialCommunityIcons
                name="cube-outline"
                size={24}
                color="white"
              />
            </View>
            <View className="flex-1">
              <Text className="text-[#1F2A37] text-lg font-bold">
                Secure Health Records
              </Text>
              <Text className="text-[#4B5563] text-sm">
                Your medical data secured on blockchain
              </Text>
            </View>
          </View>

          <View className="bg-[#F9FAFB] rounded-lg p-4">
            <Text className="text-[#6B7280] text-xs font-medium mb-2">
              BLOCKCHAIN BENEFITS
            </Text>
            <View className="space-y-2">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="shield-check"
                  size={16}
                  color="#10B981"
                />
                <Text className="text-[#374151] text-sm ml-2">
                  Tamper-proof records
                </Text>
              </View>
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="eye-off"
                  size={16}
                  color="#10B981"
                />
                <Text className="text-[#374151] text-sm ml-2">
                  Complete privacy control
                </Text>
              </View>
              <View className="flex-row items-center">
                <MaterialCommunityIcons name="sync" size={16} color="#10B981" />
                <Text className="text-[#374151] text-sm ml-2">
                  Real-time verification
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="mt-6 mb-8">
          <Text className="text-[#1F2A37] text-lg font-bold mb-4">
            Recent Blockchain Records
          </Text>

          <View className="space-y-3">
            {blockchainRecords.map((record) => (
              <View
                key={record.id}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-row items-center flex-1">
                    {getTypeIcon(record.type)}
                    <View className="ml-3 flex-1">
                      <Text
                        className="text-[#1F2A37] text-base font-medium"
                        numberOfLines={2}
                      >
                        {record.description}
                      </Text>
                      <Text className="text-[#6B7280] text-xs mt-1">
                        {formatDate(record.timestamp)}
                      </Text>
                    </View>
                  </View>
                  <View
                    className={`px-2 py-1 rounded-full ${getStatusColor(
                      record.status
                    )}`}
                  >
                    <Text className="text-xs font-medium">
                      {getStatusText(record.status)}
                    </Text>
                  </View>
                </View>

                {record.amount && (
                  <View className="mb-3">
                    <Text className="text-[#A78DF8] text-lg font-bold">
                      {formatPrice(record.amount)}
                    </Text>
                  </View>
                )}

                {/* Transaction Hash */}
                <View className="bg-[#F9FAFB] rounded-lg p-3">
                  <Text className="text-[#6B7280] text-xs font-medium mb-1">
                    TRANSACTION HASH
                  </Text>
                  <Text
                    className="text-[#374151] text-xs font-mono"
                    numberOfLines={1}
                  >
                    {record.transactionHash}
                  </Text>
                </View>

                {/* Verify Button */}
                <TouchableOpacity className="mt-3 bg-[#A78DF8] rounded-lg py-2 px-4 flex-row items-center justify-center">
                  <MaterialCommunityIcons
                    name="magnify"
                    size={16}
                    color="white"
                  />
                  <Text className="text-white text-sm font-medium ml-2">
                    Verify on Blockchain
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MedChainScreen;
