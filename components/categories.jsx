import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const items = [
    {
        image: { uri: "https://img.freepik.com/fotos-premium/lomo-cerdo-crudo-sal-hierbas_147620-312.jpg" },
        text: "Lomo y chuleta"
    },
    {
        image: { uri: "https://images.ecestaticos.com/hslsVqyIDWJ0qY3KaWKrkfbPLTw=/44x51:2054x1361/1440x1080/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F86f%2Fc0f%2F5a2%2F86fc0f5a241d3cacb6a1c586ac4d3d96.jpg" },
        text: "Cortes nobles"
    },
    {
        image: { uri: "https://enriquetomas.com/cdn/shop/articles/diferencia-entre-tocino-y-panceta.jpg?v=1690363223" },
        text: "Panceta y papada"
    },
    {
        image: { uri: "https://img.freepik.com/fotos-premium/lomo-cerdo-crudo-sal-hierbas_147620-312.jpg" },
        text: "Lomo y chuleta"
    },
    {
        image: { uri: "https://enriquetomas.com/cdn/shop/articles/diferencia-entre-tocino-y-panceta.jpg?v=1690363223" },
        text: "Panceta y papada"
    },
];

const Categories = () => {

    const urlCat = 'http://10.186.158.96:8080';
    
    const navigation = useNavigation();

    axios.get(`${urlCat}/api/category/readAll`).then((response) => {
        console.log('axios: ',response.data);
    });

    const goToCategoryP = (categoryName) => {
        navigation.navigate('CategoryP', { categoryName });
    };

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', height: 160 }}>
                {items.map((item, index) => (
                    <TouchableOpacity key={index} style={{ marginHorizontal: 15, height: 150 }} onPress={() => goToCategoryP(item.text)}>
                        <View>
                            <Image
                                source={item.image}
                                style={{
                                    width: 90,
                                    height: 90,
                                    marginBottom: 10,
                                    borderRadius: 20,
                                }}
                            />
                            <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>{item.text}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

export default Categories;
