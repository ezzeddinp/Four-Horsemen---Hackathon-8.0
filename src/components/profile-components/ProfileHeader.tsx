import React from 'react';
import { View, Text } from 'react-native';

const ProfileHeader = () => {
  return (
    <View className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 items-center justify-center">
      <Text className="text-3xl font-bold text-white">Profil</Text>
    </View>
  );
};

export default ProfileHeader;
