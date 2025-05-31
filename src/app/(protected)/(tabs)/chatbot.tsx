import * as React from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import highRiskKeywords from "@/lib/high_risk_keywords.json";

// Dummy medicine and doctor data for demonstration
const medicineSuggestion = {
  id: "med_1",
  name: "OBH Combi",
  price: 20000,
  image:
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
};
const doctorSuggestion = {
  id: "doc_1",
  name: "Dr. David Patel",
  specialization: "Cardiologist",
  distance: "1.1 Km Away",
  image: require("assets/Profile_avatar_placeholder_large.png"),
};

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  cardType?: "medicine" | "doctor";
}

const ChatbotStart = () => {
  const router = useRouter();
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm MedAI, your medical assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = React.useState("");
  const scrollViewRef = React.useRef<ScrollView>(null);

  const suggestions = [
    {
      text: "Why do I urinate frequently at night?",
      response:
        "Frequent nighttime urination (nocturia) can be caused by several factors including drinking too much fluid before bedtime, urinary tract infections, enlarged prostate (in men), diabetes, or certain medications. It's recommended to limit fluids 2-3 hours before sleep and consult a healthcare provider if this persists, especially if accompanied by other symptoms.",
    },
    {
      text: "Why do I feel tired all the time?",
      response:
        "Persistent fatigue can result from various causes such as poor sleep quality, stress, depression, anemia, thyroid disorders, diabetes, or sleep apnea. It could also be related to lifestyle factors like poor diet, lack of exercise, or dehydration. If you're consistently tired despite adequate rest, it's important to consult with a healthcare professional for proper evaluation.",
    },
    {
      text: "What causes sudden weight loss without trying?",
      response:
        "Unintentional weight loss can be concerning and may indicate various conditions including hyperthyroidism, diabetes, depression, digestive disorders, or in some cases, more serious conditions like cancer. Other causes include stress, medications, or infections. If you've lost more than 5% of your body weight in 6-12 months without trying, please consult a healthcare provider promptly.",
    },
  ];

  // Helper to scan for keywords
  const containsHighRiskKeyword = (text: string) => {
    return highRiskKeywords.keywords.some((kw) =>
      text.toLowerCase().includes(kw.toLowerCase())
    );
  };

  const containsPilekBatuk = (text: string) => {
    return (
      text.toLowerCase().includes("pilek") ||
      text.toLowerCase().includes("batuk")
    );
  };

  const handleSuggestionPress = (suggestion: (typeof suggestions)[0]) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: suggestion.text,
      isBot: false,
      timestamp: new Date(),
    };

    // Add bot response after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: suggestion.response,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage, botMessage]);

      // Scroll to bottom after messages are added
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 500);
  };

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    // Check for special keywords
    if (containsPilekBatuk(inputText)) {
      // Show medicine card
      setMessages((prev) => [
        ...prev,
        userMessage,
        {
          id: Date.now() + 1,
          text: "Based on your symptoms, you may need this medicine:",
          isBot: true,
          timestamp: new Date(),
          cardType: "medicine",
        },
      ]);
      setInputText("");
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
      return;
    }
    if (containsHighRiskKeyword(inputText)) {
      // Show doctor card
      setMessages((prev) => [
        ...prev,
        userMessage,
        {
          id: Date.now() + 1,
          text: "Your symptoms may require urgent attention. Please consult a specialist:",
          isBot: true,
          timestamp: new Date(),
          cardType: "doctor",
        },
      ]);
      setInputText("");
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
      return;
    }

    // Simple bot response for custom messages
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: "Thank you for your question. For specific medical concerns, I recommend consulting with a healthcare professional who can provide personalized advice based on your medical history and current condition.",
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage, botMessage]);
      setInputText("");

      // Scroll to bottom after messages are added
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1000);
  };

  // Card renderers
  const renderMedicineCard = () => (
    <View className="bg-white rounded-xl p-4 mt-4 mb-2 flex-row items-center border border-[#A78DF8]">
      <Image
        source={{ uri: medicineSuggestion.image }}
        className="w-[80px] h-[80px] rounded-xl"
        resizeMode="cover"
      />
      <View className="ml-4 flex-1">
        <Text className="text-[#1F2A37] text-base font-bold mb-1">
          {medicineSuggestion.name}
        </Text>
        <Text className="text-[#A78DF8] text-sm font-semibold mb-2">
          Rp {medicineSuggestion.price.toLocaleString("id-ID")}
        </Text>
        <TouchableOpacity
          className="bg-[#A78DF8] rounded-full px-4 py-2 mt-2"
          onPress={() => router.push(`/medicine/${medicineSuggestion.id}`)}
        >
          <Text className="text-white text-sm font-bold text-center">
            Detail
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDoctorCard = () => (
    <View className="bg-white rounded-xl p-4 mt-4 mb-2 flex-row items-center border border-[#A78DF8]">
      <Image
        source={doctorSuggestion.image}
        className="w-[80px] h-[80px] rounded-xl"
        resizeMode="cover"
      />
      <View className="ml-4 flex-1">
        <Text className="text-[#1F2A37] text-base font-bold mb-1">
          {doctorSuggestion.name}
        </Text>
        <TouchableOpacity
          className="bg-[#A78DF8] rounded-full px-4 py-2 mt-2"
          onPress={() => router.push(`/doctor/${doctorSuggestion.id}`)}
        >
          <Text className="text-white text-sm font-bold text-center">
            Detail
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#f2f0ef]">
      {/* Profile Icon */}
      <View className="absolute top-16 right-8">
        <Image
          source={require("/Users/billy/codeOS/projects/Four-Horsemen---Hackathon-8.0/assets/Chatbot-startchat/Frame 11.svg")}
          className="w-10 h-10 rounded-full"
          resizeMode="contain"
        />
      </View>

      {/* Main Content */}
      <View className="flex-1 pt-24 pb-20">
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Message */}
          <View className="items-center justify-center mb-20">
            <Text className="text-[30px] leading-[48px] font-bold text-center">
              <Text className="text-[#7a76f1]">Welcome To{"\n"}</Text>
              <Text className="text-[#a78df8]">MedAI</Text>
            </Text>
          </View>

          {/* Chat Messages */}
          <View className="flex-1 mb-8">
            {messages.map((message) => (
              <React.Fragment key={message.id}>
                <View
                  className={`mb-4 ${
                    message.isBot ? "items-start" : "items-end"
                  }`}
                >
                  <View
                    className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                      message.isBot ? "bg-white" : "bg-[#a78df8]"
                    }`}
                  >
                    <Text
                      className={`text-base ${
                        message.isBot ? "text-gray-800" : "text-white"
                      }`}
                    >
                      {message.text}
                    </Text>
                  </View>
                </View>
                {/* Render card if needed */}
                {message.cardType === "medicine" && renderMedicineCard()}
                {message.cardType === "doctor" && renderDoctorCard()}
              </React.Fragment>
            ))}
          </View>

          {/* Suggestions Section */}
          <View className="mb-8">
            <Text className="text-[#56637e] text-sm font-bold text-right mb-4 mr-3 mt-20">
              Suggestions on what to ask Our AI
            </Text>

            {/* Suggestion Cards */}
            <View className="items-end gap-[10px]">
              {suggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  className="bg-white/50 border border-[#a78df8] rounded-lg px-3 py-2 mr-3 max-w-[70%]"
                  onPress={() => handleSuggestionPress(suggestion)}
                >
                  <Text className="text-[#a78df8] text-sm">
                    {suggestion.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Navigation Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white h-[67px] mx-8 mb-4 rounded-lg shadow-lg">
        <View className="flex-row items-center h-full px-4">
          {/* Input Area */}
          <View className="flex-1 relative">
            <View className="bg-gray-100 rounded-xl h-10 w-[220px]">
              <TextInput
                className="flex-1 text-xs text-[#989898] px-4 py-2 font-['Poppins-Regular']"
                placeholder="Ask about Medicals"
                placeholderTextColor="#989898"
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={handleSendMessage}
                autoCorrect={false}
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Send Button */}
          <TouchableOpacity
            className="w-10 h-10 items-center justify-center ml-2"
            onPress={handleSendMessage}
          >
            <FontAwesome name="send" size={18} color="#A78DF8" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatbotStart;
