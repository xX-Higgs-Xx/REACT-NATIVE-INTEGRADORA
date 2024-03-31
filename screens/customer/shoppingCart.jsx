import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView, ImageBackground, TextInput, Button } from 'react-native';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ShoppingCart = () => {
  const navigation = useNavigation();
  const [selectedMeat, setSelectedMeat] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceEnv, setTotalPriceEnv] = useState(0);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [comments, setComments] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [meats, setMeats] = useState([]);
  
  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleCloseModal = () => {
    setCommentModalVisible(false);
    setComments('');
  };


  const fetchCartItems = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('idCarShop');
      const url = 'http://10.186.158.96:8080/api/cardsitems/readForShop';
      const response = await fetch('http://10.186.158.96:8080/api/cardsitems/readForShop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ id: id })
      });

      axios({
        method: 'post',
        url: url,
        data: {id: id}
      }).then((response) => {
        console.log('axios: ',response.data.data[0].productExtrasDto);
        setMeats(response.data.data[0].productExtrasDto);
      });
  
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
  
      const data = await response.json();
      //console.log('Respuesta del servidor:', data); // Imprimir la respuesta del servidor en la consola
      //setMeats(data.data); // Establecer los datos del carrito obtenidos del servidor
  
    } catch (error) {
      console.error('Error al obtener los datos del carrito:', error);
    }
  };
  
  

  useEffect(() => {
    if (meats.length > 0) {
      const total = meats.reduce((acc, meat) => acc + meat.quantity * meat.price, 0);
      setTotalPrice(total);
      setTotalPriceEnv(total + 35);
    }
  }, [meats]);

  const handleBuy = () => {
    navigation.navigate('selecUbi'); // Navegar a la pantalla de selección de ubicación
  };

  const handleSubmitComments = () => {
    console.log('Comentarios enviados:', comments);
    navigation.navigate('Orders'); // Redirigir a la pantalla de pedidos
    setCommentModalVisible(false);
    setComments('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={meats}
        renderItem={({ item }) => (
          <View key={item.id}>
            <View style={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <View style={styles.textContainer}>
                <View>
                  <Text style={styles.name}>{item.productName}</Text>
                  <Text style={styles.optionName}>{item.optionName}</Text>
                </View>
                <View style={styles.priceCount}>
                  <Text style={styles.optionPrice}>${item.price}</Text>
                  <View style={styles.quant}>
                    <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
                    <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
                      <Text style={styles.buyButtonText}>Editar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.divider} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={styles.footer}>
        <Text style={styles.totalPrice}>PRODUCTOS:    ${totalPrice.toFixed(2)}</Text>
        <Text style={styles.totalPrice}>ENVIO:                   $35.00</Text>
        <View style={styles.divider} />
        <Text style={styles.totalPrice}>PRODUCTOS:    ${totalPriceEnv.toFixed(2)}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
            <Text style={styles.buyButtonText}>Comprar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={commentModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.commentModal}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Ionicons name="close-circle" size={24} color={colors.red3} />
            </TouchableOpacity>
            <Text style={styles.commentTitle}>Comentarios</Text>
            <TextInput
              style={styles.commentInput}
              multiline={true}
              value={comments}
              onChangeText={text => setComments(text)}
            />
            <Button title="Enviar" onPress={handleSubmitComments} />
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 20,
    marginHorizontal: 20,
  },
  image: {
    width: '40%',
    height: 120,
    borderRadius: 10,
  },
  textContainer: {
    padding: 10,
    width: '100%',
    justifyContent: "space-around",
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  footer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 280,
    borderRadius: 25,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  deliveryButton: {
    backgroundColor: colors.red3,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  deliveryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: colors.red3,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentModal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
  },
  commentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 20,
  },
  priceCount: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 15,
  },
  quant: {
    alignItems: 'center',
    justifyContent: 'flex-start' 
  },
  quantity: {
    marginBottom: 10,
  }
});

export default ShoppingCart;