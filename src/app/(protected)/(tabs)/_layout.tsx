import { Tabs } from "expo-router";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#A78DF8",
        tabBarInactiveTintColor: "#CACACA",
        tabBarActiveBackgroundColor: "#A78DF859",

        tabBarStyle: {
          height: 100, // Set the height of the tab bar to 60 pixels
          padding: 100,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={31} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: "Chatbot",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="message-processing"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="klaim"
        options={{
          title: "Klaim",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="file-document-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="appointment"
        options={{
          title: "Notifications",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-week" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="claim"
        options={{
          title: "Claim",
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="file-medical" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
