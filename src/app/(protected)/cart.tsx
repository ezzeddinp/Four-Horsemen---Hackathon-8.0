import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useCart } from "@/providers/CartProvider";

const CartPage = () => {
  const [address, setAddress] = useState("Jalan Kosambi Baru\nBlok A1 No 1");
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
  } = useCart();

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F0EF]">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity onPress={() => router.back()} className="mr-6">
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text className="text-[#374151] text-xl font-semibold">
              My Cart ({cartItems.length})
            </Text>
            <TouchableOpacity
              onPress={() => clearCart()}
              disabled={cartItems.length === 0}
            >
              <MaterialIcons
                name="delete"
                size={24}
                color={cartItems.length === 0 ? "#CACACA" : "#EF4444"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Cart Items */}
        <View className="px-6">
          {cartItems.length === 0 ? (
            <View className="bg-white rounded-xl p-8 items-center">
              <MaterialIcons name="shopping-cart" size={80} color="#E5E7EB" />
              <Text className="text-[#6B7280] text-lg font-semibold mt-4 mb-2">
                Your cart is empty
              </Text>
              <Text className="text-[#9CA3AF] text-sm text-center mb-6">
                Browse our medicine and equipment to add items to your cart
              </Text>
              <TouchableOpacity
                className="bg-[#A78DF8] rounded-full py-3 px-6"
                onPress={() => router.push("/")}
              >
                <Text className="text-white text-sm font-semibold">
                  Start Shopping
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            cartItems.map((item) => (
              <View
                key={item.id}
                className="bg-white rounded-xl p-4 mb-4 flex-row items-center"
              >
                <Image
                  source={{ uri: item.image }}
                  className="w-[100px] h-[100px] rounded-lg"
                  resizeMode="cover"
                />
                <View className="flex-1 ml-4">
                  <Text className="text-[#1F2A37] text-base font-bold">
                    {item.name}
                  </Text>
                  <Text className="text-[#A78DF8] text-sm font-semibold mt-1">
                    {formatPrice(item.price)}
                  </Text>
                  <View className="flex-row items-center mt-2">
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, -1)}
                      className="bg-[#F3F4F6] p-2 rounded-full"
                    >
                      <Ionicons name="remove" size={16} color="#374151" />
                    </TouchableOpacity>
                    <Text className="mx-4 text-[#374151] font-semibold">
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, 1)}
                      className="bg-[#F3F4F6] p-2 rounded-full"
                    >
                      <Ionicons name="add" size={16} color="#374151" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => removeFromCart(item.id)}
                      className="ml-auto"
                    >
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color="#EF4444"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Delivery Address */}
        <View className="px-6 mt-4">
          <Text className="text-[#1F2A37] text-lg font-semibold mb-2">
            Delivery Address
          </Text>
          <View className="bg-white rounded-xl p-4">
            <TextInput
              className="text-[#374151] text-base"
              multiline
              numberOfLines={2}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter your delivery address"
            />
          </View>
        </View>

        {/* Total */}
        <View className="px-6 mt-6 mb-8">
          <View className="flex-row justify-between items-center">
            <Text className="text-[#1F2A37] text-lg font-semibold">
              Total Payment
            </Text>
            <Text className="text-[#A78DF8] text-lg font-bold">
              {formatPrice(getTotalPrice())}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View className="px-6 py-4 bg-[#F2F0EF] border-t border-[#E5E7EB]">
        <TouchableOpacity
          className={`rounded-full py-3 px-5 flex-row justify-center items-center ${
            cartItems.length === 0 ? "bg-gray-400" : "bg-[#A78DF8]"
          }`}
          disabled={cartItems.length === 0}
          onPress={() => {
            // Handle checkout functionality
            console.log("Processing checkout...");
            router.push("/success");
          }}
        >
          <Text className="text-white text-base font-bold">Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartPage;
