import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { supabase } from '@/lib/supabase';

interface ProfileActionsProps {
  isEditing: boolean;
  loading: boolean;
  error: string | null;
  toggleEdit: () => void;
  handleSave: () => void;
}

const ProfileActions = ({ isEditing, loading, error, toggleEdit, handleSave }: ProfileActionsProps) => {
  return (
    <>
      <View className="mt-6 flex-row justify-between">
        <TouchableOpacity
          onPress={toggleEdit}
          className={`py-3 px-6 rounded-lg ${isEditing ? "bg-gray-600" : "bg-blue-600"}`}
        >
          <Text className="text-white font-semibold">{isEditing ? "Batal" : "Edit Profil"}</Text>
        </TouchableOpacity>

        {isEditing && (
          <TouchableOpacity
            onPress={handleSave}
            className="py-3 px-6 rounded-lg bg-green-600"
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text className="text-white font-semibold">Simpan Perubahan</Text>
            )}
          </TouchableOpacity>
        )}

        {!isEditing && (
          <TouchableOpacity
            onPress={() => supabase.auth.signOut()}
            className="py-3 px-6 rounded-lg bg-red-600"
          >
            <Text className="text-white font-semibold">Keluar</Text>
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text className="text-red-500 text-center mt-4">{error}</Text>
      )}
    </>
  );
};

export default ProfileActions;
