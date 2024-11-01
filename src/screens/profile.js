import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from "expo-router";

export default function ProfilePage() {
  useFonts({
    'Pragmatica-Bold': require('../../assets/fonts/Pragmatica-Bold.ttf'),
    'Pragmatica-BookOblique': require('../../assets/fonts/Pragmatica-BookOblique.ttf'),
  });
  
  const navigation = useNavigation();
  const User = {
    "name": "Никола",
    "lastname": "Ленивец",
    "email": "nicola@lazyman.ru",
    "phone": "8 (800) 555 35 35",
    "role": "Волонтер"
  };
  
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Scan')}>
          <Ionicons name="chevron-back" size={24} color="#E7AD64" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Профиль</Text>
      </View>
      <View style={styles.profileBox}>
        <FontAwesome6 name="user" size={56} color="#E7AD64" style={styles.userIcon} />
        <View style={styles.inputView}>
          <Text style={styles.InfoText}>{User.name}</Text>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.InfoText}>{User.lastname}</Text>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.InfoText}>{User.email}</Text>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.InfoText}>{User.phone}</Text>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.InfoText}>{User.role}</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={styles.settingsButtonText}>Настройки</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginLeft: "5%",
  },
  profileBox: {
    backgroundColor: "#2F3032",
    borderTopWidth: 5,
    borderBottomWidth: 5,
    marginTop: "15%",
    margin: "5%",
    padding: "5%",
    height: "80%",
    borderRadius: 5,
    borderColor: "#E7AD64",
  },
  userIcon: {
    marginHorizontal: "auto",
    marginVertical: "10%",
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
  InfoText: {
    height: 50,
    flex: 1,
    padding: 10,
    color: "white",
  },
  settingsButton: {
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
  settingsButtonText: {
    fontFamily: "Pragmatica-Bold",
    fontSize: 20,
  },
});
