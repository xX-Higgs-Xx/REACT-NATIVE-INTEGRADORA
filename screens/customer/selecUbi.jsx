import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import colors from '../../constants/colors';

const SelecciónUbicación = ({ navigation }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                // Si el usuario no otorga permiso, maneja la situación apropiadamente
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation(location.coords);
        })();
    }, []);

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setSelectedLocation(coordinate);
    };

    const handleConfirmLocation = () => {
        if (selectedLocation) {
            // Aquí puedes manejar la ubicación seleccionada, como guardarla en el estado de tu aplicación o enviarla a otra pantalla
            console.log('Ubicación seleccionada:', selectedLocation);
            // Mostrar el alert de pedido en curso
            Alert.alert('Pedido en curso', 'Tu pedido está en camino.');
            // Navegar a la siguiente pantalla
            navigation.navigate('Index');
        } else {
            // Si no se ha seleccionado ninguna ubicación, muestra una alerta al usuario
            Alert.alert('Error', 'Por favor, selecciona una ubicación en el mapa.');
        }
    };

    return (
        <View style={styles.container}>
            {userLocation && (
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.006,
                    }}
                    onPress={handleMapPress}
                >
                    {selectedLocation && <Marker coordinate={selectedLocation} />}
                </MapView>
            )}
            <TouchableOpacity style={styles.button} onPress={handleConfirmLocation}>
                <Text style={styles.buttonText}>Confirmar Ubicación</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    button: {
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

export default SelecciónUbicación;
