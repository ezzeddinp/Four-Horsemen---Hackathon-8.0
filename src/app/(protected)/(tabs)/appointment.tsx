import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  useAppointments,
  AppointmentStatus,
} from "@/providers/AppointmentProvider";

export default function AppointmentScreen() {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelId, setCancelId] = useState<number | null>(null);
  const { cancelAppointment } = useAppointments();

  // Hardcoded upcoming appointments - simple and reliable
  const upcomingAppointments = [
    {
      id: 1,
      date: "June 10, 2025",
      time: "09:00 AM",
      doctor: "Dr. Alice Brown",
      specialty: "Neurology",
      location: "Neuro Clinic, USA",
      status: "upcoming" as AppointmentStatus,
    },
    {
      id: 2,
      date: "July 5, 2025",
      time: "11:00 AM",
      doctor: "Dr. Mark Lee",
      specialty: "Orthopedics",
      location: "Ortho Center, USA",
      status: "upcoming" as AppointmentStatus,
    },
    {
      id: 3,
      date: "August 15, 2025",
      time: "02:30 PM",
      doctor: "Dr. Jane Smith",
      specialty: "ENT",
      location: "Ear Nose Throat Clinic, USA",
      status: "upcoming" as AppointmentStatus,
    },
    {
      id: 4,
      date: "September 20, 2025",
      time: "10:15 AM",
      doctor: "Dr. Michael Chen",
      specialty: "Cardiology",
      location: "Heart Care Center, USA",
      status: "upcoming" as AppointmentStatus,
    },
  ];

  // Dummy completed appointments (most recent first)
  const dummyCompletedAppointments = [
    {
      id: 1003,
      date: "June 5, 2024",
      time: "02:00 PM",
      doctor: "Dr. Emily Chen",
      specialty: "Pediatrics",
      location: "Children's Hospital, USA",
      status: "completed" as AppointmentStatus,
    },
    {
      id: 1002,
      date: "June 3, 2024",
      time: "11:30 AM",
      doctor: "Dr. John Smith",
      specialty: "Cardiology",
      location: "Heart Center, USA",
      status: "completed" as AppointmentStatus,
    },
    {
      id: 1001,
      date: "June 1, 2024",
      time: "09:00 AM",
      doctor: "Dr. Sarah Lee",
      specialty: "Dermatology",
      location: "SkinCare Clinic, USA",
      status: "completed" as AppointmentStatus,
    },
  ];

  // Dummy canceled appointments (most recent first)
  const dummyCanceledAppointments = [
    {
      id: 2003,
      date: "May 25, 2025",
      time: "03:00 PM",
      doctor: "Dr. Robert Wilson",
      specialty: "Ophthalmology",
      location: "Eye Care Center, USA",
      status: "canceled" as AppointmentStatus,
    },
    {
      id: 2002,
      date: "May 18, 2025",
      time: "10:30 AM",
      doctor: "Dr. Lisa Martinez",
      specialty: "Gastroenterology",
      location: "Digestive Health Clinic, USA",
      status: "canceled" as AppointmentStatus,
    },
    {
      id: 2001,
      date: "May 10, 2025",
      time: "01:45 PM",
      doctor: "Dr. David Thompson",
      specialty: "Urology",
      location: "Urological Associates, USA",
      status: "canceled" as AppointmentStatus,
    },
  ];

  // Function to cancel an appointment (with confirmation)
  const handleCancelAppointment = (appointmentId: number) => {
    setCancelId(appointmentId);
    setShowCancelModal(true);
  };
  const confirmCancelAppointment = () => {
    if (cancelId !== null) {
      cancelAppointment(cancelId);
      setActiveTab("Canceled");
    }
    setShowCancelModal(false);
    setCancelId(null);
  };
  const cancelModalClose = () => {
    setShowCancelModal(false);
    setCancelId(null);
  };

  // Function to reschedule an appointment
  const handleRescheduleAppointment = (
    appointmentId: number,
    doctor: string,
    specialty: string,
    location: string
  ) => {
    // Navigate to booking page with reschedule mode
    router.push({
      pathname: "/(protected)/book",
      params: {
        mode: "reschedule",
        appointmentId: appointmentId,
        doctor: doctor,
        specialty: specialty,
        location: location,
      },
    });
  };

  // Function to re-book from completed appointments
  const handleReBook = (
    appointmentId: number,
    doctor: string,
    specialty: string,
    location: string
  ) => {
    // Navigate to booking page with re-book mode
    router.push({
      pathname: "/(protected)/book",
      params: {
        mode: "rebook",
        doctor: doctor,
        specialty: specialty,
        location: location,
      },
    });
  };

  // Filter appointments based on active tab - simplified approach
  const getFilteredAppointments = () => {
    switch (activeTab) {
      case "Upcoming":
        // Return hardcoded upcoming appointments (already in chronological order)
        return upcomingAppointments;
      case "Completed":
        // Return hardcoded completed appointments (most recent first)
        return dummyCompletedAppointments;
      case "Canceled":
        // Return hardcoded canceled appointments (most recent first)
        return dummyCanceledAppointments;
      default:
        return [];
    }
  };

  // Uniform card component
  const AppointmentCard = ({
    id,
    date,
    time,
    doctor,
    specialty,
    location,
    status,
  }: {
    id: number;
    date: string;
    time: string;
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
      <Text className="text-[#1F2A37] text-sm font-bold mb-3">
        {date} - {time}
      </Text>
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
            onPress={() =>
              handleRescheduleAppointment(id, doctor, specialty, location)
            }
          >
            <Text className="text-white text-sm font-bold text-center">
              Reschedule
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Show buttons for completed appointments: Re-Book left, Add Review right */}
      {status === "completed" && (
        <View className="flex-row gap-3">
          <TouchableOpacity
            className="flex-1 bg-[#F3F4F6] py-3 px-4 rounded-full"
            onPress={() => handleReBook(id, doctor, specialty, location)}
          >
            <Text className="text-[#1C2A3A] text-sm font-bold text-center">
              Re-Book
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-[#A78DF8] py-3 px-4 rounded-full"
            onPress={() =>
              router.push({
                pathname: "/(protected)/review",
                params: {
                  doctor,
                  specialty,
                  location,
                },
              })
            }
          >
            <Text className="text-white text-sm font-bold text-center">
              Add Review
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Show status for canceled appointments */}
      {status === "canceled" && (
        <View className="bg-[#FEE2E2] py-3 px-4 rounded-full">
          <Text className="text-[#DC2626] text-sm font-bold text-center">
            Canceled
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F2F0EF]">
      <View className="flex-1">
        {/* Cancel Confirmation Modal */}
        <Modal
          visible={showCancelModal}
          transparent
          animationType="fade"
          onRequestClose={cancelModalClose}
        >
          <View className="flex-1 justify-center items-center bg-black/40">
            <View className="bg-white rounded-xl p-6 w-80 items-center">
              <Text className="text-lg font-semibold mb-4 text-[#1C2A3A]">
                Are you sure?
              </Text>
              <Text className="text-[#6B7280] mb-6 text-center">
                Do you really want to cancel this appointment?
              </Text>
              <View className="flex-row gap-4 w-full">
                <TouchableOpacity
                  className="flex-1 bg-[#F3F4F6] py-3 px-4 rounded-full"
                  onPress={cancelModalClose}
                >
                  <Text className="text-[#1C2A3A] text-sm font-bold text-center">
                    No
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 bg-[#A78DF8] py-3 px-4 rounded-full"
                  onPress={confirmCancelAppointment}
                >
                  <Text className="text-white text-sm font-bold text-center">
                    Yes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
                time={appointment.time}
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
