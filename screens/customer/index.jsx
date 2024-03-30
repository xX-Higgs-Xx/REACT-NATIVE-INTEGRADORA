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

    // useEffect(() => {
    //     fetchMeatsFromAPI(); // Llama a la función para obtener los datos de la API
    // }, []);

    // const fetchMeatsFromAPI = async () => {
    //     try {
    //         const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZXJzb251cmliZUBnbWFpbC5jb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiYWRtaW4ifV0sImlhdCI6MTcxMTcyODQxMSwiZXhwIjoxNzEyMzMzMjExfQ.1N0U7Q279Z5EJzqYKzMt2q0d35yz3VCVI0e9DcqJy6E';

    //         const response = await fetch('http://192.168.100.52:8080/api/product/readProducts', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         const responseData = await response.json();

    //         if (responseData.status === "OK") {
    //             const data = responseData.data;
    //             const formattedData = data.map(item => ({
    //                 id: item.id,
    //                 name: item.name,
    //                 description: item.description,
    //                 imageUrl: item.urlPhoto,
    //                 quantity: item.quantity
    //             }));
    //             setMeats(formattedData);
    //             setFilteredMeats(formattedData);
    //             console.log(formattedData);

    //             const productoMasVendido = formattedData[0];
    //             setBestSeller(productoMasVendido);
    //         } else {
    //             console.error('Error en la carga de datos: ', responseData.mensaje);
    //         }
    //     } catch (error) {
    //         console.error('Error en la carga de datos: ', error);
    //     }
    // };



    // Datos simulados en lugar de la llamada a la API
    const simulatedData = [
        {
            id: 1,
            name: 'Simulated Meat 1',
            description: 'Simulated Description 1',
            imageUrl: 'https://ensalpicadas.com/wp-content/uploads/2022/06/Filete-de-Cerdo-Jugoso-5.jpg',
            quantity: 10
        },
        {
            id: 2,
            name: 'Simulated Meat 2',
            description: 'Simulated Description 2',
            imageUrl: 'https://ensalpicadas.com/wp-content/uploads/2022/06/Filete-de-Cerdo-Jugoso-5.jpg',
            quantity: 5
        },
        // Añade más datos simulados según sea necesario
    ];

    // Simulación de asignación de datos simulados
    useEffect(() => {
        // Establecer los datos simulados
        setMeats(simulatedData);
        setFilteredMeats(simulatedData);
    
        // Obtener el primer producto como el bestseller
        const firstProduct = simulatedData[0];
    
        // Establecer el bestseller en el estado
        setBestSeller(firstProduct);
    }, []);
    

    const handleSearch = () => {
        const filtered = meats.filter(meat => meat.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredMeats(filtered);
    };

    const handleSearchOnSubmit = () => {
        handleSearch();
        setSearchQuery('');
    };

    // Dentro de MeatCard, asegúrate de pasar el prop quantity
    const MeatCard = ({ id, name, price, imageUrl, description, quantity, style, isBestSeller }) => (
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
        navigation.navigate('product', { id, name, imageUrl, description, price });
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
                <Text style={styles.titulos}>Más vendido</Text>
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
                <Text style={styles.titulos}>Recomendado</Text>
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
        width: "120%",
        borderRadius: 0,
        marginHorizontal: -50
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
    }
});

export default IndexScreen;
