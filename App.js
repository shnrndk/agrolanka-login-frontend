import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import { AuthContext } from './Components/context';
import { AsyncStorage } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

function App() {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        };
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)

  const authContext = React.useMemo(() => ({
    signIn: async (mobile_no, password) => {

      let userToken;
      userToken = null;

      const sendCred = (mobile_no, password) => new Promise((resolve, reject) => {

        fetch('https://agrolanka-backend.herokuapp.com/driver/signin', {
          method: 'POST',
          body: JSON.stringify({
            mobile_no: mobile_no,
            password: password,
          }),
          headers: {
            "Content-type": "application/json"
          }
        }).then((response) => response.json())
          .then((json) => {
            resolve(json);
          }).catch((e) => {
            reject(e)
          })
      })

      async function storeToken() {
        const tokenData = await sendCred(mobile_no, password);
        console.log(tokenData)
        console.log(tokenData.token)
        if (tokenData.token != undefined) {
          userToken = tokenData.token;
          try {
            await AsyncStorage.setItem('userToken', userToken)
          } catch (e) {
            console.log(e)
          }
        }
        console.log('user token:', userToken)
        dispatch({ type: 'LOGIN', id: mobile_no, token: userToken })
      }

      storeToken();

    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken')
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'LOGOUT' })
    },
    signUp: async(values) => {
      let userToken;
      userToken = null;

      const sendUserDetails = (values) => new Promise((resolve, reject) => {
        console.log(values)
        fetch('https://agrolanka-backend.herokuapp.com/driver/register', {
          method: 'POST',
          body: JSON.stringify({
            ...values
          }),
          headers: {
            "Content-type": "application/json"
          }
        }).then((response) => response.json())
          .then((json) => {
            resolve(json);
          }).catch((e) => {
            reject(e)
          })
      })

      async function storeToken() {
        const tokenData = await sendUserDetails(values);
        console.log(tokenData)
        console.log(tokenData.token)
        if (tokenData.token != undefined) {
          userToken = tokenData.token;
          try {
            await AsyncStorage.setItem('userToken', userToken)
          } catch (e) {
            console.log(e)
          }
        }
        console.log('user token:', userToken)
        dispatch({ type: 'LOGIN', id: values.mobile_no, token: userToken })
      }

      storeToken();
    }
  }))

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (e) {
        console.log(e)
      }
      // console.log('user token:',userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
    }, 1000)
  }, [])

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <PaperProvider>
      <NavigationContainer>
        {loginState.userToken != null ? (
          <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} />
          </HomeStack.Navigator>
        ) :
          <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
          </AuthStack.Navigator>
        }


      </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
}

export default App;