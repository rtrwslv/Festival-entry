import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './context/authContext';
import ScanScreen from './src/screens/scan_screen';
import ProfilePage from './src/screens/profile';
import LoginPage from './src/screens/login';
import WelcomePage from './src/screens/welcome';
import Stats from './src/screens/stats'
import Settings from './src/screens/settings'
const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Scan" component={ScanScreen}  />
          <Stack.Screen name="Profile" component={ProfilePage} />
          <Stack.Screen name="Stats" component={Stats} />
          <Stack.Screen name="Settings" component={Settings} />
        </>
      ) : (
        <>
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="Login" component={LoginPage} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <AuthProvider>
        <AppNavigator />
    </AuthProvider>
  );
};

export default App;