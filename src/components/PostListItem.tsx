import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Post } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Link } from "expo-router";

dayjs.extend(relativeTime);

export default function PostListItem({ post }: { post: Post }) {
  const [currUserId, setCurrUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setCurrUserId(data.user?.id ?? null);
    };
    fetchUser();
  }, []);

  const isOwner = currUserId === post.user_id;

  const handleDelete = async () => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase
            .from("posts")
            .delete()
            .eq("id", post.id);
          if (error) {
            console.error("Failed to delete post:", error.message);
          } else {
            console.log("Post deleted");
          }
        },
      },
    ]);
  };

  return (
    <View className="flex-row p-4 border-b border-gray-800/70">
      {/* User Avatar */}
      <View className="mr-3">
        <Image
          source={{ uri: post.user.avatar_url }}
          className="w-12 h-12 rounded-full"
        />
      </View>

      {/* Content */}
      <View className="flex-1">
        {/* User Info */}
        <View className="flex-row items-center">
          <Text className="text-white font-bold mr-2">
            {post.user.username}
          </Text>
          <Text className="text-gray-500">
            {dayjs(post.created_at).fromNow()}
          </Text>
        </View>

        {/* Post Content */}
        <Text className="text-white mt-2 mb-3">{post.content}</Text>

        {/* Interaction Buttons */}
        <View className="flex flex-row gap-4 mt-2 justify-start">
          <TouchableOpacity className="flex-row items-center justify-center">
            <Ionicons name="heart-outline" size={20} color="#d1d5db" />
            <Text className="text-gray-300 ml-2">0</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="chatbubble-outline" size={20} color="#d1d5db" />
            <Text className="text-gray-300 ml-2">{0}</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="repeat-outline" size={20} color="#d1d5db" />
            <Text className="text-gray-300 ml-2">0</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="paper-plane-outline" size={20} color="#d1d5db" />
          </TouchableOpacity>
          {isOwner && (
            <>
              <TouchableOpacity onPress={handleDelete}>
                <Ionicons name="trash-outline" size={20} color="#d1d5db" />
              </TouchableOpacity>

              <Link href={`/new/${post.id}`} asChild>
                <TouchableOpacity>
                  <Ionicons name="create-outline" size={20} color="#d1d5db" />
                </TouchableOpacity>
              </Link>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
