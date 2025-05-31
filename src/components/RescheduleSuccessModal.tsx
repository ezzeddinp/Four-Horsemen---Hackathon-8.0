import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RescheduleSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  appointmentDetails: {
    doctor: string;
    date: string;
    time: string;
  };
}

const RescheduleSuccessModal: React.FC<RescheduleSuccessModalProps> = ({
  visible,
  onClose,
  appointmentDetails,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <View className="flex-1 bg-black/50 justify-center items-center px-6">
        {/* Modal Content */}
        <View className="bg-[#F2F0EF] rounded-[48px] w-full max-w-sm px-12 py-8 gap-8 items-center overflow-hidden">
          {/* Reschedule Icon */}
          <View className="w-[131px] h-[131px] relative">
            <View className="absolute top-0 left-0 w-[131px] h-[131px] bg-[#FEB052] rounded-full items-center justify-center overflow-hidden">
              <Ionicons name="calendar" size={60} color="white" />
            </View>
          </View>

          {/* Text Content */}
          <View className="gap-2 items-center">
            <Text className="text-[#1C2A3A] text-xl font-semibold text-left">
              Rescheduled
            </Text>
            <Text className="text-[#6B7280] text-sm text-center leading-[21px] max-w-[252px]">
              Your appointment with {appointmentDetails.doctor} has been
              rescheduled to {appointmentDetails.date}, at{" "}
              {appointmentDetails.time}.
            </Text>
          </View>

          {/* Done Button */}
          <View className="w-full items-center">
            <TouchableOpacity
              className="bg-[#A78DF8] rounded-full h-12 flex-row justify-center items-center px-5 py-3 w-full"
              onPress={onClose}
            >
              <Text className="text-white text-base font-medium">Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RescheduleSuccessModal;
