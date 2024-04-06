import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/colors';
import { API_URL } from '../constants/config';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(`${API_URL}/api/category/readAll`, {
                    timeout: 10000,
                    headers: {
                        Authorization: token
                    }
                });
                setCategories(response.data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);

    const goToCategoryP = (categoryId, categoryName) => {
        navigation.navigate('CategoryP', { categoryId, categoryName });
    };

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', height: 150 }}>
                {Array.isArray(categories) && categories.map((category, index) => (
                    <TouchableOpacity key={index} style={{ marginHorizontal: 15, height: 110 }} onPress={() => goToCategoryP(category.id, category.name)}>
                        <View>
                            <Image
                                source={{ uri: category.urlPhoto }}
                                style={{
                                    width: 125,
                                    height: 60,
                                    marginBottom: 15,
                                    borderRadius: 20,
                                }}
                            />
                            <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: colors.grey }}>{category.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

export default Categories;
