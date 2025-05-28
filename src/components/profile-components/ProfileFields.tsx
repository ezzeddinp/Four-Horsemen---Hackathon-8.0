import React from 'react';
import { View, Text, TextInput } from 'react-native';

interface ExtendedUser {
  id: string;
  email: string;
  full_name?: string;
  username?: string;
  bio?: string;
  avatar_url?: string;
}

interface ProfileFieldsProps {
  user: ExtendedUser;
  isEditing: boolean;
  editedUser: Partial<ExtendedUser>;
  setEditedUser: React.Dispatch<React.SetStateAction<Partial<ExtendedUser>>>;
}

const ProfileFields = ({ user, isEditing, editedUser, setEditedUser }: ProfileFieldsProps) => {
  return (
    <View className="mt-6 space-y-4">
      {/* Full Name */}
      <View>
        <Text className="text-gray-400 text-sm font-medium">Full Name</Text>
        {isEditing ? (
          <TextInput
            className="mt-1 bg-gray-700 text-white rounded-lg p-3"
            value={editedUser.full_name ?? user.full_name ?? ""}
            onChangeText={(text) => setEditedUser({ ...editedUser, full_name: text })}
            placeholder="Enter your full name"
            placeholderTextColor="#9CA3AF"
          />
        ) : (
          <Text className="mt-1 text-white text-lg">{user.full_name ?? "No Name"}</Text>
        )}
      </View>

      {/* Username */}
      <View>
        <Text className="text-gray-400 text-sm font-medium">Username</Text>
        {isEditing ? (
          <TextInput
            className="mt-1 bg-gray-700 text-white rounded-lg p-3"
            value={editedUser.username ?? user.username ?? ""}
            onChangeText={(text) => setEditedUser({ ...editedUser, username: text })}
            placeholder="Enter your username"
            placeholderTextColor="#9CA3AF"
          />
        ) : (
          <Text className="mt-1 text-white text-lg">{user.username ?? "No Username"}</Text>
        )}
      </View>

      {/* Bio */}
      <View>
        <Text className="text-gray-400 text-sm font-medium">Bio</Text>
        {isEditing ? (
          <TextInput
            className="mt-1 bg-gray-700 text-white rounded-lg p-3"
            value={editedUser.bio ?? user.bio ?? ""}
            onChangeText={(text) => setEditedUser({ ...editedUser, bio: text })}
            placeholder="Tell us about yourself"
            placeholderTextColor="#9CA3AF"
            multiline
          />
        ) : (
          <Text className="mt-1 text-white text-lg">{user.bio ?? "No Bio"}</Text>
        )}
      </View>

      {/* Email (Non-editable) */}
      <View>
        <Text className="text-gray-400 text-sm font-medium">Email</Text>
        <Text className="mt-1 text-white text-lg">{user.email ?? "No Email"}</Text>
      </View>
    </View>
  );
};

export default ProfileFields;