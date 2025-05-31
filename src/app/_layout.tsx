import { AuthProvider } from "@/providers/AuthProvider";
import "../../global.css";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { Slot } from "expo-router";
import React from "react";

const myTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#F9FAFB",
    primary: "white",
    card: "#F9FAFB",
  },
};

// file ini akan nge"wrap" sluruh app
export default function RootLayout() {
  return (
    <ThemeProvider value={myTheme}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </ThemeProvider>
  );
}
