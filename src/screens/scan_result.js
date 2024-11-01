// ScanResult.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScanResult = ({ variant, children }) => {
  return (
    <View style={[styles.container, variant === 'error' ? styles.error : styles.success]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    position: "absolute",
    top: "75%",
    alignSelf: "center",
    minWidth: 200,

  },
  success: {
    backgroundColor: '#d4edda',
  },
  error: {
    backgroundColor: '#f8d7da',
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default ScanResult;