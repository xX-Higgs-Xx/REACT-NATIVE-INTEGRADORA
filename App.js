import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View, TouchableOpacity } from 'react-native';
import colors from './constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import SplashScreen from './screens/all/splash';
import LoginScreen from './screens/all/login';
import Orders from './screens/worker/orders';
import Profile from './screens/worker/profile';
import Header from './screens/worker/header';
import OrderMaps from './screens/worker/orderMaps';
import Delivery from './screens/worker/delivery';

import Index from './screens/customer/index';
import ShoppingCart from './screens/customer/shoppingCart';
import CategoryP from './screens/customer/categoryP';
import SelecciónUbicación from './screens/customer/selecUbi';
import ProfileCust from './screens/customer/profileCust';
import Record from './screens/customer/historial';
import OrderCust from './screens/customer/orderCust';
import ProductScreen from './screens/all/product';

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
        {/* worker */}
        <Stack.Screen name="Orders" component={Orders} options={{
          ...headerOptions, headerTitle: () => <Header name="Pedidos" />, headerLeft: () => (
            <View>
              <HeaderIcon name="person" />
            </View>
          ),
        }} />
        <Stack.Screen name="Profile" component={Profile} options={{
          ...headerOptions, headerTitle: () => <Header name="Perfil" />, headerLeft: () => (
            <View>
              <HeaderIcon name="chevron-back" />
            </View>
          ),
        }} />
        <Stack.Screen name="ProfileCust" component={ProfileCust} options={{
          ...headerOptions, headerTitle: () => <Header name="Perfil" />, headerLeft: () => (
            <View>
              <HeaderIcon name="chevron-back" />
            </View>
          ),
        }} />
        <Stack.Screen name="OrderMaps" component={OrderMaps} options={{
          ...headerOptions, headerTitle: () => <Header name="Entrega" />, headerLeft: () => (
            <View>
              <HeaderIcon name="chevron-back" />
            </View>
          ),
        }} />
        <Stack.Screen name="Delivery" component={Delivery} options={{
          ...headerOptions, headerTitle: () => <Header name="Entrega" />, headerLeft: () => (
            <View>
              <HeaderIcon name="chevron-back" />
            </View>
          ),
        }} />
        {/* customer */}
        <Stack.Screen name="Index" component={Index} options={{
          ...headerOptions, headerTitle: () => <Header name="SWIFTCUT" />, headerLeft: () => (
            <View>
              <HeaderIconCust name="person" />
            </View>
          ), headerRight: () => (
            <View>
              <HeaderIconR name="shopping-cart" />
            </View>
          ),
        }} />
        <Stack.Screen name="ShoppingCart" component={ShoppingCart} options={{
          ...headerOptions, headerTitle: () => <Header name="Carrito" />, headerLeft: () => (
            <View>
              <HeaderIcon name="chevron-back" />
            </View>
          ),
        }} />
        <Stack.Screen name="CategoryP" component={CategoryP} options={{
          ...headerOptions, headerTitle: () => <Header name="SWIFTCUT" />, headerLeft: () => (
            <View>
              <HeaderIcon name="chevron-back" />
            </View>
          ),
          headerRight: () => (
            <View>
              <HeaderIconR name="shopping-cart" />
            </View>
          ),
        }} />
        <Stack.Screen name="selecUbi" component={SelecciónUbicación} options={{
          ...headerOptions, headerTitle: () => <Header name="Ubicacion" />, headerLeft: () => (
            <View>
              <HeaderIcon name="chevron-back" />
            </View>
          ),
        }} />
        <Stack.Screen name="record" component={Record} options={{
          ...headerOptions, headerTitle: () => <Header name="Historial" />, headerLeft: () => (
            <View>
              <HeaderIcon name="chevron-back" />
            </View>
          ),
          headerRight: () => (
            <View>
              <HeaderHome name="home" />
            </View>
          ),
        }} />
        <Stack.Screen name="orderCust" component={OrderCust} options={{
          ...headerOptions, headerTitle: () => <Header name="Historial" />, headerLeft: () => (
            <View>
              <HeaderIcon name="chevron-back" />
            </View>
          ),
          headerRight: () => (
            <View>
              <HeaderHome name="home" />
            </View>
          ),
        }} />
        <Stack.Screen name="product" component={ProductScreen} options={{
          ...headerOptions, headerTitle: () => <Header name="" />, headerLeft: () => (
            <View>
              <HeaderIcon name="chevron-back" />
            </View>
          ),
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const HeaderIconCust = (props) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const redirectToProfile = () => {
    navigation.navigate('ProfileCust');
  };

  return (
    <>
      <TouchableOpacity onPress={props.name === 'chevron-back' ? goBack : redirectToProfile} style={{ marginLeft: 35 }}>
        <Ionicons name={props.name} size={24} color="#fff" />
      </TouchableOpacity>
    </>
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
    <>
      <TouchableOpacity onPress={props.name === 'chevron-back' ? goBack : redirectToProfile} style={{ marginLeft: 35 }}>
        <Ionicons name={props.name} size={24} color="#fff" />
      </TouchableOpacity>
    </>
  );
};
const HeaderIconR = (props) => {
  const navigation = useNavigation();

  const redirectToCart = () => {
    navigation.navigate('ShoppingCart');
  };

  return (
    <>
      <TouchableOpacity onPress={props.name === 'shopping-cart' ? redirectToCart : redirectToCart} style={{ marginRight: 35 }}>
        <FontAwesome5 name={props.name} size={24} color="#fff" />
      </TouchableOpacity>
    </>
  );
};
const HeaderHome = (props) => {
  const navigation = useNavigation();

  const redirectHome = () => {
    navigation.navigate('Index');
  };

  return (
    <>
      <TouchableOpacity onPress={props.name === 'home' ? redirectHome : redirectHome} style={{ marginRight: 35 }}>
        <FontAwesome name={props.name} size={36} color="#fff" />
      </TouchableOpacity>
    </>
  );
};

export default App;
