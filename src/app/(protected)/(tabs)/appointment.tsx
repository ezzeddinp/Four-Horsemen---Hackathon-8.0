import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

type AppointmentStatus = "upcoming" | "completed" | "canceled";

interface Appointment {
  id: number;
  date: string;
  doctor: string;
  specialty: string;
  location: string;
  status: AppointmentStatus;
}

export default function AppointmentScreen() {
  const [activeTab, setActiveTab] = useState("Upcoming");

  // Initial appointments data
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      date: "May 22, 2023 - 10.00 AM",
      doctor: "Dr. James Robinson",
      specialty: "Orthopedic Surgery",
      location: "Elite Ortho Clinic, USA",
      status: "upcoming",
    },
    {
      id: 2,
      date: "June 14, 2023 - 15.00 PM",
      doctor: "Dr. Daniel Lee",
      specialty: "Gastroenterologist",
      location: "Digestive Institute, USA",
      status: "upcoming",
    },
    {
      id: 3,
      date: "June 21, 2023 - 10.00 AM",
      doctor: "Dr. Nathan Harris",
      specialty: "Cardiologist",
      location: "Cardiology Center, USA",
      status: "upcoming",
    },
  ]);

  // Function to cancel an appointment
  const handleCancelAppointment = (appointmentId: number) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: "canceled" as AppointmentStatus }
          : appointment
      )
    );
    // Automatically switch to Canceled tab to show the result
    setActiveTab("Canceled");
  };

  // Function to reschedule an appointment (placeholder for now)
  const handleRescheduleAppointment = (appointmentId: number) => {
    // For now, just show an alert or add your reschedule logic here
    console.log("Reschedule appointment:", appointmentId);
  };

  // Filter appointments based on active tab
  const getFilteredAppointments = () => {
    switch (activeTab) {
      case "Upcoming":
        return appointments.filter((apt) => apt.status === "upcoming");
      case "Completed":
        return appointments.filter((apt) => apt.status === "completed");
      case "Canceled":
        return appointments.filter((apt) => apt.status === "canceled");
      default:
        return [];
    }
  };

  // Uniform card component
  const AppointmentCard = ({
    id,
    date,
    doctor,
    specialty,
    location,
    status,
  }: {
    id: number;
    date: string;
    doctor: string;
    specialty: string;
    location: string;
    status: AppointmentStatus;
  }) => (
    <View
      className="bg-white p-4 rounded-xl mb-4 border border-[#E5E7EB]"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text className="text-[#1F2A37] text-sm font-bold mb-3">{date}</Text>
      <View className="h-[1px] bg-[#E5E7EB] mb-3" />

      <View className="flex-row items-center mb-3">
        <Image
          source={require("assets/Profile_avatar_placeholder_large.png")}
          className="w-[80px] h-[80px] rounded-xl"
        />
        <View className="ml-3 flex-1">
          <Text className="text-[#1F2A37] text-base font-bold mb-1">
            {doctor}
          </Text>
          <Text className="text-[#4B5563] text-sm font-semibold mb-1">
            {specialty}
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="location" size={14} color="#4B5563" />
            <Text className="text-[#4B5563] text-sm ml-1">{location}</Text>
          </View>
        </View>
      </View>

      <View className="h-[1px] bg-[#E5E7EB] mb-3" />

      {/* Show buttons only for upcoming appointments */}
      {status === "upcoming" && (
        <View className="flex-row gap-3">
          <TouchableOpacity
            className="flex-1 bg-[#F3F4F6] py-3 px-4 rounded-full"
            onPress={() => handleCancelAppointment(id)}
          >
            <Text className="text-[#1C2A3A] text-sm font-bold text-center">
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-[#A78DF8] py-3 px-4 rounded-full"
            onPress={() => handleRescheduleAppointment(id)}
          >
            <Text className="text-white text-sm font-bold text-center">
              Reschedule
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Show status for canceled/completed appointments */}
      {status === "canceled" && (
        <View className="bg-[#FEE2E2] py-3 px-4 rounded-full">
          <Text className="text-[#DC2626] text-sm font-bold text-center">
            Canceled
          </Text>
        </View>
      )}

      {status === "completed" && (
        <View className="bg-[#D1FAE5] py-3 px-4 rounded-full">
          <Text className="text-[#059669] text-sm font-bold text-center">
            Completed
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F2F0EF]">
      <View className="flex-1">
        {/* Content Section */}
        <View className="mt-[59px] px-6">
          {/* Title */}
          <View className="items-center">
            <Text className="text-[#374151] text-xl font-semibold">
              My Appointments
            </Text>
          </View>

          {/* Tabs */}
          <View className="mt-6">
            <View className="flex-row justify-center">
              <TouchableOpacity
                className="flex-1 pb-3"
                onPress={() => setActiveTab("Upcoming")}
              >
                <Text
                  className={`text-base font-semibold text-center ${
                    activeTab === "Upcoming"
                      ? "text-[#1C2A3A]"
                      : "text-[#9CA3AF]"
                  }`}
                >
                  Upcoming
                </Text>
                {activeTab === "Upcoming" && (
                  <View className="h-[2px] bg-[#1C2A3A] rounded-full mt-2" />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 pb-3"
                onPress={() => setActiveTab("Completed")}
              >
                <Text
                  className={`text-base font-semibold text-center ${
                    activeTab === "Completed"
                      ? "text-[#1C2A3A]"
                      : "text-[#9CA3AF]"
                  }`}
                >
                  Completed
                </Text>
                {activeTab === "Completed" && (
                  <View className="h-[2px] bg-[#1C2A3A] rounded-full mt-2" />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 pb-3"
                onPress={() => setActiveTab("Canceled")}
              >
                <Text
                  className={`text-base font-semibold text-center ${
                    activeTab === "Canceled"
                      ? "text-[#1C2A3A]"
                      : "text-[#9CA3AF]"
                  }`}
                >
                  Canceled
                </Text>
                {activeTab === "Canceled" && (
                  <View className="h-[2px] bg-[#1C2A3A] rounded-full mt-2" />
                )}
              </TouchableOpacity>
            </View>
            <View className="h-[1px] bg-[#E5E7EB]" />
          </View>

          {/* Appointment Cards */}
          <ScrollView
            className="mt-6"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {getFilteredAppointments().map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                id={appointment.id}
                date={appointment.date}
                doctor={appointment.doctor}
                specialty={appointment.specialty}
                location={appointment.location}
                status={appointment.status}
              />
            ))}
            {getFilteredAppointments().length === 0 && (
              <View className="items-center py-8">
                <Text className="text-[#9CA3AF] text-base">
                  No {activeTab.toLowerCase()} appointments
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
