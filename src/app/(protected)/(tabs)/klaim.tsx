import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  ViewProps,
  Pressable,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import { Animated } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import { Calendar } from "@/components/ui/calendar";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";

// Note: These asset imports will need to be created or replaced with actual assets
// For now, we'll use placeholder components
const Akariconsschedule: React.FC<ViewProps & { className?: string }> = ({
  className,
  ...props
}) => <View {...props} className={className} />;
const Section1: React.FC<ViewProps & { className?: string }> = ({
  className,
  ...props
}) => <View {...props} className={className} />;
const Section2: React.FC<ViewProps & { className?: string }> = ({
  className,
  ...props
}) => <View {...props} className={className} />;
const Section3: React.FC<ViewProps & { className?: string }> = ({
  className,
  ...props
}) => <View {...props} className={className} />;
const Section4: React.FC<ViewProps & { className?: string }> = ({
  className,
  ...props
}) => <View {...props} className={className} />;
const Navbar: React.FC<ViewProps & { className?: string }> = ({
  className,
  ...props
}) => <View {...props} className={className} />;
const Group37029: React.FC<ViewProps & { className?: string }> = ({
  className,
  ...props
}) => <View {...props} className={className} />;
const Group37030: React.FC<ViewProps & { className?: string }> = ({
  className,
  ...props
}) => <View {...props} className={className} />;
const Group37034: React.FC<ViewProps & { className?: string }> = ({
  className,
  ...props
}) => <View {...props} className={className} />;
const Group37032: React.FC<ViewProps & { className?: string }> = ({
  className,
  ...props
}) => <View {...props} className={className} />;
const Iconamoonprofilefill: React.FC<ViewProps & { className?: string }> = ({
  className,
  ...props
}) => <View {...props} className={className} />;
const Vector: React.FC<ViewProps & { className?: string }> = ({
  className,
  ...props
}) => <View {...props} className={className} />;
const Vector1: React.FC<ViewProps & { className?: string }> = ({
  className,
  ...props
}) => <View {...props} className={className} />;
const Group3044: React.FC<ViewProps & { className?: string }> = ({
  className,
  ...props
}) => <View {...props} className={className} />;

interface FormErrors {
  fullName?: string;
  nik?: string;
  jknNumber?: string;
  phoneNumber?: string;
  date?: string;
  facility?: string;
  serviceType?: string;
  amount?: string;
  referralLetter?: string;
}

// Add this component for the calendar icon
const CalendarIcon = () => {
  try {
    return <MaterialCommunityIcons name="calendar" size={24} color="#a78df8" />;
  } catch (error) {
    // Fallback to a simple text if icon fails to load
    return <Text className="text-[#a78df8] text-lg">📅</Text>;
  }
};

export default function KlaimPage() {
  const [detectionLevel, setDetectionLevel] = React.useState(0);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [selectedPDF, setSelectedPDF] = React.useState<{
    name: string;
    uri: string;
  } | null>(null);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const progressAnim = React.useRef(new Animated.Value(0)).current;

  // Form state
  const [formData, setFormData] = React.useState({
    fullName: "",
    nik: "",
    jknNumber: "",
    phoneNumber: "",
    facility: "",
    serviceType: "",
    amount: "",
  });

  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: detectionLevel,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [detectionLevel]);

  const getDetectionColor = () => {
    if (detectionLevel === 0) return "#22c55e"; // green
    if (detectionLevel <= 30) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setShowCalendar(false);
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";

    // If date is today, show placeholder
    const today = new Date();
    if (date.getTime() === today.getTime()) {
      return "";
    }

    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePDFPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setSelectedPDF({
          name: result.assets[0].name,
          uri: result.assets[0].uri,
        });
        // Clear error if exists
        if (errors.referralLetter) {
          setErrors((prev) => ({ ...prev, referralLetter: undefined }));
        }
      }
    } catch (err) {
      console.error("Error picking PDF:", err);
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    let detectionScore = 0;

    // Average claim amount in IDR (you can adjust this based on your data)
    const AVERAGE_CLAIM_AMOUNT = 5000000; // 5 million IDR
    const HIGH_RISK_MULTIPLIER = 2.5; // 2.5x average is considered high risk
    const MEDIUM_RISK_MULTIPLIER = 1.5; // 1.5x average is considered medium risk

    // Basic validation for required fields
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap harus diisi";
    } else if (!/^[a-zA-Z\s]*$/.test(formData.fullName)) {
      newErrors.fullName = "Nama hanya boleh berisi huruf";
    }

    if (!formData.nik) {
      newErrors.nik = "NIK harus diisi";
    } else if (!/^\d{16}$/.test(formData.nik)) {
      newErrors.nik = "NIK harus 16 digit angka";
    }

    if (!formData.jknNumber) {
      newErrors.jknNumber = "Nomor JKN harus diisi";
    } else if (!/^\d{13}$/.test(formData.jknNumber)) {
      newErrors.jknNumber = "Nomor JKN harus 13 digit angka";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Nomor HP harus diisi";
    } else if (!/^\d{10,13}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Nomor HP harus 10-13 digit angka";
    }

    const today = new Date();
    if (selectedDate && selectedDate > today) {
      newErrors.date = "Tanggal tidak boleh lebih dari hari ini";
    }

    if (!formData.facility.trim()) {
      newErrors.facility = "Fasilitas kesehatan harus diisi";
    }

    if (!formData.serviceType.trim()) {
      newErrors.serviceType = "Jenis layanan harus diisi";
    }

    if (!selectedPDF) {
      newErrors.referralLetter = "Surat rujuk harus diupload";
    }

    // Amount validation and risk assessment
    if (!formData.amount) {
      newErrors.amount = "Jumlah pengajuan harus diisi";
    } else if (!/^\d+$/.test(formData.amount)) {
      newErrors.amount = "Jumlah pengajuan harus berupa angka";
    } else {
      const claimAmount = parseInt(formData.amount);
      const amountRatio = claimAmount / AVERAGE_CLAIM_AMOUNT;

      // Adjust detection score based on claim amount
      if (amountRatio >= HIGH_RISK_MULTIPLIER) {
        detectionScore = 100;
      } else if (amountRatio >= MEDIUM_RISK_MULTIPLIER) {
        detectionScore = 75;
      } else if (amountRatio >= 1) {
        detectionScore = 50;
      } else {
        detectionScore = 0;
      }
    }

    setErrors(newErrors);
    setDetectionLevel(detectionScore);

    // If form is valid and detection is 0%, show success modal
    if (Object.keys(newErrors).length === 0 && detectionScore === 0) {
      setShowSuccessModal(true);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormErrors, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSuccess = () => {
    setShowSuccessModal(false);
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f2f0ef]">
      <ScrollView className="flex-1 px-4">
        {/* Progress Indicator */}
        <View className="mt-4 bg-white rounded-xl p-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <Text className="text-[#8d8d8d] text-xs font-bold">Deteksi</Text>
            <Animated.Text
              className="text-sm font-bold"
              style={{ color: getDetectionColor() }}
            >
              {detectionLevel}%{" "}
              {detectionLevel > 0
                ? "Ketidaksesuaian pengajuan!"
                : "Tidak ada masalah"}
            </Animated.Text>
          </View>
          <View className="h-3 bg-gray-200 rounded-full mt-2 flex-row items-center">
            <Animated.View
              className="h-full rounded-full"
              style={{
                width: progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
                backgroundColor: getDetectionColor(),
              }}
            />
            <Section1 className="absolute left-10" />
            <Section2 className="absolute left-20" />
            <Section3 className="absolute left-40" />
            <Section4 className="absolute left-60" />
          </View>
        </View>

        {/* Form Fields */}
        <View className="mt-6 gap-2">
          {/* Full Name */}
          <View>
            <Text className="text-[#1f2a37] text-xs font-bold mb-2">
              Full Name
            </Text>
            <TextInput
              className={`h-11 w-full border rounded-lg px-4 bg-transparent ${
                errors.fullName ? "border-red-500" : "border-[#a78df8]"
              }`}
              placeholder="Enter your full name"
              value={formData.fullName}
              onChangeText={(text) => handleInputChange("fullName", text)}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {errors.fullName && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.fullName}
              </Text>
            )}
          </View>

          {/* NIK */}
          <View>
            <Text className="text-[#1f2a37] text-xs font-bold mb-2">
              Nomor Induk Kewarganegaraan
            </Text>
            <TextInput
              className={`h-11 w-full border rounded-lg px-4 bg-transparent ${
                errors.nik ? "border-red-500" : "border-[#a78df8]"
              }`}
              placeholder="Enter your NIK"
              keyboardType="numeric"
              maxLength={16}
              value={formData.nik}
              onChangeText={(text) => handleInputChange("nik", text)}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {errors.nik && (
              <Text className="text-red-500 text-xs mt-1">{errors.nik}</Text>
            )}
          </View>

          {/* JKN Number */}
          <View>
            <Text className="text-[#1f2a37] text-xs font-bold mb-2">
              Nomor Kepesertaan JKN
            </Text>
            <TextInput
              className={`h-11 w-full border rounded-lg px-4 bg-transparent ${
                errors.jknNumber ? "border-red-500" : "border-[#a78df8]"
              }`}
              placeholder="Enter your JKN number"
              keyboardType="numeric"
              maxLength={13}
              value={formData.jknNumber}
              onChangeText={(text) => handleInputChange("jknNumber", text)}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {errors.jknNumber && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.jknNumber}
              </Text>
            )}
          </View>

          {/* Phone Number */}
          <View>
            <Text className="text-[#1f2a37] text-xs font-bold mb-2">
              Nomor HP
            </Text>
            <TextInput
              className={`h-11 w-full border rounded-lg px-4 bg-transparent ${
                errors.phoneNumber ? "border-red-500" : "border-[#a78df8]"
              }`}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              maxLength={13}
              value={formData.phoneNumber}
              onChangeText={(text) => handleInputChange("phoneNumber", text)}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {errors.phoneNumber && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.phoneNumber}
              </Text>
            )}
          </View>

          {/* Health Service Date */}
          <View>
            <Text className="text-[#1f2a37] text-xs font-bold mb-2">
              Tanggal Pelayanan Kesehatan
            </Text>
            <View className="flex-row items-center">
              <TextInput
                className={`h-11 flex-1 border rounded-lg px-4 bg-transparent ${
                  errors.date ? "border-red-500" : "border-[#a78df8]"
                }`}
                placeholder="dd/mm/yyyy"
                value={formatDate(selectedDate)}
                editable={false}
                autoCorrect={false}
                autoCapitalize="none"
              />
              <Pressable
                className="absolute right-4"
                onPress={() => setShowCalendar(true)}
              >
                <Text className="text-[#a78df8] text-lg">
                  <Entypo name="calendar" size={18} color="#a78df8" />
                </Text>
              </Pressable>
            </View>
            {errors.date && (
              <Text className="text-red-500 text-xs mt-1">{errors.date}</Text>
            )}
          </View>

          {/* Health Facility */}
          <View>
            <Text className="text-[#1f2a37] text-xs font-bold mb-2">
              Fasilitas Kesehatan
            </Text>
            <TextInput
              className={`h-11 w-full border rounded-lg px-4 bg-transparent ${
                errors.facility ? "border-red-500" : "border-[#a78df8]"
              }`}
              placeholder="Enter health facility name"
              value={formData.facility}
              onChangeText={(text) => handleInputChange("facility", text)}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {errors.facility && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.facility}
              </Text>
            )}
          </View>

          {/* Service Type */}
          <View>
            <Text className="text-[#1f2a37] text-xs font-bold mb-2">
              Jenis Layanan
            </Text>
            <TextInput
              className={`h-11 w-full border rounded-lg px-4 bg-transparent ${
                errors.serviceType ? "border-red-500" : "border-[#a78df8]"
              }`}
              placeholder="Enter service type"
              value={formData.serviceType}
              onChangeText={(text) => handleInputChange("serviceType", text)}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {errors.serviceType && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.serviceType}
              </Text>
            )}
          </View>

          {/* Referral Letter and Claim Amount in one row */}
          <View className="flex-row space-x-4">
            {/* Referral Letter */}
            <View className="flex-1">
              <Text className="text-[#1f2a37] text-xs font-bold mb-2">
                Surat Rujuk
              </Text>
              <Pressable
                className={`h-11 w-full border rounded-lg flex-row items-center px-4 ${
                  errors.referralLetter ? "border-red-500" : "border-[#a78df8]"
                }`}
                onPress={handlePDFPick}
              >
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#a78df8"
                />
                <Text
                  className="text-[#a78df8] text-xs ml-2 flex-1"
                  numberOfLines={1}
                >
                  {selectedPDF ? selectedPDF.name : "Upload PDF"}
                </Text>
              </Pressable>
              {errors.referralLetter && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.referralLetter}
                </Text>
              )}
            </View>

            {/* Claim Amount */}
            <View className="flex-1">
              <Text className="text-[#1f2a37] text-xs font-bold mb-2">
                Jumlah Pengajuan
              </Text>
              <View className="flex-row items-center">
                <Text className="text-gray-600 m-2">Rp</Text>
                <TextInput
                  className={`h-11 flex-1 border rounded-lg px-4 bg-transparent ${
                    errors.amount ? "border-red-500" : "border-[#a78df8]"
                  }`}
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  value={formData.amount}
                  onChangeText={(text) => handleInputChange("amount", text)}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>
              {errors.amount && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.amount}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <View className="mt-8 mb-8">
          <Pressable
            className="h-11 w-full bg-[#a78df8] rounded-lg items-center justify-center"
            onPress={validateForm}
          >
            <Text className="text-white text-base font-bold">
              Ajukan Klaim JKN
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Success Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-white p-6 rounded-lg w-[90%] max-w-[400px]">
            <View className="items-center mb-4">
              <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-4">
                <MaterialCommunityIcons
                  name="check"
                  size={32}
                  color="#22c55e"
                />
              </View>
              <Text className="text-xl font-bold text-center mb-2">
                Pengajuan Berhasil!
              </Text>
              <Text className="text-gray-600 text-center">
                Pengajuan klaim JKN Anda telah berhasil dikirim. Silakan tunggu
                konfirmasi selanjutnya.
              </Text>
            </View>
            <Pressable
              className="h-11 w-full bg-[#a78df8] rounded-lg items-center justify-center mt-4"
              onPress={handleSuccess}
            >
              <Text className="text-white text-base font-bold">
                Kembali ke Beranda
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Calendar Modal */}
      {showCalendar && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showCalendar}
          onRequestClose={() => setShowCalendar(false)}
        >
          <Pressable
            className="flex-1 bg-black/50 justify-center items-center"
            onPress={() => setShowCalendar(false)}
          >
            <Pressable
              className="bg-white p-4 rounded-lg w-[90%] max-w-[400px]"
              onPress={(e) => e.stopPropagation()}
            >
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold">Pilih Tanggal</Text>
                <Pressable onPress={() => setShowCalendar(false)}>
                  <Text className="text-[#666] text-lg">✕</Text>
                </Pressable>
              </View>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border shadow-sm"
                disabled={(date) => date > new Date()}
              />
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </SafeAreaView>
  );
}
