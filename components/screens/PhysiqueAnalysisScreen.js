import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  PanResponder,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import gigachadImage from "../../assets/gigachad.jpg";

const METRICS = [
  { label: "Overall", value: 86, icon: "⭐" },
  { label: "Humor", value: 82, icon: "😂" },
  { label: "Looks", value: 92, icon: "✨" },
  { label: "Potential", value: 95, icon: "🚀" },
  { label: "Sociality", value: 91, icon: "👥" },
  { label: "Cleanliness", value: 72, icon: "🧹" },
];

const AI_SUGGESTIONS = [
  "Focus on upper body strength training",
  "Increase protein intake to 1.6g per kg bodyweight",
  "Add 3 cardio sessions per week",
  "Prioritize quality sleep (7-9 hours)",
  "Stay consistent with your workout routine",
];

export default function PhysiqueAnalysisScreen({ onNext }) {
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const pickImage = async (source) => {
    try {
      let result;
      
      if (source === "camera") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission needed", "Camera permission is required to take photos.");
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });
      }

      if (!result.canceled && result.assets[0]) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const handleBeginAnalysis = () => {
    if (!image) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000);
      return;
    }

    Alert.alert(
      "Begin Analysis?",
      "This feature is for demonstration purposes only. The analysis will be simulated.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Continue",
          onPress: performAnalysis,
        },
      ]
    );
  };

  const performAnalysis = () => {
    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < -50) {
        // Swipe left
        if (showResults) {
          Alert.alert(
            "Warning",
            "This feature is for demonstration purposes only.",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Continue", onPress: () => onNext?.() },
            ]
          );
        } else {
          handleBeginAnalysis();
        }
      }
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} {...panResponder.panHandlers}>
          <View style={styles.content}>
            {showWarning && (
              <View style={styles.warningContainer}>
                <Text style={styles.warningText}>
                  Please select an image first
                </Text>
              </View>
            )}

                                      {!showResults ? (
               <>
                 <Text style={styles.title}>Physique Analysis</Text>
                 <Text style={styles.subtitle}>
                   Upload a photo to begin your analysis
                 </Text>
                {/* Image Widget */}
                <View style={styles.imageContainer}>
                  {image ? (
                    <Image source={{ uri: image }} style={styles.uploadedImage} />
                  ) : (
                    <View style={styles.placeholderContainer}>
                      <Image source={gigachadImage} style={styles.placeholderImage} />
                      <Text style={styles.placeholderSubtext}>
                        Upload your photo to begin
                      </Text>
                    </View>
                  )}
                </View>

                {/* Action Buttons */}
                <View style={styles.imageButtonContainer}>
                  <TouchableOpacity
                    style={styles.imageButton}
                    onPress={() => pickImage("camera")}
                  >
                    <Text style={styles.imageButtonText}>📷 Camera</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.imageButton}
                    onPress={() => pickImage("library")}
                  >
                    <Text style={styles.imageButtonText}>🖼️ Photo Album</Text>
                  </TouchableOpacity>
                </View>

                {/* Begin Analysis Button */}
                <TouchableOpacity
                  style={[
                    styles.beginButton,
                    (!image || analyzing) && styles.beginButtonDisabled,
                  ]}
                  onPress={handleBeginAnalysis}
                  disabled={!image || analyzing}
                >
                  {analyzing ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.beginButtonText}>
                      🔍 Begin Analysis
                    </Text>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* Back Button and Title */}
                <View style={styles.headerRow}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                      setImage(null);
                      setShowResults(false);
                    }}
                  >
                    <Text style={styles.backButtonText}>←</Text>
                  </TouchableOpacity>
                  <Text style={styles.titleWithBack}>Physique Analysis</Text>
                </View>
                
                {/* Results View */}
                {image && (
                  <View style={styles.resultsImageContainer}>
                    <Image source={{ uri: image }} style={styles.resultsImage} />
                  </View>
                )}

                {/* Metrics Grid */}
                <Text style={styles.sectionTitle}>Your Metrics</Text>
                <View style={styles.metricsGrid}>
                  {METRICS.map((metric, index) => (
                    <View key={index} style={styles.metricCard}>
                      <Text style={styles.metricIcon}>{metric.icon}</Text>
                      <Text style={styles.metricValue}>{metric.value}</Text>
                      <Text style={styles.metricLabel}>{metric.label}</Text>
                      <View style={styles.progressBarContainer}>
                        <View
                          style={[
                            styles.progressBar,
                            { width: `${metric.value}%` },
                          ]}
                        />
                      </View>
                    </View>
                  ))}
                </View>

                {/* AI Suggestions Widget */}
                <View style={styles.aiSuggestionsContainer}>
                  <Text style={styles.sectionTitle}>AI Suggestions</Text>
                  {AI_SUGGESTIONS.map((suggestion, index) => (
                    <View key={index} style={styles.suggestionItem}>
                      <Text style={styles.suggestionBullet}>•</Text>
                      <Text style={styles.suggestionText}>{suggestion}</Text>
                    </View>
                  ))}
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtonsContainer}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => Alert.alert("Save", "This feature is coming soon!")}
                  >
                    <Text style={styles.actionButtonIcon}>🔒</Text>
                    <Text style={styles.actionButtonText}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => Alert.alert("Share", "This feature is coming soon!")}
                  >
                    <Text style={styles.actionButtonIcon}>📤</Text>
                    <Text style={styles.actionButtonText}>Share</Text>
                  </TouchableOpacity>
                </View>

                {/* Retake Button */}
                <TouchableOpacity
                  style={styles.retakeButton}
                  onPress={() => {
                    setShowResults(false);
                    setImage(null);
                  }}
                >
                  <Text style={styles.retakeButtonText}>📷 Retake Photo</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 60,
  },
  warningContainer: {
    backgroundColor: "#FF6B35",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  warningText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  titleWithBack: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    flex: 1,
    textAlign: "center",
    marginLeft: -40, // To center the title accounting for button
  },
  subtitle: {
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
    marginBottom: 40,
  },
  imageContainer: {
    height: 280,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "#2A2A2A",
    borderWidth: 2,
    borderColor: "#333333",
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    position: "relative",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderSubtext: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  imageButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  imageButton: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333333",
    marginHorizontal: 6,
    alignItems: "center",
  },
  imageButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  beginButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 32,
  },
  beginButtonDisabled: {
    backgroundColor: "#333333",
    opacity: 0.5,
  },
  beginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  resultsImageContainer: {
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 32,
    backgroundColor: "#2A2A2A",
  },
  resultsImage: {
    width: "100%",
    height: "100%",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  metricCard: {
    width: "48%",
    backgroundColor: "#2A2A2A",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333333",
    alignItems: "center",
  },
  metricIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: "#CCCCCC",
    marginBottom: 12,
  },
  progressBarContainer: {
    width: "100%",
    height: 8,
    backgroundColor: "#1A1A1A",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#9B59B6",
    borderRadius: 4,
  },
  aiSuggestionsContainer: {
    backgroundColor: "#2A2A2A",
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#333333",
  },
  suggestionItem: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  suggestionBullet: {
    color: "#FF6B35",
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  suggestionText: {
    flex: 1,
    color: "#CCCCCC",
    fontSize: 15,
    lineHeight: 22,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333333",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
  },
  actionButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  retakeButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  retakeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  backButtonText: {
    color: "#FF6B35",
    fontSize: 32,
    fontWeight: "600",
  },
});
