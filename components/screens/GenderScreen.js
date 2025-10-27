import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";

export default function GenderScreen({ onNext, onSkip, initialData }) {
  const [gender, setGender] = useState(initialData.gender || "");
  const [height, setHeight] = useState(initialData.height || "");
  const [weight, setWeight] = useState(initialData.weight || "");

  const handleNext = () => {
    onNext({ gender, height, weight });
  };

  const isFormValid = gender && height && weight;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tell us about yourself</Text>
        <Text style={styles.subtitle}>Help us personalize your experience</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === "male" && styles.genderButtonActive,
              ]}
              onPress={() => setGender("male")}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === "male" && styles.genderTextActive,
                ]}
              >
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === "female" && styles.genderButtonActive,
              ]}
              onPress={() => setGender("female")}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === "female" && styles.genderTextActive,
                ]}
              >
                Female
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            placeholder="Enter your height"
            placeholderTextColor="#666"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            placeholder="Enter your weight"
            placeholderTextColor="#666"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.nextButton,
              !isFormValid && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={!isFormValid}
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
    marginBottom: 40,
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 10,
    marginTop: 20,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#333333",
    marginHorizontal: 5,
    alignItems: "center",
  },
  genderButtonActive: {
    borderColor: "#FF6B35",
    backgroundColor: "#FF6B35",
  },
  genderText: {
    color: "#CCCCCC",
    fontSize: 16,
    fontWeight: "500",
  },
  genderTextActive: {
    color: "#FFFFFF",
  },
  input: {
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#333333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  skipButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    marginRight: 10,
  },
  skipText: {
    color: "#CCCCCC",
    fontSize: 16,
    fontWeight: "500",
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#FF6B35",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 10,
  },
  nextButtonDisabled: {
    backgroundColor: "#333333",
  },
  nextText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
