import { FlatList, Text, View, ActivityIndicator } from "react-native";
import PostListItem from "@/components/PostListItem";
import { Link } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Post } from "@/types";
import axios from "axios";

const OPENAI_API_KEY =
  "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";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [summary, setSummary] = useState<string>("");
  const [loadingSummary, setLoadingSummary] = useState(false);

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

  const summarizeAllPosts = async (
    contents: string[],
    retryCount = 0,
    maxRetry = 2
  ) => {
    try {
      const fullText = contents
        .map((c, i) => `Post ${i + 1}:\n${c}`)
        .join("\n\n");

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Berikut adalah beberapa postingan dari pengguna:\n\n${fullText}\n\nRingkas isi keseluruhan postingan tersebut menjadi 2-3 kalimat.`,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      setSummary(response.data.choices[0].message.content.trim());
    } catch (error: any) {
      if (error.response?.status === 429 && retryCount < maxRetry) {
        console.warn(
          `Terlalu banyak request. Coba lagi dalam 5 detik. Percobaan ke-${
            retryCount + 1
          }`
        );
        setTimeout(() => summarizeAllPosts(contents, retryCount + 1), 5000);
      } else {
        console.error("Error summarizing posts:", error);
        setSummary("(Gagal mengambil ringkasan)");
      }
    }
  };

  useEffect(() => {
    if (posts.length > 0) {
      const trimmedContents = posts.map((p) => (p.content ?? "").slice(0, 300));
      summarizeAllPosts(trimmedContents);
    }
  }, [posts]);

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
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      const contents = posts.map((p) => p.content ?? "").slice(0, 100);
      const timeout = setTimeout(() => summarizeAllPosts(contents), 1000); // delay 1 detik
      return () => clearTimeout(timeout);
    }
  }, [posts]);

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      ListHeaderComponent={() => (
        <>
          <Link href="/new" className="text-blue-500 text-center text-3xl mb-2">
            New Post
          </Link>
          {summary ? (
            <Text className="text-gray-400 text-center p-4">
              💡 Ringkasan AI: {summary}
            </Text>
          ) : (
            <Text className="text-gray-500 text-center p-4 italic">
              Memuat ringkasan...
            </Text>
          )}
        </>
      )}
    />
  );
}
