import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type AppointmentStatus = "upcoming" | "completed" | "canceled";

export interface Appointment {
  id: number;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  location: string;
  status: AppointmentStatus;
  createdAt: string;
}

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, "id" | "createdAt">) => void;
  updateAppointment: (
    appointmentId: number,
    updates: Partial<Pick<Appointment, "date" | "time">>
  ) => void;
  cancelAppointment: (appointmentId: number) => void;
  completeAppointment: (appointmentId: number) => void;
  getUpcomingAppointments: () => Appointment[];
  getCompletedAppointments: () => Appointment[];
  getCanceledAppointments: () => Appointment[];
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined
);

const APPOINTMENTS_STORAGE_KEY = "@healthcare_appointments";

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      date: "September 22, 2025",
      time: "10:00 AM",
      doctor: "Dr. James Robinson",
      specialty: "Orthopedic Surgery",
      location: "Elite Ortho Clinic, USA",
      status: "upcoming",
      createdAt: "2025-06-01T10:00:00Z",
    },
    {
      id: 2,
      date: "October 14, 2025",
      time: "3:00 PM",
      doctor: "Dr. Daniel Lee",
      specialty: "Gastroenterologist",
      location: "Digestive Institute, USA",
      status: "upcoming",
      createdAt: "2025-06-01T10:00:00Z",
    },
    {
      id: 3,
      date: "November 21, 2025",
      time: "10:00 AM",
      doctor: "Dr. Nathan Harris",
      specialty: "Cardiologist",
      location: "Cardiology Center, USA",
      status: "upcoming",
      createdAt: "2025-06-01T10:00:00Z",
    },
  ]);

  // Load appointments from AsyncStorage on app start
  useEffect(() => {
    loadAppointmentsFromStorage();
  }, []);

  // Save appointments to AsyncStorage whenever appointments change
  useEffect(() => {
    saveAppointmentsToStorage();
  }, [appointments]);

  const loadAppointmentsFromStorage = async () => {
    try {
      const savedAppointments = await AsyncStorage.getItem(
        APPOINTMENTS_STORAGE_KEY
      );
      if (savedAppointments) {
        setAppointments(JSON.parse(savedAppointments));
      }
    } catch (error) {
      console.error("Error loading appointments from storage:", error);
    }
  };

  const saveAppointmentsToStorage = async () => {
    try {
      await AsyncStorage.setItem(
        APPOINTMENTS_STORAGE_KEY,
        JSON.stringify(appointments)
      );
    } catch (error) {
      console.error("Error saving appointments to storage:", error);
    }
  };

  const addAppointment = (
    newAppointment: Omit<Appointment, "id" | "createdAt">
  ) => {
    const appointment: Appointment = {
      ...newAppointment,
      id: Math.max(0, ...appointments.map((a) => a.id)) + 1,
      createdAt: new Date().toISOString(),
    };

    setAppointments((prev) => [...prev, appointment]);
  };

  const updateAppointment = (
    appointmentId: number,
    updates: Partial<Pick<Appointment, "date" | "time">>
  ) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, ...updates }
          : appointment
      )
    );
  };

  const cancelAppointment = (appointmentId: number) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: "canceled" as AppointmentStatus }
          : appointment
      )
    );
  };

  const completeAppointment = (appointmentId: number) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: "completed" as AppointmentStatus }
          : appointment
      )
    );
  };

  const getUpcomingAppointments = () => {
    return appointments.filter((apt) => apt.status === "upcoming");
  };

  const getCompletedAppointments = () => {
    return appointments.filter((apt) => apt.status === "completed");
  };

  const getCanceledAppointments = () => {
    return appointments.filter((apt) => apt.status === "canceled");
  };

  const contextValue: AppointmentContextType = {
    appointments,
    addAppointment,
    updateAppointment,
    cancelAppointment,
    completeAppointment,
    getUpcomingAppointments,
    getCompletedAppointments,
    getCanceledAppointments,
  };

  return (
    <AppointmentContext.Provider value={contextValue}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = (): AppointmentContextType => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error(
      "useAppointments must be used within an AppointmentProvider"
    );
  }
  return context;
};
