import React from "react";
import { View, ActivityIndicator, Keyboard, Text, Alert } from "react-native";
import { supabase } from "@/lib/supabase";
import ProfileHeader from "@/components/profile-components/ProfileHeader";
import ProfileAvatar from "@/components/profile-components/ProfileAvatar";
import ProfileFields from "@/components/profile-components/ProfileFields";
import ProfileActions from "@/components/profile-components/ProfileAction";
import * as ImagePicker from "expo-image-picker";

interface PasienUser {
  id: string;
  email: string;
  nama_lengkap: string;
  nomor_telepon: string;
  alamat: string;
  nik: string;
  avatar_url?: string;
}

export default function PasienScreen() {
  const [user, setUser] = React.useState<PasienUser | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedUser, setEditedUser] = React.useState<Partial<PasienUser>>({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [newAvatar, setNewAvatar] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !authUser) {
          setError(authError?.message || "No user found");
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from("pasien")
          .select("*")
          .eq("id", authUser.id)
          .single();

        if (profileError) {
          setError(profileError.message);
          return;
        }

        setUser({
          ...profileData,
          email: authUser.email!,
        });
      } catch (error) {
        setError("Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      let updatedAvatarUrl = user.avatar_url;

      if (newAvatar) {
        const ext = newAvatar.split(".").pop();
        const fileName = `${user.id}/avatar.${ext}`;
        const response = await fetch(newAvatar);
        const blob = await response.blob();

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(fileName, blob, {
            upsert: true,
            contentType: "image/jpeg",
          });

        if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

        const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
        updatedAvatarUrl = data.publicUrl;
      }

      const { error: updateError } = await supabase
        .from("pasien")
        .update({
          nama_lengkap: editedUser.nama_lengkap || user.nama_lengkap,
          nomor_telepon: editedUser.nomor_telepon || user.nomor_telepon,
          alamat: editedUser.alamat || user.alamat,
          nik: editedUser.nik || user.nik,
          avatar_url: updatedAvatarUrl,
        })
        .eq("id", user.id);

      if (updateError) throw new Error(`Update failed: ${updateError.message}`);

      setUser({
        ...user,
        ...editedUser,
        avatar_url: updatedAvatarUrl,
      });

      setEditedUser({});
      setNewAvatar(null);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const toggleEdit = () => {
    if (isEditing) setEditedUser({});
    setIsEditing(!isEditing);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted || !cameraPermission.granted) {
      Alert.alert("Permission Required", "Camera and gallery access are needed.");
      return;
    }

    Alert.alert("Select Image", "Choose an option", [
      {
        text: "Camera",
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });

          if (!result.canceled && result.assets?.length > 0) {
            setNewAvatar(result.assets[0].uri);
          }
        },
      },
      {
        text: "Gallery",
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });

          if (!result.canceled && result.assets?.length > 0) {
            setNewAvatar(result.assets[0].uri);
          }
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  if (loading && !user) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-white mt-4">Loading user...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <Text className="text-white">Error: {error || "Unable to load user"}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-900" onTouchStart={() => Keyboard.dismiss()}>
      <ProfileHeader />
      <View className="mx-4 -mt-20 bg-gray-800 rounded-3xl p-6 shadow-lg">
        <ProfileAvatar
          avatarUrl={newAvatar || user.avatar_url}
          onEdit={pickImage}
          isEditing={isEditing}
        />
        <ProfileFields
          user={user}
          isEditing={isEditing}
          editedUser={editedUser}
          setEditedUser={setEditedUser}
        />
        <ProfileActions
          isEditing={isEditing}
          loading={loading}
          error={error}
          toggleEdit={toggleEdit}
          handleSave={handleSave}
        />
      </View>
    </View>
  );
}
