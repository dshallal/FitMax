import React from "react";
import { View, StyleSheet } from "react-native";

export default function PageIndicator({ currentPage, totalPages }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalPages }, (_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentPage ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#FF6B35", // Orange
  },
  inactiveDot: {
    backgroundColor: "#333333", // Dark gray
  },
});
