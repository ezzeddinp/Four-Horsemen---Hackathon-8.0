import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons"; // For icons (install with npm install @expo/vector-icons)
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewPostScreen() {
  const textInputRef = React.createRef<TextInput>();
  const [isEditing, setIsEditing] = useState(false);
  const [threadText, setThreadText] = useState("Add to thread...");

  const handleTextInputFocus = () => {
    if (!isEditing) {
      setIsEditing(true);
      setThreadText("");
      textInputRef.current?.focus();
    }
  };

  const handleTextChange = (text: string) => {
    setThreadText(text);
  };

  return (
    <SafeAreaView
      edges={["bottom"]}
      className="p-4 flex-1"
      onTouchStart={() => Keyboard.dismiss()}
    >
      {/* User Info */}
      <KeyboardAvoidingView
        className="flex-1 flex-row"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 130 : 0}
      >
        {/* ini untuk menghindar UI ketutup oleh keyboard, misal disini si tombol post */}
        <View className="items-start mb-4">
          <Image
            source={{ uri: "https://picsum.photos/200/300" }} // Placeholder avatar URL
            className="w-12 h-12 rounded-full bg-yellow-400 mr-3"
            alt="User Avatar"
          />
        </View>
        <View className="flex-col flex-1">
          {/* Post Input Area */}
          <View className="flex-1 ">
            <View>
              <Text className="text-white font-bold text-base">
                vadimnotjustdev
              </Text>
              <Text className="text-gray-500 mb-2">What's new?</Text>
              {/* Placeholder for text input - replace with actual input component if needed */}
              {/* Icon Row */}
              <View className="flex-row gap-4 justify-start items-center my-4">
                <TouchableOpacity>
                  <Feather name="image" size={24} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="camera" size={24} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialIcons name="gif" size={24} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="mic" size={24} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="hash" size={24} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="more-horizontal" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
              <TextInput
                className="text-white text-base"
                ref={textInputRef}
                value={threadText}
                onChangeText={handleTextChange}
                onFocus={handleTextInputFocus}
                placeholder="Add to thread..."
                placeholderTextColor="#6B7280"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        </View>
        <View className="mt-auto">
          <TouchableOpacity
            onPress={() => console.log("post: ", threadText)}
            className="bg-white p-4 self-end rounded-full"
          >
            <Text>Post</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
