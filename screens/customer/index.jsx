import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import colors from '../../constants/colors';
import Categories from '../../components/categories';

const IndexScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [meats, setMeats] = useState([]);
    const [filteredMeats, setFilteredMeats] = useState([]);
    const [bestSeller, setBestSeller] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const initialMeats = [
            { id: '1', name: 'Filete de cerdo', price: 10, imageUrl: 'https://ensalpicadas.com/wp-content/uploads/2022/06/Filete-de-Cerdo-Jugoso-5.jpg', description: 'Delicioso filete de cerdo', },
            { id: '2', name: 'Costillas de cerdo', price: 10, imageUrl: 'https://carnivalmeatlab.com/wp-content/uploads/2021/06/Costillas-de-cerdo-SIN-NOMBRE.jpg', description: 'Sabrosas costillas de cerdo', },
            { id: '3', name: 'Cabeza de cerdo', price: 10, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Cabezadecerdo-04614.jpg', description: 'Cabeza de cerdo fresca', },
            { id: '4', name: 'Chuletas de cerdo', price: 10, imageUrl: 'https://espanol.kingsford.com/wp-content/uploads/2017/02/KFD_CiderBrinedPorkChopswithBrownSugarApplewoodBBQSauce35335_WEB.jpg', description: 'Jugosas chuletas de cerdo', },
            { id: '5', name: 'Carne molida de cerdo', price: 10, imageUrl: 'https://carnesrikatas.com/wp-content/uploads/2023/03/molida-de-cerdo-min-convert.io-1.webp', description: 'Carne molida de cerdo de alta calidad', },
        ];
        setMeats(initialMeats);
        setFilteredMeats(initialMeats);

        const obtenerProductoMasVendido = () => {
            return initialMeats[0];
        };

        const productoMasVendido = obtenerProductoMasVendido();
        setBestSeller(productoMasVendido);
    }, []);

    const handleSearch = () => {
        const filtered = meats.filter(meat => meat.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredMeats(filtered);
    };

    const handleSearchOnSubmit = () => {
        handleSearch();
        setSearchQuery('');
    };

    const MeatCard = ({ id, name, price, imageUrl, description, style, isBestSeller }) => (
        <TouchableOpacity onPress={() => handleCardPress(id, name, imageUrl, description, price)}>
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
        </TouchableOpacity>
    );

    const handleCardPress = (id, name, imageUrl, description, price) => {
        navigation.navigate('product', { id, name, imageUrl, description, price }); // Pasa todos los datos del producto como parámetros de navegación
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Buscar producto"
                        value={searchQuery}
                        onChangeText={text => setSearchQuery(text)}
                        onSubmitEditing={handleSearchOnSubmit}
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
                        id={bestSeller.id}
                        name={bestSeller.name}
                        imageUrl={bestSeller.imageUrl}
                        description={bestSeller.description}
                        price={bestSeller.price}
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
                            id={item.id}
                            name={item.name}
                            imageUrl={item.imageUrl}
                            description={item.description}
                            price={item.price}
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
        width: "150%",
        borderRadius: 0,
    },
    cardContent: {
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '65%',
        height: '100%',
    },
    bestSellerCardContent: {
        width: '100%',
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
