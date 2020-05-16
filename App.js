import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';


const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Register" component={RegisterScreen} />
      </AuthStack.Navigator>
      {/* <HomeStack.Navigator>
        <AuthStack.Screen name="Home" component={HomeScreen} />
      </HomeStack.Navigator> */}
    </NavigationContainer>
  );
}

export default App;