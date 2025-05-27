import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

export default function Welcome() {
  return (
    <SafeAreaView>
      <Text>WELCOME</Text>
      <Link href="/">back to home</Link>
    </SafeAreaView>
  )
}