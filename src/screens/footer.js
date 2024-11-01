import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const getTextColor = (currentRoute) => {
    return route.name === currentRoute ? "#E7AD64" : "white";
  };

  return (
    <View style={styles.footer}>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person-outline" size={24} color={getTextColor("Profile")} />
        <Text style={{ color: getTextColor("Profile"), marginTop: "5%" }}>Профиль</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Scan')}>
        <Ionicons name="scan-outline" size={24} color={getTextColor("Scan")} />
        <Text style={{ color: getTextColor("Scan"), marginTop: "5%" }}>Сканирование</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Stats')}>
        <Ionicons name="stats-chart-outline" size={24} color={getTextColor("Stats")} />
        <Text style={{ color: getTextColor("Stats"), marginTop: "5%" }}>История</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: "auto",
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#202126',
    width: "90%",
    marginHorizontal: "auto",
    marginBottom: "5%",
    borderRadius: 15,
  },
  button: {
    display: "flex",
    justifyContent: 'center',
    height: 36,
    alignItems: "center"
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
});

export default Footer;