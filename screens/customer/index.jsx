import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import colors from '../../constants/colors';
import Categories from '../../components/categories'; // Asumo que la importación del componente de categorías es correcta
//Como realizar el scrollview sin causar error por el FlatList
const IndexScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [meats, setMeats] = useState([]);
    const [filteredMeats, setFilteredMeats] = useState([]);
    const [bestSeller, setBestSeller] = useState(null);

    // Simulación de carga de datos
    useEffect(() => {
        // Aquí podrías cargar los datos de productos desde una API o alguna otra fuente
        const initialMeats = [
            { id: '1', name: 'Filete de cerdo', price: 10, imageUrl: 'https://ensalpicadas.com/wp-content/uploads/2022/06/Filete-de-Cerdo-Jugoso-5.jpg' },
            { id: '2', name: 'Costillas de cerdo', price: 10, imageUrl: 'https://carnivalmeatlab.com/wp-content/uploads/2021/06/Costillas-de-cerdo-SIN-NOMBRE.jpg' },
            { id: '3', name: 'Cabeza de cerdo', price: 10, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Cabezadecerdo-04614.jpg' },
            { id: '4', name: 'Chuletas de cerdo', price: 10, imageUrl: 'https://espanol.kingsford.com/wp-content/uploads/2017/02/KFD_CiderBrinedPorkChopswithBrownSugarApplewoodBBQSauce35335_WEB.jpg' },
            { id: '5', name: 'Carne molida de cerdo', price: 10, imageUrl: 'https://carnesrikatas.com/wp-content/uploads/2023/03/molida-de-cerdo-min-convert.io-1.webp' },
        ];
        setMeats(initialMeats);
        setFilteredMeats(initialMeats);

        // Simulación de consulta para el producto más vendido
        const obtenerProductoMasVendido = () => {
            // Por ahora, simularemos que el producto más vendido es el primer elemento del arreglo de productos
            return initialMeats[0];
        };

        // Obtener el producto más vendido
        const productoMasVendido = obtenerProductoMasVendido();
        setBestSeller(productoMasVendido);
    }, []);

    const handleSearch = () => {
        const filtered = meats.filter(meat => meat.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredMeats(filtered);
    };

    const handleSearchOnSubmit = () => {
        handleSearch();
        // Limpia el campo de búsqueda después de presionar Enter
        setSearchQuery('');
    };

    const MeatCard = ({ name, price, imageUrl, style, isBestSeller }) => (
        <ImageBackground source={{ uri: imageUrl }} style={[styles.card, style]}>
            <View style={[styles.cardContent, isBestSeller && styles.bestSellerCardContent]}>
                <View style={styles.textContainer}>
                    <Text style={[styles.name, isBestSeller && styles.bestSellerText]}>{name}</Text>
                </View>
                <TouchableOpacity style={[styles.addButton, isBestSeller && styles.bestSellerButton]}>
                    <FontAwesome6 name="plus" size={18} color="white" />
                    <Text style={styles.addButtonText}>Comprar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Buscar producto"
                        value={searchQuery}
                        onChangeText={text => setSearchQuery(text)}
                        onSubmitEditing={handleSearchOnSubmit} // Captura el evento de presionar Enter
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                        <Foundation name="magnifying-glass" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Categories />
                <Text style={styles.titulos}>
                    Más vendido
                </Text>
                {bestSeller && (
                    <MeatCard
                        name={bestSeller.name}
                        imageUrl={bestSeller.imageUrl}
                        style={styles.bestSellerCard}
                        isBestSeller={true}
                    />
                )}
                <Text style={styles.titulos}>
                    Recomendado
                </Text>
                <FlatList
                    data={filteredMeats}
                    renderItem={({ item }) => (
                        <MeatCard
                            name={item.name}
                            imageUrl={item.imageUrl}
                            style={styles.recommendedCard}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: colors.white,
        width: "80%",
        marginVertical: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        flex: 1,
        height: 40,
        paddingLeft: 10,
        backgroundColor: colors.white,
        borderRadius: 20,
        fontWeight: "700",
    },
    searchButton: {
        paddingHorizontal: 10,
    },
    titulos: {
        fontSize: 35,
        fontWeight: "bold",
        alignSelf: 'flex-start',
        marginLeft: 15,
    },
    card: {
        borderRadius: 40,
        marginVertical: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
        alignItems: 'flex-end',
        width: 350,
    },
    bestSellerCard: {
        height: 400,
        width: "100%",
        borderRadius: 0,
    },
    cardContent: {
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '65%',
        height: '100%',
    },
    bestSellerCardContent: {
        width: '100%', // Hacer que el contenido de la tarjeta del producto más vendido abarque toda la tarjeta
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '15%'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    addButton: {
        backgroundColor: '#272727',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 15,
        paddingEnd: 40,
        paddingStart: 25,
        borderTopLeftRadius: 50,
    },
    bestSellerButton: {
        backgroundColor: colors.red3,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    recommendedCard: {
        height: 150,
    },
    bestSellerText: {
        fontSize: 30,

    }
});

export default IndexScreen;
