import { FlatList } from "react-native";
import PostListItem from "@/components/PostListItem";
import { Link } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Post } from "@/types";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const { data: postsData, error: postsError } = await supabase
      .from("posts")
      .select("*, user:profiles(*)")
      .order("created_at", { ascending: false })
      .limit(10);

    if (postsError) {
      console.error("Error fetching posts:", postsError);
      return;
    }
    setPosts(postsData as Post[]);
  };

  // Ambil data post saat komponen pertama kali dimuat + udh realtime
  useEffect(() => {
    fetchPosts();

    const channel = supabase
      .channel("realtime-posts")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          console.log("Realtime payload:", payload);
          fetchPosts(); // Ambil ulang semua post
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      ListHeaderComponent={() => (
        <Link href="/new" className="text-blue-500 text-center text-3xl">
          New Post
        </Link>
      )}
    />
  );
}
