import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';

const items = [
    {
        image: { uri: "https://img.freepik.com/fotos-premium/lomo-cerdo-crudo-sal-hierbas_147620-312.jpg" },
        text: "Lomo y chuleta"
    },
    {
        image: { uri: "https://img.freepik.com/fotos-premium/lomo-cerdo-crudo-sal-hierbas_147620-312.jpg" },
        text: "Lomo y chuleta"
    },
    {
        image: { uri: "https://img.freepik.com/fotos-premium/lomo-cerdo-crudo-sal-hierbas_147620-312.jpg" },
        text: "Lomo y chuleta"
    },
    {
        image: { uri: "https://img.freepik.com/fotos-premium/lomo-cerdo-crudo-sal-hierbas_147620-312.jpg" },
        text: "Lomo y chuleta"
    },
    {
        image: { uri: "https://img.freepik.com/fotos-premium/lomo-cerdo-crudo-sal-hierbas_147620-312.jpg" },
        text: "Lomo y chuleta"
    },
];

const Categories = () => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', height: 160 }}>
                {items.map((item, index) => (
                    <View key={index} style={{ marginHorizontal: 15, height: 150 }}>
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
                ))}
            </View>
        </ScrollView>
    );
};

export default Categories;
