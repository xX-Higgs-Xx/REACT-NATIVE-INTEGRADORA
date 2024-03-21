import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import colors from '../../constants/colors';
import Categories from '../../components/categories';
//Como realizar el scrollview sin causar error por el FlatList
const CategoryP = ({ route }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { categoryName } = route.params;

    const products = {
        "Lomo y chuleta": [
            { id: 1, name: "Lomo de cerdo", imageUrl: 'https://ensalpicadas.com/wp-content/uploads/2022/06/Filete-de-Cerdo-Jugoso-5.jpg' },
            { id: 2, name: "Chuleta de cerdo", imageUrl: 'https://ensalpicadas.com/wp-content/uploads/2022/06/Filete-de-Cerdo-Jugoso-5.jpg' },
        ],
        "Cortes nobles": [
            { id: 3, name: "Filete de ternera", imageUrl: 'https://carnivalmeatlab.com/wp-content/uploads/2021/06/Costillas-de-cerdo-SIN-NOMBRE.jpg' },
            { id: 4, name: "Solomillo de cerdo", imageUrl: 'https://carnivalmeatlab.com/wp-content/uploads/2021/06/Costillas-de-cerdo-SIN-NOMBRE.jpg' },
        ],
        "Panceta y papada": [
            { id: 5, name: "Panceta de cerdo", imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Cabezadecerdo-04614.jpg' },
            { id: 6, name: "Papada de cerdo", imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Cabezadecerdo-04614.jpg' },
        ],
    };

    const MeatCard = ({ name, imageUrl, style }) => (
        <ImageBackground source={{ uri: imageUrl }} style={[styles.card, style]}>
            <View style={styles.cardContent}>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{name}</Text>
                </View>
                <TouchableOpacity style={styles.addButton}>
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
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={() => console.log("Search button pressed")}>
                        <Foundation name="magnifying-glass" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Categories />
                <Text style={styles.categoryTitle}>{categoryName}</Text>
                <View style={styles.categoryContainer}>
                    <FlatList
                        data={products[categoryName]}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <MeatCard
                                name={item.name}
                                imageUrl={item.imageUrl}
                            />
                        )}
                    />
                </View>
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
    categoryContainer: {
        width: "95%",
        marginTop: 10, // Ajusta este valor para controlar el espacio entre las categorías y el contenido
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
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
        width: 350,
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
});


export default CategoryP;
