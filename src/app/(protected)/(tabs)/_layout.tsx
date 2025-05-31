import { Tabs } from "expo-router";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#A78DF8", // Purple for active icon
        tabBarInactiveTintColor: "#CACACA", // Gray for inactive icons
        tabBarStyle: {
          height: 100, // Height to match the image
          backgroundColor: "#F5F5F5", // Light gray background
          borderTopWidth: 0, // Remove top border
          maxWidth: "100%",
          paddingHorizontal:25,
          paddingTop: 20,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#A78DF859" : "transparent",
                borderRadius: 50, // Full circle
                width: 50, 
                height: 50, 
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="home"
                size={35}
                color={focused ? "#A78DF8" : "#CACACA"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: "Chatbot",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#A78DF859" : "transparent",
                borderRadius: 50, // Full circle
                width: 50, 
                height: 50, 
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="message-processing"
                size={28}
                color={focused ? "#A78DF8" : "#CACACA"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="appointment"
        options={{
          title: "Appointment",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#A78DF859" : "transparent",
                borderRadius: 50, // Full circle
                width: 50, 
                height: 50, 
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome5
                name="calendar-week"
                size={24}
                color={focused ? "#A78DF8" : "#CACACA"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="claim"
        options={{
          title: "Claim",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#A78DF859" : "transparent",
                borderRadius: 50,
                width: 50, 
                height: 50, 
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome6
                name="file-medical"
                size={24}
                color={focused ? "#A78DF8" : "#CACACA"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#A78DF859" : "transparent",
                borderRadius: 50, // Full circle
                width: 50, 
                height: 50, 
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome5
                name="user"
                size={24}
                color={focused ? "#A78DF8" : "#CACACA"}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}