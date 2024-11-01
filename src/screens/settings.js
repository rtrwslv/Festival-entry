import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from 'expo-router';
import { useAuth } from '../../context/authContext';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings() {
  useFonts({
    'Pragmatica-Bold': require('../../assets/fonts/Pragmatica-Bold.ttf'),
    'PragmaticaCond-Light': require('../../assets/fonts/PragmaticaCond-Light.ttf'),
  });
  const navigation = useNavigation();
  const { logout } = useAuth();
  const [soundMode, setSoundMode] = useState(false);
  const [vibroMode, setVibroMode] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const savedSoundMode = await AsyncStorage.getItem('soundMode');
      const savedVibroMode = await AsyncStorage.getItem('vibroMode');
      setSoundMode(savedSoundMode === 'true');
      setVibroMode(savedVibroMode === 'true');
    };
    loadSettings();
  }, []);

  const toggleVibro = async () => {
    const currentVibroMode = await AsyncStorage.getItem('vibroMode');
    const newVibroMode = currentVibroMode !== 'true';
    await AsyncStorage.setItem('vibroMode', newVibroMode.toString());
    setVibroMode(newVibroMode);
  };
  
  const toggleSound = async () => {
    const currentSoundMode = await AsyncStorage.getItem('soundMode');
    const newSoundMode = currentSoundMode !== 'true';
    await AsyncStorage.setItem('soundMode', newSoundMode.toString());
    setSoundMode(newSoundMode);
  };
  
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.topMargin}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="chevron-back" size={24} color="#E7AD64" style={styles.iconMargin} />
        </TouchableOpacity>
      </View>
      <View style={styles.marginLeft}>
        <Text style={styles.titleText}>Настройки</Text>
        <View style={styles.optionContainer}>
          <MaterialIcons name="vibration" size={28} color="#E7AD64" style={styles.iconMargin} />
          <Text style={styles.optionText}>Вибрация</Text>
          <Switch
            style={styles.switchMargin}
            trackColor={{ false: '#979797', true: '#E7AD64' }}
            onValueChange={toggleVibro}
            value={vibroMode}
          />
        </View>
        <View style={styles.optionContainer}>
          <MaterialCommunityIcons name="bell-ring" size={28} color="#E7AD64" style={styles.iconMargin} />
          <Text style={styles.optionText}>Звуковой сигнал</Text>
          <Switch
            style={styles.switchMargin}
            trackColor={{ false: '#979797', true: '#E7AD64' }}
            onValueChange={toggleSound}
            value={soundMode}
          />
        </View>
        <Text style={styles.supportText}>Поддержка</Text>
        <View style={styles.bugReportContainer}>
          <MaterialCommunityIcons name="shield" size={28} color="#E7AD64" style={styles.iconMargin} />
          <View>
            <Text style={styles.bugText}>Закрался баг?</Text>
            <Text style={styles.bugSubtitle}>Сообщите нам об этом!</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="exit" size={28} color="#E7AD64" style={styles.iconMargin} />
          <Text style={styles.logoutText}>Выйти :(</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2E35',
  },
  topMargin: {
    marginTop: '10%',
  },
  iconMargin: {
    marginHorizontal: '5%',
  },
  marginLeft: {
    marginLeft: '5%',
  },
  titleText: {
    fontSize: 24,
    color: '#E7AD64',
    fontFamily: 'Pragmatica-Bold',
    marginTop: '15%',
  },
  optionContainer: {
    backgroundColor: '#24252B',
    width: '95%',
    height: '15%',
    borderRadius: 10,
    marginTop: '10%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 28,
    color: '#E2E2E2',
    fontFamily: 'PragmaticaCond-Light',
    marginRight: 'auto',
  },
  switchMargin: {
    marginRight: '5%',
  },
  supportText: {
    fontSize: 24,
    color: '#E7AD64',
    fontFamily: 'Pragmatica-Bold',
    marginTop: '15%',
  },
  bugReportContainer: {
    backgroundColor: '#24252B',
    width: '95%',
    height: '10%',
    borderRadius: 10,
    marginTop: '10%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bugText: {
    fontSize: 24,
    color: '#E2E2E2',
    fontFamily: 'PragmaticaCond-Light',
  },
  bugSubtitle: {
    fontSize: 18,
    color: '#E2E2E2',
    fontFamily: 'PragmaticaCond-Light',
  },
  logoutButton: {
    backgroundColor: '#24252B',
    width: '95%',
    height: '10%',
    borderRadius: 10,
    marginTop: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 28,
    color: '#E2E2E2',
    fontFamily: 'PragmaticaCond-Light',
    marginRight: 'auto',
  },
});
