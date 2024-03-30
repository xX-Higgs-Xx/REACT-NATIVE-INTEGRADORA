import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Record = () => {
  const navigation = useNavigation();

  // Datos de ejemplo de los pedidos con latitud y longitud
  const ordersData = [
    { pedido: 1, fecha: '19/12/2024', status: 'Terminado' }, 
    { pedido: 2, fecha: '20/12/2024', status: 'Terminado' }, 
    { pedido: 3, fecha: '21/12/2024', status: 'Terminado' }, 
    { pedido: 4, fecha: '22/12/2024', status: 'Terminado' }, 
  ];

  // Filtrar los pedidos con estado "Terminado"
  const ordersInProgress = ordersData.filter(item => item.status === 'Terminado');

  // Función para manejar la navegación a la pantalla de pedido con el detalle del pedido
  const handleOrderPress = (fecha) => {
    navigation.navigate('orderCust', { fecha });
  };

  // Renderizar una tarjeta de pedido
  const renderOrderCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleOrderPress(item.fecha)}>
      <Text style={styles.text1}>Pedido del:</Text>
      <Text style={styles.text}>{item.fecha}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={ordersInProgress}
        renderItem={renderOrderCard}
        keyExtractor={(item) => item.pedido.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default Record;
