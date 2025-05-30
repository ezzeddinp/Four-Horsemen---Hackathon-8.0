import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

interface ProfileAvatarProps {
  avatarUrl?: string;
  onEdit: () => void;
  isEditing: boolean;
}

const ProfileAvatar = ({ avatarUrl, onEdit, isEditing }: ProfileAvatarProps) => {
  return (
    <View className="items-center">
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          className="w-32 h-32 rounded-full border-2 border-white"
        />
      ) : (
        <View className="w-32 h-32 rounded-full bg-gray-600 items-center justify-center border-4 border-white">
          <Text className="text-white text-lg">No Avatar</Text>
        </View>
      )}
      {isEditing && (
        <TouchableOpacity
          onPress={onEdit}
          className="mt-2 bg-blue-600 py-2 px-4 rounded-full"
        >
          <Text className="text-white font-semibold">Edit Avatar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileAvatar;
