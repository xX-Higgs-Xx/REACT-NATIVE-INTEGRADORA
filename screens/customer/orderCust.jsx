import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import { API_URL } from '../../constants/config';
import colors from '../../constants/colors';

const OrderCust = ({ route }) => {
  const { id } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOrderProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/order/readAllForOrder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "id": id }),
        });
        const data = await response.json();
        if (data.status === 'OK') {
          setProducts(data.data);
        } else {
          console.error('Error en la respuesta del servidor:', data.error);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching order products:', error);
      }
    };

    fetchOrderProducts();
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Cargando pedido...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {products.map((item, index) => {
        const { productExtrasDto, total } = item;
        return (
          <View style={styles.card} key={index}>
            <ImageBackground source={{ uri: productExtrasDto?.productDto?.urlPhoto }} style={styles.cardBackground}>
              <View style={styles.cardContent}>
                <Text style={styles.title}>{productExtrasDto?.productDto?.name}</Text>
                <Text style={styles.text}>{productExtrasDto?.extraDto?.name}</Text>
                <Text style={styles.text}>Piezas: {total}</Text>
              </View>
            </ImageBackground>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#888',
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
    width: '85%',
  },
  cardBackground: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  cardContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
  },
});

export default OrderCust;
