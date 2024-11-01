import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Vibration } from "react-native";
import { CameraView, Camera } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScanResult from "./scan_result";
import Footer from "./footer";

export default function App() {
  const UNIQUE_QR_KEY = 'uniqueQrCodes';
  const VIBRO_MODE = 'vibroMode';
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedCodes, setScannedCodes] = useState(new Set());
  const [scanMessage, setScanMessage] = useState("");
  const [scanVariant, setScanVariant] = useState("");
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    const loadScannedCodes = async () => {
      const storedCodes = await AsyncStorage.getItem(UNIQUE_QR_KEY);
      if (storedCodes) {
        setScannedCodes(new Set(JSON.parse(storedCodes)));
      }
    };

    getCameraPermissions();
    loadScannedCodes();
  }, []);

  const handleBarcodeScanned = async ({ type, data }) => {
    if (!isScanning) return;
  
    setIsScanning(false);
  
    if (scannedCodes.has(data)) {
      setScanMessage("Этот билет уже был отсканирован.");
      setScanVariant("error");
      const vibroMode = await AsyncStorage.getItem(VIBRO_MODE);
      if (vibroMode === 'true') {
        Vibration.vibrate([0, 500, 200, 500, 200, 500]);
      }
      setTimeout(() => resumeScanningAfterDelay(), 3000);
    } else {
      scannedCodes.add(data);
      setScannedCodes(new Set(scannedCodes));
      await AsyncStorage.setItem(UNIQUE_QR_KEY, JSON.stringify([...scannedCodes]));
      setScanMessage(data);
      setScanVariant("success");
      const vibroMode = await AsyncStorage.getItem(VIBRO_MODE);
      if (vibroMode === 'true') {
        Vibration.vibrate();
      }
      setTimeout(() => resumeScanningAfterDelay(), 3000);
    }
  };
  

  const resumeScanningAfterDelay = () => {
    setIsScanning(true);
    setScanMessage("");
    setScanVariant("");
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={isScanning ? handleBarcodeScanned : null}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={styles.barcode}
      />
      {scanMessage && (
        <ScanResult variant={scanVariant}>
          {scanMessage}
        </ScanResult>
      )}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#2C2E35",
  },
  barcode: {
    marginTop: "auto",
    height: "50%",
  },
});
