import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { supabase } from "@/lib/supabase";
import ollama from "ollama";


interface Doctor {
  id: string;
  nama_dokter: string;
  keahlian: string;
  jadwal: string;
  avatar_url?: string;
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}
const ChatWithDoctorAI = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Halo! Ceritakan keluhan atau gejala yang Anda alami.",
      isUser: false,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [currentSymptoms, setCurrentSymptoms] = useState(""); // Simpan gejala untuk rekomendasi

  const fetchDoctors = async () => {
    try {
      const { data, error } = await supabase.from("dokter").select("*");
      if (error) {
        console.error("Error fetching doctors:", error.message);
        return [];
      }
      return data as Doctor[];
    } catch (err) {
      console.error("Database error:", err);
      return [];
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
    };

    setCurrentSymptoms(inputText);
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText("");
    setLoading(true);

    try {
      const response = await ollama.chat({
        model: "deepseek-r1:1.5b",
        messages: [
          {
            role: "system",
            content:
              "Kamu adalah asisten medis digital yang membantu pasien memahami gejala mereka. Berikan respons yang informatif namun selalu sarankan untuk konsultasi dengan dokter untuk diagnosis yang akurat. Jangan memberikan diagnosis medis yang pasti.",
          },
          {
            role: "user",
            content: currentInput.trim(),
          },
        ],
        stream: true,
      });

  
      for await (const part of response){
        const aiResponse = part.message.content;
        setMessages((prevMessage) => [...prevMessage, { id: prevMessage.length + 1, text: aiResponse, isUser: false }]);
        
      }
    } catch (err: any) {
      console.error("Error getting AI response:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "❌ Terjadi kesalahan saat menghubungi model AI lokal.",
          isUser: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendDoctor = async () => {
    if (!currentSymptoms.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "❌ Mohon ceritakan gejala Anda terlebih dahulu.",
          isUser: false,
        },
      ]);
      return;
    }

    setLoading(true);
    try {

      const doctorList = await fetchDoctors();

      if (doctorList.length === 0) {
        throw new Error("Tidak ada data dokter tersedia");
      }

      setDoctors(doctorList);

      const prompt = `
Gejala pasien: "${currentSymptoms}"

Berikut daftar dokter yang tersedia:
${doctorList
  .map(
    (d, i) =>
      `${i + 1}. Dr. ${d.nama_dokter}, spesialis ${
        d.keahlian
      }, jadwal praktik: ${d.jadwal}`
  )
  .join("\n")}

Dari gejala tersebut, pilih dan rekomendasikan satu dokter yang paling cocok. Jelaskan alasan pilihanmu secara singkat.
`;

      const response = await ollama.chat({
        model: "deepseek-r1:1.5b",
        messages: [
          {
            role: "system",
            content:
              "Kamu adalah asisten medis digital. Rekomendasikan dokter terbaik berdasarkan gejala dan daftar dokter yang tersedia. Berikan penjelasan yang singkat dan jelas.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        stream: false,
      });

      const aiMessage = response.message.content.trim();

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: `🩺 **Rekomendasi Dokter:**\n\n${aiMessage}`,
          isUser: false,
        },
      ]);
    } catch (err: Error | any) {
      console.error("Error during AI recommendation:", err);
      let errorMessage = "❌ Gagal merekomendasikan dokter. ";

      if (err.response?.status === 401) {
        errorMessage += "API Key tidak valid.";
      } else if (err.response?.status === 429) {
        errorMessage += "Quota API habis.";
      } else if (err.message.includes("API Key")) {
        errorMessage += "API Key tidak tersedia.";
      } else if (err.message.includes("dokter")) {
        errorMessage += "Data dokter tidak tersedia.";
      } else {
        errorMessage += "Coba lagi nanti.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: errorMessage,
          isUser: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={{
        alignSelf: item.isUser ? "flex-end" : "flex-start",
        backgroundColor: item.isUser ? "#3B82F6" : "#1F2937",
        padding: 12,
        marginVertical: 6,
        borderRadius: 12,
        maxWidth: "80%",
      }}
    >
      <Text style={{ color: "white" }}>{item.text}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "black", padding: 16 }}>
      <Text
        style={{
          color: "white",
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 12,
        }}
      >
        Konsultasi AI Medis
      </Text>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />

      {loading && (
        <View
          style={{
            position: "absolute",
            bottom: 120,
            left: 16,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color="#3B82F6" size="small" />
          <Text style={{ color: "#9CA3AF", marginLeft: 8 }}>
            AI sedang mengetik...
          </Text>
        </View>
      )}

      <View
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          backgroundColor: "black",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              backgroundColor: "#111827",
              color: "white",
              borderRadius: 8,
              padding: 12,
              borderColor: "#374151",
              borderWidth: 1,
            }}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ketik keluhan Anda..."
            placeholderTextColor="#9CA3AF"
            multiline
            maxLength={500}
            editable={!loading}
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            style={{
              marginLeft: 8,
              opacity: loading ? 0.5 : 1,
            }}
            disabled={loading}
          >
            <Text style={{ color: "#4B5EFC", fontWeight: "bold" }}>Kirim</Text>
          </TouchableOpacity>
        </View>

        {currentSymptoms.length > 3 && (
          <TouchableOpacity
            onPress={handleRecommendDoctor}
            style={{
              backgroundColor: "#10B981",
              padding: 12,
              borderRadius: 10,
              opacity: loading ? 0.5 : 1,
            }}
            disabled={loading}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              💡 Rekomendasi Dokter
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ChatWithDoctorAI;
