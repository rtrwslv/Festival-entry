import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "expo-router";

export default function WelcomePage() {
  useFonts({
    'PragmaticaCond-Light': require('../../assets/fonts/PragmaticaCond-Light.ttf'),
    'Pragmatica-Bold': require('../../assets/fonts/Pragmatica-Bold.ttf'),
  });

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image style={styles.image} source={require("../../assets/images/qr.png")} />
      <Text style={styles.infoText}>
        Данное приложение создано для сотрудников фестиваля «Архстояние». Пожалуйста, подтвердите статус сотрудника:
      </Text>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Авторизация</Text>
        <AntDesign name="arrowright" size={24} color="black" style={styles.arrowIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C2E35",
  },
  loginBtn: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: "auto",
    width: "90%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#E7AD64",
  },
  loginText: {
    fontFamily: "Pragmatica-Bold",
    fontSize: 22,
    marginLeft: "30%",
    marginRight: "auto",
  },
  arrowIcon: {
    marginTop: "1%",
    marginRight: "5%",
  },
  image: {
    marginTop: 90,
    marginBottom: 70,
    height: 150,
    objectFit: "scale-down",
  },
  infoText: {
    fontFamily: "PragmaticaCond-Light",
    fontSize: 20,
    color: "#DBD8C9",
    textAlign: "center",
    padding: 26,
    marginTop: "50%",
  },
});
