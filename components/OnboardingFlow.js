import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import GenderScreen from "./screens/GenderScreen";
import ActivityScreen from "./screens/ActivityScreen";
import AuthScreen from "./screens/AuthScreen";
import PhysiqueAnalysisScreen from "./screens/PhysiqueAnalysisScreen";
import PageIndicator from "./PageIndicator";

const { width } = Dimensions.get("window");

export default function OnboardingFlow() {
  const [currentPage, setCurrentPage] = useState(0);
  const [userData, setUserData] = useState({
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
  });

  const totalPages = 4;

  const handleNext = (data) => {
    setUserData((prev) => ({ ...prev, ...data }));
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSkip = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderCurrentScreen = () => {
    switch (currentPage) {
      case 0:
        return (
          <GenderScreen
            onNext={handleNext}
            onSkip={handleSkip}
            initialData={userData}
          />
        );
      case 1:
        return (
          <ActivityScreen
            onNext={handleNext}
            onSkip={handleSkip}
            initialData={userData}
          />
        );
      case 2:
        return (
          <AuthScreen
            onNext={handleNext}
            onSkip={handleSkip}
            initialData={userData}
          />
        );
      case 3:
        return (
          <PhysiqueAnalysisScreen
            onNext={handleNext}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <PageIndicator currentPage={currentPage} totalPages={totalPages} />
      {renderCurrentScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});
