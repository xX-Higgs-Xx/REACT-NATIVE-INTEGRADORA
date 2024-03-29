import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View, TouchableOpacity } from 'react-native';
import colors from './constants/colors';
import { Ionicons } from '@expo/vector-icons';

import SplashScreen from './screens/all/splash';
import LoginScreen from './screens/all/login';
import Orders from './screens/worker/orders';
import Profile from './screens/worker/profile';
import Header from './screens/worker/header';
import OrderMaps from './screens/worker/orderMaps';

const Stack = createStackNavigator();

const App = () => {
  const headerOptions = {
    headerStyle: {
      height: 110,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      backgroundColor: colors.red1,
      elevation: 5,
    }
  };

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#fff" />
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Orders" component={Orders} options={{ ...headerOptions, headerTitle: () => <Header name="Pedidos" />, headerLeft: () => (
          <View>
            <HeaderIcon name="person" />
          </View>
        ), }} />
        <Stack.Screen name="Profile" component={Profile} options={{ ...headerOptions, headerTitle: () => <Header name="Perfil" />, headerLeft: () => (
          <View>
            <HeaderIcon name="chevron-back" />
          </View>
        ), }} />
        <Stack.Screen name="OrderMaps" component={OrderMaps} options={{ ...headerOptions, headerTitle: () => <Header name="Order Maps" />, headerLeft: () => (
          <View>
            <HeaderIcon name="chevron-back" />
          </View>
        ), }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HeaderIcon = (props) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const redirectToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <TouchableOpacity onPress={props.name === 'chevron-back' ? goBack : redirectToProfile} style={{ marginLeft: 35 }}>
      <Ionicons name={props.name} size={24} color="#fff" />
    </TouchableOpacity>
  );
};

export default App;
