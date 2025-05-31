import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useCart } from "@/providers/CartProvider";
import { useTransactions } from "@/providers/TransactionProvider";
import { router } from "expo-router";

const TABS = ["Card", "Bank Transfer", "E-Wallet"];

const PaymentMethodPage = () => {
  const [activeTab, setActiveTab] = useState("Card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [eWallet, setEWallet] = useState("");
  const [address, setAddress] = useState("Jalan Kosambi Baru\nBlok A1 No 1");
  const [showSuccess, setShowSuccess] = useState(false);
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { addTransaction } = useTransactions();

  const formatPrice = (price: number) => `Rp ${price.toLocaleString("id-ID")}`;

  const handlePay = () => {
    // Record each item in the cart as a separate transaction
    cartItems.forEach((item) => {
      addTransaction({
        name: item.name,
        place: "MedAI Store",
        price: item.price * item.quantity,
      });
    });

    // Clear cart and show success
    clearCart();
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    router.push("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F0EF]">
      {/* Header */}
      <View className="px-6 pt-4 pb-6">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => router.back()} className="mr-6">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-[#374151] text-xl font-semibold flex-1">
            Payment
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row justify-between px-6 mb-4">
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`flex-1 py-3 mx-1 rounded-full ${
              activeTab === tab
                ? "bg-[#A78DF8]"
                : "bg-white border border-[#E5E7EB]"
            }`}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === tab ? "text-white" : "text-[#A78DF8]"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Payment Method Form */}
        {activeTab === "Card" && (
          <View className="bg-white rounded-xl p-4 mb-6">
            <Text className="text-[#1F2A37] text-lg font-semibold mb-4">
              Card Details
            </Text>
            <TextInput
              className="bg-[#F3F4F6] rounded-lg px-4 py-3 mb-3 text-base"
              placeholder="Card Number"
              keyboardType="number-pad"
              value={cardNumber}
              onChangeText={setCardNumber}
              maxLength={19}
            />
            <View className="flex-row gap-3 mb-3">
              <TextInput
                className="flex-1 bg-[#F3F4F6] rounded-lg px-4 py-3 text-base"
                placeholder="MM/YY"
                value={expiry}
                onChangeText={setExpiry}
                maxLength={5}
              />
              <TextInput
                className="flex-1 bg-[#F3F4F6] rounded-lg px-4 py-3 text-base"
                placeholder="CVC"
                value={cvc}
                onChangeText={setCvc}
                maxLength={4}
                keyboardType="number-pad"
              />
            </View>
            <Text className="text-xs text-[#9CA3AF] mt-2">
              By providing your card information, you allow us to charge your
              card for future payments in accordance with their terms.
            </Text>
          </View>
        )}
        {activeTab === "Bank Transfer" && (
          <View className="bg-white rounded-xl p-4 mb-6">
            <Text className="text-[#1F2A37] text-lg font-semibold mb-4">
              Bank Transfer
            </Text>
            <TextInput
              className="bg-[#F3F4F6] rounded-lg px-4 py-3 mb-3 text-base"
              placeholder="Bank Name"
              value={bankName}
              onChangeText={setBankName}
            />
            <TextInput
              className="bg-[#F3F4F6] rounded-lg px-4 py-3 text-base"
              placeholder="Account Number"
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="number-pad"
            />
          </View>
        )}
        {activeTab === "E-Wallet" && (
          <View className="bg-white rounded-xl p-4 mb-6">
            <Text className="text-[#1F2A37] text-lg font-semibold mb-4">
              E-Wallet
            </Text>
            <TextInput
              className="bg-[#F3F4F6] rounded-lg px-4 py-3 text-base"
              placeholder="E-Wallet Name (e.g. OVO, GoPay)"
              value={eWallet}
              onChangeText={setEWallet}
            />
            <TextInput
              className="bg-[#F3F4F6] rounded-lg px-4 py-3 text-base mt-3"
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />
          </View>
        )}

        {/* Address */}
        <View className="bg-white rounded-xl p-4 mb-6">
          <Text className="text-[#1F2A37] text-lg font-semibold mb-2">
            Delivery Address
          </Text>
          <TextInput
            className="text-[#374151] text-base bg-[#F3F4F6] rounded-lg px-4 py-3"
            multiline
            numberOfLines={2}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your delivery address"
          />
        </View>

        {/* Order Summary */}
        <View className="bg-white rounded-xl p-4 mb-6">
          <Text className="text-[#1F2A37] text-lg font-semibold mb-2">
            Order Summary
          </Text>
          {cartItems.map((item) => (
            <View
              key={item.id}
              className="flex-row justify-between items-center mb-2"
            >
              <Text
                className="text-[#4B5563] text-base flex-1"
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text className="text-[#A78DF8] text-base font-semibold ml-2">
                {formatPrice(item.price * item.quantity)}
              </Text>
            </View>
          ))}
          <View className="h-[1px] bg-[#E5E7EB] my-2" />
          <View className="flex-row justify-between items-center">
            <Text className="text-[#1F2A37] text-lg font-semibold">Total</Text>
            <Text className="text-[#A78DF8] text-lg font-bold">
              {formatPrice(getTotalPrice())}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View className="px-6 py-4 bg-[#F2F0EF] border-t border-[#E5E7EB]">
        <TouchableOpacity
          className={`rounded-full py-3 px-5 flex-row justify-center items-center ${
            cartItems.length === 0 ? "bg-gray-400" : "bg-[#A78DF8]"
          }`}
          disabled={cartItems.length === 0}
          onPress={handlePay}
        >
          <Text className="text-white text-base font-bold">Pay</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Success Modal */}
      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        onRequestClose={handleCloseSuccess}
      >
        <View className="flex-1 justify-center items-center bg-black/40">
          <View className="bg-white rounded-xl p-8 w-80 items-center">
            <Ionicons
              name="checkmark-circle"
              size={64}
              color="#22C55E"
              className="mb-4"
            />
            <Text className="text-2xl font-bold text-[#22C55E] mb-4">
              Payment Successful!
            </Text>
            <Text className="text-[#374151] text-base text-center mb-6">
              Your payment has been processed successfully.
            </Text>
            <TouchableOpacity
              className="bg-[#A78DF8] rounded-full px-8 py-3"
              onPress={handleCloseSuccess}
            >
              <Text className="text-white text-base font-bold">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PaymentMethodPage;
