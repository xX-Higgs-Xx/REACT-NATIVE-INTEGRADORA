import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import colors from '../../constants/colors';
import Categories from '../../components/categories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../constants/config';

const CategoryP = ({ route }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Inicializar isLoading como true
    const navigation = useNavigation();
    const { categoryId, categoryName } = route.params;

    useEffect(() => {
        fetchProducts();
    }, [categoryId]);

    const fetchProducts = async () => {
        try {
            setRefreshing(true);
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/product/readCategoryClient`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                body: JSON.stringify({ "idCategory": categoryId }),
            });
            const data = await response.json();
            setProducts(data.data);
            setRefreshing(false);
            setIsLoading(false); // Cambiar isLoading a false una vez que los datos se hayan cargado
        } catch (error) {
            console.error('Error fetching products:', error);
            setRefreshing(false);
            setIsLoading(false); // En caso de error, también cambiar isLoading a false
        }
    };

    const handleCardPress = (id, name, imageUrl, description, quantity) => {
        navigation.navigate('product', { id, name, imageUrl, description, quantity });
    };

    const MeatCard = ({ id, name, imageUrl, description, quantity }) => (
        <TouchableOpacity onPress={() => handleCardPress(id, name, imageUrl, description, quantity)}>
            <ImageBackground source={{ uri: imageUrl }} style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{name}</Text>
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={() => handleCardPress(id, name, imageUrl, description, quantity)}>
                        <FontAwesome6 name="plus" size={18} color="white" />
                        <Text style={styles.addButtonText}>Comprar</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchProducts} />}
        >
            <View style={styles.container}>
                <Categories />
                <Text style={styles.categoryTitle}>{categoryName}</Text>
                {isLoading ? ( 
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.primary} />
                        <Text style={styles.loadingText}>Cargando datos...</Text>
                    </View>
                ) : (
                    <View style={styles.categoryContainer}>
                        <ScrollView contentContainerStyle={styles.scrollContainer}>
                        {products.map((item) => (
                        <MeatCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        imageUrl={item.urlPhoto}
                        description={item.description}
                        quantity={item.quantity}
                    />
                    ))}
                        </ScrollView>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        alignItems: 'center',
        paddingTop: 40,
    },
    categoryContainer: {
        width: "85%",
        marginTop: 15,
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
        height: 150,
        width: '100%',
    },
    cardContent: {
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '65%',
        height: '100%',
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
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    categoryTitle: {
        fontSize: 25,
        fontWeight: 'bold',
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

export default CategoryP;
