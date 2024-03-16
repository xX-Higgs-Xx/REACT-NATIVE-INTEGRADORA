import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import colors from '../../constants/colors';

const OrderMaps = ({ route, navigation }) => {
  const { latitude: orderLatitude, longitude: orderLongitude } = route.params;
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);

  // Obtener la ubicación actual del usuario
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // Si el usuario no otorga permiso, muestra una alerta y regresa a la pantalla anterior
        Alert.alert(
          'Necesitas dar permisos para continuar',
          'Por favor, otorga permisos de ubicación para continuar.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  const handleShowUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Necesitas dar permisos para continuar',
        'Por favor, otorga permisos de ubicación para continuar.'
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
    mapRef.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        initialRegion={{
          latitude: orderLatitude,
          longitude: orderLongitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
        mapType="standard"
      >
        {userLocation && (
          <Marker coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }} pinColor="blue" title='Tu ubicación'/>
        )}
        <Marker coordinate={{ latitude: orderLatitude, longitude: orderLongitude }} title='Punto de entrega' />
      </MapView>
      <TouchableOpacity style={styles.locationButton} onPress={handleShowUserLocation}>
        <Text style={styles.buttonText}>Mi ubicación</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  locationButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: colors.red3,
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrderMaps;
