import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors';

const ProductScreen = ({ route }) => {
    const { name, price, imageUrl, description } = route.params;
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { name: 'Opción 1', cost: 10, description: 'Descripción de la opción 1' },
        { name: 'Opción 2', cost: 15, description: 'Descripción de la opción 2' },
        { name: 'Opción 3', cost: 20, description: 'Descripción de la opción 3' },
    ];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                <View style={styles.optionsContainer}>
                    <Text style={styles.selectLabel}>Preparaciones especiales</Text>
                    {options.map((option, index) => (
                        <View style={styles.options} key={index}>
                            <View style={styles.divider} />
                            <TouchableOpacity
                                style={[styles.optionButton, selectedOption === option && styles.selectedOption]}
                                onPress={() => handleOptionSelect(option)}
                            >
                                <View style={styles.radioButton}>
                                    {selectedOption === option && <View style={styles.radioButtonInner} />}
                                </View>
                                <View>
                                    <View style={styles.titleOptions}>
                                        <Text style={styles.optionName}>{option.name}</Text>
                                        <Text style={styles.optionCost}>${option.cost}</Text>
                                    </View>
                                    <Text style={styles.optionDescription}>{option.description}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
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
        paddingBottom: 150,
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
        backgroundColor: colors.white,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginHorizontal: 20,
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
    options: {
        width: '100%',
    },
    titleOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default ProductScreen;
