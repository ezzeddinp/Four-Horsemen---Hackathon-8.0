import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@/providers/AuthProvider';

export default function ProtectedLayout() {
  const {isAuthenticated} = useAuth();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Redirect href='/login' />
  }

  return (
    <Stack>
        <Stack.Screen name='(tabs)' options={{headerShown: false}} />
        <Stack.Screen name='new' options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
        {/* <Stack.Screen name='login' options={{ presentation: 'modal', animation: 'slide_from_bottom' }} /> */}
    </Stack>
  )
}