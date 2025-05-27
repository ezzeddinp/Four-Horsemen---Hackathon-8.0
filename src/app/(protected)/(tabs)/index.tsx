import { FlatList } from "react-native";
import { dummyPosts } from "@/dummyData";
import PostListItem from "@/components/PostListItem";
import { Link } from "expo-router";

export default function Page() {
  return (
    // <SafeAreaView className="flex-1">
    <FlatList
      data={dummyPosts}
      renderItem={({ item }) => <PostListItem post={item} />}
      ListHeaderComponent={() => (
        <Link href="/new" className="text-blue-500 text-center text-3xl">
          New Post
        </Link>
      )}
    />
    // </SafeAreaView>
  );
}
