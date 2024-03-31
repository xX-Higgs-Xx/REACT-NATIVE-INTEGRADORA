import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import colors from '../../constants/colors';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductScreen = ({ route }) => {
    const { id, name, imageUrl, description, quantity } = route.params;
    const pricePerKilo = 50; // Precio por kilo definido
    const price = pricePerKilo; // Precio base
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [number, setNumber] = useState('1');
    const [idCartShop, setIdCartShop] = useState(null);
    const [totalPrice, setTotalPrice] = useState(price);


    useEffect(() => {
        fetchOptions();
        getCartId();
    }, []);

    useEffect(() => {
        calculateTotalPrice();
    }, [number, selectedOption]);

    const fetchOptions = async () => {
        try {
            const response = await fetch('http://10.186.158.96:8080/api/extras/readForProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            });
            const responseData = await response.json();

            if (responseData.status === "OK") {
                setOptions(responseData.data);
            } else {
                console.error('Error en la carga de opciones: ', responseData.mensaje);
            }
        } catch (error) {
            console.error('Error en la carga de opciones: ', error);
        }
    };

    const getCartId = async () => {
        try {
            const id = await AsyncStorage.getItem('idCarShop');
            if (id) {
                setIdCartShop(id);
            } else {
                Alert.alert('Error', 'No se pudo obtener el ID del carrito de la tienda.');
            }
        } catch (error) {
            console.error('Error al obtener el ID del carrito de la tienda: ', error);
        }
    };

    const incrementNumber = () => {
        const newNumber = parseInt(number) + 1;
        setNumber(newNumber.toString());
    };

    const decrementNumber = () => {
        const newNumber = parseInt(number) - 1;
        if (newNumber >= 1) {
            setNumber(newNumber.toString());
        }
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const calculateTotalPrice = () => {
        let basePrice = price * parseInt(number);
        let optionPrice = selectedOption ? selectedOption.price * parseInt(number) : 0;
        setTotalPrice(basePrice + optionPrice);
    };

    const addToCart = async () => {
        try {
            console.log(quantity);
            // Verificar si la cantidad deseada excede las existencias disponibles
            if (quantity && parseInt(number) > quantity) {
                Alert.alert('Error', 'La cantidad deseada excede las existencias disponibles.');
                return; // Salir de la función sin agregar al carrito
            }
    
            if (selectedOption) {
                const productToAdd = {
                    idProductExtra: selectedOption.id,
                    quantity: parseInt(number),
                    carId: idCartShop
                };
                console.log('cantidad', quantity);
                console.log(productToAdd);
                const response = await fetch('http://10.186.158.96:8080/api/cardsitems/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productToAdd)
                });
                const responseData = await response.json();
                console.log('Respuesta del servidor:', responseData);
            } else {
                alert('Se debe seleccionar una preparación especial.');
            }
        } catch (error) {
            console.error('Error al agregar el producto al carrito: ', error);
        }
    };
    

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.quantity}>En existencia: {quantity}</Text>
                </View>
                <View style={styles.optionsContainer}>
                    <Text style={styles.selectLabel}>Preparaciones especiales</Text>
                    {options.map((option, index) => (
                        <View style={styles.options} key={index}>
                            <View style={styles.divider} />
                            <TouchableOpacity
                                style={[styles.optionButton, selectedOption === option]}
                                onPress={() => handleOptionSelect(option)}
                            >
                                <View style={styles.radioButton}>
                                    {selectedOption === option && styles.selectedOption && <View style={styles.radioButtonInner} />}
                                </View>
                                <View style={styles.textContainer}>
                                    <View style={styles.titleOptions}>
                                        <Text style={styles.optionName}>{option.name}</Text>
                                        <Text style={styles.optionCost}>${option.price} x kg</Text>
                                    </View>
                                    <Text style={styles.optionDescription}>{option.description}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <View>
                    <Text style={styles.basePrice}>Precio de la carne: ${price * parseInt(number)}</Text>
                    <Text style={styles.optionPrice}>Precio del extra: ${selectedOption ? selectedOption.price * parseInt(number) : 0}</Text>
                    <Text style={styles.totalPrice}>Precio total: ${totalPrice ? totalPrice.toFixed(2) : 0}</Text>
                </View>

                <View style={styles.Buttons}>
                    <View style={styles.buttonContainer}>
                        <View style={styles.plusButton}>
                            <TouchableOpacity onPress={decrementNumber}>
                                <Entypo name="minus" size={24} color="black" style={styles.plusMinusButon} />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.plusButtonText}
                                onChangeText={(text) => {
                                    let newText = '';
                                    for (let i = 0; i < text.length; i++) {
                                        if ('0123456789'.includes(text[i])) {
                                            newText += text[i];
                                        }
                                    }
                                    setNumber(newText);
                                }}
                                value={number}
                                placeholder="1"
                                keyboardType="numeric"
                            />

                            <TouchableOpacity onPress={incrementNumber}>
                                <Entypo name="plus" size={24} color="black" style={styles.plusMinusButon} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.buyButton}
                            onPress={addToCart}
                        >
                            <Text style={styles.buyButtonText}>Agregar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f1f1f1',
        paddingBottom: 200,
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        borderBottomLeftRadius: 90,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    infoContainer: {
        alignItems: 'left',
        width: '80%'
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    price: {
        fontSize: 28,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'left',
    },
    quantity: {
        fontSize: 12,
        marginTop: 15,
        color: colors.red3,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 190,
        width: '100%',
        borderRadius: 25,
    },
    Buttons: {
        flexDirection: 'row',
    },
    optionsContainer: {
        alignItems: 'left',
        marginTop: 20,
        width: '70%',
    },
    selectLabel: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 10,
    },
    selectedOption: {
        backgroundColor: colors.red3,
    },
    optionName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 5,
    },
    optionDescription: {
        fontSize: 14,
        color: colors.gray,
        marginBottom: 5,
    },
    optionCost: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.red3,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.red3,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.red3,
    },
    divider: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    buyButton: {
        backgroundColor: colors.red3,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginHorizontal: 20,
    },
    plusButton: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 20,
    },
    plusButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 15,
    },
    plusMinusButon: {
        paddingHorizontal: 10,
    },
    buyButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    options: {
        width: '100%',
    },
    titleOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    textContainer: {
        width: '90%'
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    basePrice: {
        fontSize: 16,
        marginBottom: 5,
    },
    optionPrice: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default ProductScreen;
