import { AuthProvider } from "@/providers/AuthProvider";
import { CartProvider } from "@/providers/CartProvider";
import { AppointmentProvider } from "@/providers/AppointmentProvider";
import { AppStateProvider } from "@/providers/AppStateProvider";
import "../../global.css";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { Slot } from "expo-router";
import React from "react";
import { TransactionProvider } from "@/providers/TransactionProvider";

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
      <AppStateProvider>
        <AuthProvider>
          <CartProvider>
            <AppointmentProvider>
              <TransactionProvider>
                <Slot />
              </TransactionProvider>
            </AppointmentProvider>
          </CartProvider>
        </AuthProvider>
      </AppStateProvider>
    </ThemeProvider>
  );
}
