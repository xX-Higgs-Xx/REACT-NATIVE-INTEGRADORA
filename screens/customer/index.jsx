import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

const IndexScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [meats, setMeats] = useState([]);
    const [filteredMeats, setFilteredMeats] = useState([]);

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
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = meats.filter(meat => meat.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredMeats(filtered);
    };

    const MeatCard = ({ name, price, imageUrl }) => (
        <ImageBackground source={{ uri: imageUrl }} style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.price}>${price}</Text>
                </View>
                <TouchableOpacity style={styles.addButton}>
                    <FontAwesome6 name="plus" size={18} color="white" />
                    <Text style={styles.addButtonText}>Comprar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Buscar producto"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredMeats}
                renderItem={({ item }) => (
                    <MeatCard
                        name={item.name}
                        price={item.price}
                        imageUrl={item.imageUrl}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    titulos: {
        fontSize: 35,
        fontWeight: "bold",
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 40,
        marginVertical: 10,
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
    price: {
        fontSize: 16,
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
});

export default IndexScreen;
