import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors';

const ProductScreen = ({ route }) => {
    const { name, price, imageUrl, description } = route.params;
    const [selectedOption, setSelectedOption] = useState(null);

    const options = ['Opción 1', 'Opción 2', 'Opción 3'];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.price}>Precio: ${price}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.optionsContainer}>
                    <Text style={styles.selectLabel}>Selecciona una opción:</Text>
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.optionButton, selectedOption === option && styles.selectedOption]}
                            onPress={() => handleOptionSelect(option)}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.plusButton} >
                        <Text style={styles.plusButtonText}>Comprar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buyButton} >
                        <Text style={styles.buyButtonText}>Agregar</Text>
                    </TouchableOpacity>
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
        paddingBottom: 200, // Ajustado para el espacio del footer y el selector
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        borderBottomLeftRadius: 90,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
        fontSize: 18,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'left',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: colors.red4,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 100,
        borderRadius: 25,
        width: '100%',
    },
    optionsContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    selectLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    optionButton: {
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.red3,
    },
    selectedOption: {
        backgroundColor: colors.red3,
    },
    optionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.black,
    },
    divider: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '80%',
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
        marginHorizontal:20,
    },
    plusButton: {
        backgroundColor: colors.white,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginHorizontal:20,
    },
    buyButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
      },
    plusButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default ProductScreen;
