import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from './footer';

const UNIQUE_QR_KEY = 'uniqueQrCodes';

export default function Stats() {
  const [qrCodes, setQrCodes] = useState([]);

  // Загрузка QR-кодов из AsyncStorage
  useEffect(() => {
    const loadQrCodes = async () => {
      const storedCodes = await AsyncStorage.getItem(UNIQUE_QR_KEY);
      if (storedCodes) {
        setQrCodes(JSON.parse(storedCodes));
      }
    };

    loadQrCodes();
  }, []);

  // Функция для рендеринга каждой строки таблицы
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список отсканированных билетов</Text>
      <View style={styles.table}>
        <FlatList
          data={qrCodes}
          renderItem={renderItem}
          keyExtractor={(item) => item} // Используем item как уникальный ключ
        />
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C2E35",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  cell: {
    fontSize: 16,
    color: "white",
  },
});