import React from 'react';
import { View, Text, TextInput } from 'react-native';

interface PasienUser {
  id: string;
  email: string;
  nama_lengkap: string;
  nomor_telepon: string;
  alamat: string;
  nik: string;
  avatar_url?: string;
}

interface ProfileFieldsProps {
  user: PasienUser;
  isEditing: boolean;
  editedUser: Partial<PasienUser>;
  setEditedUser: React.Dispatch<React.SetStateAction<Partial<PasienUser>>>;
}

const ProfileFields = ({ user, isEditing, editedUser, setEditedUser }: ProfileFieldsProps) => {
  return (
    <View className="mt-6 space-y-4">
      {/* Nama Lengkap */}
      <View>
        <Text className="text-gray-400 text-sm font-medium">Nama Lengkap</Text>
        {isEditing ? (
          <TextInput
            className="mt-1 bg-gray-700 text-white rounded-lg p-3"
            value={editedUser.nama_lengkap ?? user.nama_lengkap}
            onChangeText={(text) => setEditedUser({ ...editedUser, nama_lengkap: text })}
            placeholder="Masukkan nama lengkap"
            placeholderTextColor="#9CA3AF"
          />
        ) : (
          <Text className="mt-1 text-white text-lg">{user.nama_lengkap}</Text>
        )}
      </View>

      {/* Nomor Telepon */}
      <View>
        <Text className="text-gray-400 text-sm font-medium">Nomor Telepon</Text>
        {isEditing ? (
          <TextInput
            className="mt-1 bg-gray-700 text-white rounded-lg p-3"
            value={editedUser.nomor_telepon ?? user.nomor_telepon}
            onChangeText={(text) => setEditedUser({ ...editedUser, nomor_telepon: text })}
            placeholder="Masukkan nomor telepon"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
          />
        ) : (
          <Text className="mt-1 text-white text-lg">{user.nomor_telepon}</Text>
        )}
      </View>

      {/* Alamat */}
      <View>
        <Text className="text-gray-400 text-sm font-medium">Alamat</Text>
        {isEditing ? (
          <TextInput
            className="mt-1 bg-gray-700 text-white rounded-lg p-3"
            value={editedUser.alamat ?? user.alamat}
            onChangeText={(text) => setEditedUser({ ...editedUser, alamat: text })}
            placeholder="Masukkan alamat"
            placeholderTextColor="#9CA3AF"
            multiline
          />
        ) : (
          <Text className="mt-1 text-white text-lg">{user.alamat}</Text>
        )}
      </View>

      {/* NIK */}
      <View>
        <Text className="text-gray-400 text-sm font-medium">NIK</Text>
        {isEditing ? (
          <TextInput
            className="mt-1 bg-gray-700 text-white rounded-lg p-3"
            value={editedUser.nik ?? user.nik}
            onChangeText={(text) => setEditedUser({ ...editedUser, nik: text })}
            placeholder="Masukkan NIK"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
        ) : (
          <Text className="mt-1 text-white text-lg">{user.nik}</Text>
        )}
      </View>

      {/* Email (Non-editable) */}
      <View>
        <Text className="text-gray-400 text-sm font-medium">Email</Text>
        <Text className="mt-1 text-white text-lg">{user.email}</Text>
      </View>
    </View>
  );
};

export default ProfileFields;
