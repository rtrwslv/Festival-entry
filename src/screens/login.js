import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
} from "react-native";
import { useAuth } from '../../context/authContext';
import { useFonts } from "expo-font";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from "expo-router";

export default function LoginPage() {
  useFonts({
    'Pragmatica-Bold': require('../../assets/fonts/Pragmatica-Bold.ttf'),
    'Pragmatica-BookOblique': require('../../assets/fonts/Pragmatica-BookOblique.ttf'),
  });

  function checkPassword(password, login) {
    let status = password === "123" && login === "123" 
    setLoginStatus(status)
    return status;
  }
  
  const navigation = useNavigation();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuth();
  const [loginStatus, setLoginStatus] = useState(null);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <StatusBar hidden />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <Ionicons name="chevron-back" size={24} color="#E7AD64" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Авторизация</Text>
      </View>
      <View style={styles.loginBox}>
        <FontAwesome6 name="user" size={56} color="#E7AD64" style={styles.userIcon} />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Введите логин"
            placeholderTextColor="#7d7b73"
            onChangeText={(login) => setLogin(login)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Введите пароль"
            placeholderTextColor="#7d7b73"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            Keyboard.dismiss();
            checkPassword(password, login) ? handleLogin() : console.log("wtf");
          }}
        >
          <Text style={styles.loginBtnText}>Авторизация</Text>
        </TouchableOpacity>
        {loginStatus === false && (
          <Text style={styles.errorText}>Неверный логин или пароль, попробуйте еще раз</Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C2E35",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10%",
  },
  backIcon: {
    marginLeft: "10%",
  },
  headerText: {
    fontSize: 24,
    color: "#DBD8C9",
    fontFamily: "Pragmatica-Bold",
    marginLeft: "15%",
  },
  loginBox: {
    backgroundColor: "#2F3032",
    borderTopWidth: 5,
    borderBottomWidth: 5,
    marginTop: "15%",
    margin: "5%",
    padding: "5%",
    height: "75%",
    borderRadius: 5,
    borderColor: "#E7AD64",
  },
  userIcon: {
    marginHorizontal: "auto",
    marginVertical: "20%",
  },
  inputView: {
    width: "80%",
    borderRadius: 10,
    height: 45,
    marginBottom: 20,
    borderWidth: 1,
    marginHorizontal: "auto",
    borderColor: "#7d7b73",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    color: "white",
  },
  loginBtn: {
    display: "flex",
    flexDirection: "row",
    width: "60%",
    borderRadius: 10,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#E7AD64",
    marginHorizontal: "auto",
  },
  loginBtnText: {
    fontFamily: "Pragmatica-Bold",
    fontSize: 20,
  },
  errorText: {
    fontFamily: "Pragmatica-Bold",
    fontSize: 12,
    color: "red",
    marginHorizontal: "auto",
    marginTop: "10%"
  },
});
