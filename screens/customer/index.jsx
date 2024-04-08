import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import colors from '../../constants/colors';
import Categories from '../../components/categories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../constants/config';

const IndexScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [meats, setMeats] = useState([]);
    const [filteredMeats, setFilteredMeats] = useState([]);
    const [bestSeller, setBestSeller] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        fetchMeatsFromAPI();
        retrieveToken();
    }, []);

    const fetchMeatsFromAPI = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            const response = await fetch(`${API_URL}/api/product/readProducts`, {
                headers: {
                    Authorization: token
                }
            });
            const responseData = await response.json();

            if (responseData.status === "OK") {
                const data = responseData.data;
                const formattedData = data.map(item => ({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    imageUrl: item.urlPhoto,
                    quantity: item.quantity
                }));
                setMeats(formattedData);
                setFilteredMeats(formattedData);

                const productoMasVendido = formattedData[0];
                setBestSeller(productoMasVendido);
                setIsLoading(false); // Cambia el estado de isLoading a falso cuando se completó la carga de datos
            } else {
                console.error('Error en la carga de datos: ', responseData.mensaje);
            }
        } catch (error) {
            console.error('Error en la carga de datos: ', error);
        }
    };

    const retrieveToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
        } catch (error) {
            console.error('Error al recuperar el token:', error);
        }
    };

    const handleSearch = () => {
        const filtered = meats.filter(meat => meat.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredMeats(filtered);
    };

    const handleSearchOnSubmit = () => {
        handleSearch();
        setSearchQuery('');
    };

    const MeatCard = ({ id, name, imageUrl, description, quantity, style, isBestSeller }) => (
        <TouchableOpacity onPress={() => handleCardPress(id, name, imageUrl, description, quantity)}>
            <ImageBackground source={{ uri: imageUrl }} style={[styles.card, style]}>
                <View style={[styles.cardContent, isBestSeller && styles.bestSellerCardContent]}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.name, isBestSeller && styles.bestSellerText]}>{name}</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.addButton, isBestSeller && styles.bestSellerButton]}
                        onPress={() => handleCardPress(id, name, imageUrl, description, quantity)}
                    >
                        <FontAwesome6 name="plus" size={18} color="white" />
                        <Text style={styles.addButtonText}>Comprar</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

    const handleCardPress = (id, name, imageUrl, description, quantity) => {
        navigation.navigate('product', { id, name, imageUrl, description, quantity });
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchMeatsFromAPI();
        setRefreshing(false);
    };

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.loadingText}>Cargando datos...</Text>
                </View>
            ) : (
                <View style={styles.container}>
                    <Categories />
                    <Text style={styles.titulos}>Más vendido</Text>
                    {bestSeller && (
                        <MeatCard
                            id={bestSeller.id}
                            name={bestSeller.name}
                            imageUrl={bestSeller.imageUrl}
                            quantity={bestSeller.quantity}
                            description={bestSeller.description}
                            style={styles.bestSellerCard}
                            isBestSeller={true}
                            onPress={() => handleCardPress(bestSeller.id, bestSeller.name, bestSeller.imageUrl, bestSeller.description, bestSeller.quantity)}
                        />
                    )}
                    <Text style={styles.titulos}>Recomendado</Text>
                    <FlatList
                        data={filteredMeats.slice(1)} // Excluir el primer elemento (más vendido)
                        renderItem={({ item }) => (
                            <MeatCard
                                id={item.id}
                                name={item.name}
                                quantity={item.quantity}
                                imageUrl={item.imageUrl}
                                description={item.description}
                                style={styles.recommendedCard}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            )}
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
        paddingTop: 40,
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
        width: "180%",
        borderRadius: 0,
    },
    cardContent: {
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '65%',
        height: '100%',
    },
    bestSellerCardContent: {
        width: '98%',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '15%',
    },
    name: {
        fontSize: 25,
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
        fontSize: 60,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
    },
});

export default IndexScreen;
