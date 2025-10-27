import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import OnboardingFlow from "./components/OnboardingFlow";

export default function App() {
  return (
    <View style={styles.container}>
      <OnboardingFlow />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});
