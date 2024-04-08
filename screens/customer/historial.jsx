import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../constants/config';
import colors from '../../constants/colors';

const Record = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [ordersData, setOrdersData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const customerId = await AsyncStorage.getItem('customerId');
      const response = await fetch(`${API_URL}/api/order/readAllForCustomer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "idCustomer": customerId }),
      });
      const data = await response.json();
      console.log('ordenes', data.data);
      if (data.status === 'OK') {
        const sortedData = data.data.sort((a, b) => new Date(b.dateRequest) - new Date(a.dateRequest));
        setOrdersData(sortedData);
      } else {
        console.error('Error en la respuesta del servidor:', data.error);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos de los pedidos:', error);
    }
  };
  

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleOrderPress = (id, dateRequest, total) => {
    navigation.navigate('orderCust', { id, dateRequest, total });
  };

  const renderOrderCard = ({ item }) => {
    let barColor = 'transparent';
    let description = '';
    if (item.statusDto && item.statusDto.type) {
      switch (item.statusDto.type) {
        case 'Entregado':
          barColor = "#0e9f6e";
          description = item.statusDto.description;
          break;
        case 'Espera':
          barColor = "#FAAF22";
          description = item.statusDto.description;
          break;
        case 'Asignado':
          barColor = colors.red3;
          description = item.statusDto.description;
          break;
        case 'Rechazado':
          barColor = '#35343D';
          description = item.statusDto.description;
          break;
        default:
          barColor = 'transparent';
      }
    }

    return (
      <TouchableOpacity style={styles.card} onPress={() => handleOrderPress(item.id, item.dateRequest, item.total)}>
        <View style={styles.priceBar}>
          <Text style={styles.text1}>Pedido del:</Text>
          <Text style={styles.text}>{item.dateRequest}</Text>
        </View>
        <View style={styles.priceBar}>
          <Text style={styles.text1}>Total:</Text>
          <Text style={styles.text}>$ {item.total + 35}.00</Text>
        </View>
        <View style={styles.footer}>
          <View style={[styles.bar, { backgroundColor: barColor }]}>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={ordersData}
        renderItem={renderOrderCard}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 35,
    marginVertical: 15,
    marginHorizontal: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },
  text1: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 3,
  },
  text: {
    fontSize: 16,
    marginBottom: 3,
  },
  footer: {
    marginTop: 10,
    alignItems: 'center',
  },
  bar: {
    height: 30,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 14,
    color: '#fff',
  },
  priceBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
  }
});

export default Record;
