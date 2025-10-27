import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export default function ActivityScreen({ onNext, onSkip, initialData }) {
  const [activityLevel, setActivityLevel] = useState(
    initialData.activityLevel || ""
  );

  const activityLevels = [
    {
      value: "sedentary",
      label: "Sedentary",
      description: "Little to no exercise",
    },
    {
      value: "light",
      label: "Lightly Active",
      description: "Light exercise 1-3 days/week",
    },
    {
      value: "moderate",
      label: "Moderately Active",
      description: "Moderate exercise 3-5 days/week",
    },
    {
      value: "active",
      label: "Very Active",
      description: "Heavy exercise 6-7 days/week",
    },
    {
      value: "very_active",
      label: "Extremely Active",
      description: "Very heavy exercise, physical job",
    },
  ];

  const handleNext = () => {
    onNext({ activityLevel });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Activity Level</Text>
        <Text style={styles.subtitle}>
          How active are you on a regular basis?
        </Text>

        <View style={styles.optionsContainer}>
          {activityLevels.map((level) => (
            <TouchableOpacity
              key={level.value}
              style={[
                styles.optionButton,
                activityLevel === level.value && styles.optionButtonActive,
              ]}
              onPress={() => setActivityLevel(level.value)}
            >
              <Text
                style={[
                  styles.optionTitle,
                  activityLevel === level.value && styles.optionTitleActive,
                ]}
              >
                {level.label}
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  activityLevel === level.value &&
                    styles.optionDescriptionActive,
                ]}
              >
                {level.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.nextButton,
              !activityLevel && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={!activityLevel}
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
  optionsContainer: {
    flex: 1,
  },
  optionButton: {
    backgroundColor: "#1A1A1A",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#333333",
  },
  optionButtonActive: {
    borderColor: "#FF6B35",
    backgroundColor: "#FF6B35",
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  optionTitleActive: {
    color: "#FFFFFF",
  },
  optionDescription: {
    fontSize: 14,
    color: "#CCCCCC",
  },
  optionDescriptionActive: {
    color: "#FFFFFF",
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
