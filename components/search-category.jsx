import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Categories from './categories';
import { Foundation } from '@expo/vector-icons';
import colors from '../constants/colors';

const headerCat = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMeats, setFilteredMeats] = useState([]);

    const handleSearch = () => {
        const filtered = meats.filter(meat => meat.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredMeats(filtered);
    };
    const handleSearchOnSubmit = () => {
        handleSearch();
        // Limpia el campo de búsqueda después de presionar Enter
        setSearchQuery('');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} >
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
});

export default headerCat;
