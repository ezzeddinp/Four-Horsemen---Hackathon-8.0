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

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
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
              <View
                key={message.id}
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
