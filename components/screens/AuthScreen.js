import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";

export default function AuthScreen({ onNext, onSkip, initialData }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleNext = () => {
    // In a real app, you would handle authentication here
    onNext({ email, password, name });
  };

  const isFormValid = email && password && (!isLogin || name);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {isLogin ? "Welcome Back" : "Create Account"}
        </Text>
        <Text style={styles.subtitle}>
          {isLogin ? "Sign in to continue" : "Sign up to get started"}
        </Text>

        <View style={styles.form}>
          {!isLogin && (
            <>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                placeholderTextColor="#666"
                autoCapitalize="words"
              />
            </>
          )}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#666"
            secureTextEntry
          />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialText}>Continue with Apple</Text>
          </TouchableOpacity>
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
            <Text style={styles.nextText}>
              {isLogin ? "Sign In" : "Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={styles.switchText}>
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </Text>
        </TouchableOpacity>
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
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 10,
    marginTop: 20,
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
  socialContainer: {
    marginBottom: 30,
  },
  socialButton: {
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333333",
    alignItems: "center",
  },
  socialText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
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
  switchButton: {
    alignItems: "center",
    paddingVertical: 10,
  },
  switchText: {
    color: "#FF6B35",
    fontSize: 14,
    fontWeight: "500",
  },
});
