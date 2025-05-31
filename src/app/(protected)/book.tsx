import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAppointments } from "@/providers/AppointmentProvider";
import BookingSuccessModal from "@/components/BookingSuccessModal";
import RescheduleSuccessModal from "@/components/RescheduleSuccessModal";

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfWeek = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const BookAppointment = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const { addAppointment, updateAppointment } = useAppointments();

  // Get parameters from navigation
  const params = useLocalSearchParams();
  const mode = params.mode as string; // "reschedule" or "rebook"
  const appointmentId = params.appointmentId
    ? parseInt(params.appointmentId as string)
    : null;
  const doctorFromParams = params.doctor as string;
  const specialtyFromParams = params.specialty as string;
  const locationFromParams = params.location as string;

  const timeSlots = [
    ["09:00 AM", "09:30 AM", "10:00 AM"],
    ["10:30 AM", "11:00 AM", "11:30 AM"],
    ["03:00 PM", "03:30 PM", "04:00 PM"],
    ["04:30 PM", "05:00 PM", "05:30 PM"],
  ];

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfWeek = getFirstDayOfWeek(currentMonth, currentYear);

  // Build calendar grid
  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null); // Empty slots before the 1st
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  const handlePrevMonth = () => {
    // Check if we're trying to go to a previous month/year than current
    const currentDate = new Date();
    const targetMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const targetYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Don't allow going to previous months/years
    if (
      targetYear < currentDate.getFullYear() ||
      (targetYear === currentDate.getFullYear() &&
        targetMonth < currentDate.getMonth())
    ) {
      return;
    }

    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Check if previous button should be disabled
  const isPrevDisabled = () => {
    const currentDate = new Date();
    const targetMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const targetYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    return (
      targetYear < currentDate.getFullYear() ||
      (targetYear === currentDate.getFullYear() &&
        targetMonth < currentDate.getMonth())
    );
  };

  const getDateString = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
  };

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) return;

    if (mode === "reschedule" && appointmentId) {
      // Update existing appointment
      updateAppointment(appointmentId, {
        date: formatDateForDisplay(selectedDate),
        time: selectedTime,
      });

      // Show reschedule success modal
      setShowRescheduleModal(true);
    } else {
      // Create new appointment (default booking or re-book)
      const doctor = doctorFromParams || "Dr. David Patel";
      const specialty = specialtyFromParams || "General Practice";
      const location = locationFromParams || "MedBay Clinic, USA";

      const newAppointment = {
        date: formatDateForDisplay(selectedDate),
        time: selectedTime,
        doctor: doctor,
        specialty: specialty,
        location: location,
        status: "upcoming" as const,
      };

      // Add to appointments
      addAppointment(newAppointment);

      // Show success modal
      setShowSuccessModal(true);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setShowRescheduleModal(false);
    // Navigate back to appointments tab
    router.push("/(protected)/(tabs)/appointment");
  };

  // Get header title based on mode
  const getHeaderTitle = () => {
    if (mode === "reschedule") return "Reschedule";
    if (mode === "rebook") return "Re-Book Appointment";
    return "Book Appointment";
  };

  // Get doctor name for display
  const getDoctorName = () => {
    return doctorFromParams || "Dr. David Patel";
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F0EF]">
      {/* Header */}
      <View className="px-6 pt-4 pb-6">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => router.back()} className="mr-6">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-[#374151] text-xl font-semibold">
            {getHeaderTitle()}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Date Selection */}
        <View className="px-6 mb-8">
          <Text className="text-[#1F2A37] text-xl font-semibold mb-4">
            Select Date
          </Text>
          <View className="bg-[#F9FAFB] rounded-xl p-4 shadow-sm">
            {/* Month Header */}
            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity
                onPress={handlePrevMonth}
                disabled={isPrevDisabled()}
                className={isPrevDisabled() ? "opacity-30" : ""}
              >
                <Ionicons
                  name="chevron-back"
                  size={20}
                  color={isPrevDisabled() ? "#9CA3AF" : "#374151"}
                />
              </TouchableOpacity>
              <Text className="text-[#111928] text-base font-bold">
                {monthNames[currentMonth]} {currentYear}
              </Text>
              <TouchableOpacity onPress={handleNextMonth}>
                <Ionicons name="chevron-forward" size={20} color="#374151" />
              </TouchableOpacity>
            </View>
            {/* Week Days */}
            <View className="flex-row justify-between mb-2">
              {weekDays.map((day) => (
                <View key={day} className="flex-1 items-center">
                  <Text className="text-[#4B5563] text-xs font-semibold">
                    {day}
                  </Text>
                </View>
              ))}
            </View>
            {/* Calendar Grid */}
            <View className="flex-row flex-wrap">
              {calendarDays.map((day, idx) => (
                <View key={idx} className="w-[14.28%] items-center mb-2">
                  {day ? (
                    <TouchableOpacity
                      className={`w-[36px] h-[36px] items-center justify-center ${
                        selectedDate === getDateString(day)
                          ? "bg-[#A78DF8] rounded-lg"
                          : ""
                      }`}
                      onPress={() => setSelectedDate(getDateString(day))}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          selectedDate === getDateString(day)
                            ? "text-white"
                            : "text-[#6B7280]"
                        }`}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View className="w-[36px] h-[36px]" />
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Time Selection */}
        <View className="px-6 mb-8">
          <Text className="text-[#1F2A37] text-xl font-semibold mb-4">
            Select Hour
          </Text>
          <View className="gap-3">
            {timeSlots.map((row, rowIndex) => (
              <View key={rowIndex} className="flex-row gap-3">
                {row.map((time) => (
                  <TouchableOpacity
                    key={time}
                    className={`flex-1 px-3.5 py-2.5 rounded-lg items-center justify-center ${
                      selectedTime === time ? "bg-[#A78DF8]" : "bg-[#F9FAFB]"
                    } shadow-sm`}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text
                      className={`text-sm font-semibold text-center ${
                        selectedTime === time ? "text-white" : "text-[#6B7280]"
                      }`}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View className="px-6 py-6 bg-[#F2F0EF] border-t border-[#E5E7EB]">
        <TouchableOpacity
          className={`rounded-full py-3 px-5 flex-row justify-center items-center ${
            selectedDate && selectedTime ? "bg-[#A78DF8]" : "bg-gray-400"
          }`}
          disabled={!selectedDate || !selectedTime}
          onPress={handleBooking}
        >
          <Text className="text-white text-base font-bold">Confirm</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      {selectedDate && selectedTime && (
        <BookingSuccessModal
          visible={showSuccessModal}
          onClose={handleModalClose}
          appointmentDetails={{
            doctor: getDoctorName(),
            date: formatDateForDisplay(selectedDate),
            time: selectedTime,
          }}
        />
      )}

      {/* Reschedule Success Modal */}
      {selectedDate && selectedTime && (
        <RescheduleSuccessModal
          visible={showRescheduleModal}
          onClose={handleModalClose}
          appointmentDetails={{
            doctor: getDoctorName(),
            date: formatDateForDisplay(selectedDate),
            time: selectedTime,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default BookAppointment;
