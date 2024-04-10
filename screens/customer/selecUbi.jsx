import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import colors from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../constants/config';
import { Ionicons } from '@expo/vector-icons';
import Factura from '../../constants/factura';

const SelecciónUbicación = ({ navigation }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [carShopId, setCarShopId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showFactura, setShowFactura] = useState(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation(location.coords);
        })();


        AsyncStorage.getItem('idCarShop')
            .then(id => {
                if (id) {
                    setCarShopId(id);
                }
            })
            .catch(error => console.error('Error al obtener el ID del carrito:', error));
    }, []);

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setSelectedLocation(coordinate);
    };

    const handleConfirmLocation = async () => {
        if (selectedLocation) {
            setIsModalVisible(true);
        } else {
            Alert.alert('Error', 'Por favor, selecciona una ubicación en el mapa antes de confirmar.');
        }
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const confirmLocationAndCloseModal = async () => {
        if (selectedLocation && carShopId) {
            const { latitude, longitude } = selectedLocation;

            const body = JSON.stringify({
                latitue: latitude,
                longitude: longitude,
                idCarShop: carShopId
            });

            console.log(body);
            try {
                const token = await AsyncStorage.getItem('token');
                console.log(token);
                const response = await fetch(`${API_URL}/api/order/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    },
                    body: body
                });
                const data = await response.json();
                console.log('Respuesta del servidor:', data);
                Alert.alert('Pedido en curso', 'Puedes ver tu pedido en el historial.');
                navigation.navigate('Index');
            } catch (error) {
                console.error('Error al enviar los datos:', error);
                Alert.alert('Error', 'Hubo un error al enviar los datos.');
            }
        } else {
            Alert.alert('Error', 'Por favor, selecciona una ubicación en el mapa y asegúrate de tener un carrito activo.');
        }
    };

    const showFacturaComponent = () => {
        setIsModalVisible(false); // Cerrar modal
        setShowFactura(true); // Mostrar componente Factura
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
                        longitudeDelta: 0.002,
                    }}
                    onPress={handleMapPress}
                >
                    {selectedLocation && <Marker coordinate={selectedLocation} />}
                </MapView>
            )}
            <TouchableOpacity style={styles.button} onPress={handleConfirmLocation}>
                <Text style={styles.buttonText}>Confirmar Ubicación</Text>
            </TouchableOpacity>

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Ionicons name="close-circle" size={24} color={colors.red3} />
                        </TouchableOpacity>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={showFacturaComponent}>
                                <Text style={styles.modalButtonText}>Generar factura</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={confirmLocationAndCloseModal}>
                                <Text style={styles.modalButtonText}>Terminar compra</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {showFactura && (
                <Factura
                    isVisible={showFactura}
                    onClose={() => setShowFactura(false)}
                    selectedLocation={selectedLocation}
                />
            )}
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 50,
        paddingVertical: 30,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButtonsContainer: {

    },
    modalButton: {
        backgroundColor: colors.red3,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 15,
        marginTop: 15,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'transparent',
        padding: 5,
    },
});

export default SelecciónUbicación;
