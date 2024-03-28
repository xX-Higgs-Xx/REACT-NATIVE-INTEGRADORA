import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderCust = ({ route }) => {
  const { pedido, detalle } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pedido: {pedido}</Text>
      <Text style={styles.text}>Detalle: {detalle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default OrderCust;
