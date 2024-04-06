import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../../constants/config';
import { Ionicons } from '@expo/vector-icons';

const ShoppingCart = () => {
  const navigation = useNavigation();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceEnv, setTotalPriceEnv] = useState(0);
  const [meats, setMeats] = useState([]);
  const [meatsName, setMeatsName] = useState({});
  const [meatsExtraName, setMeatsExtraName] = useState({});
  const [carnePrecioFijo, setCarnePrecioFijo] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantityInput, setQuantityInput] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchCartItems();
    fetchCarnePrecioFijo();
  }, []);

  const fetchCarnePrecioFijo = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/priceKg/readNow`);
      setCarnePrecioFijo(response.data.data.priceSale);
    } catch (error) {
      console.error('Error al obtener el precio fijo de la carne:', error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('idCarShop');
      const url = `${API_URL}/api/cardsitems/readForShop`;

      const response = await axios.post(url, { id: id }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      });

      setMeats(response.data.data);

      if (response.data.data.length > 0) {
        response.data.data.forEach(item => {
          const productExtras = item.productExtrasDto;
          const extraName = productExtras.extraDto.name;
          const productName = productExtras.productDto.name;
          const productUrlPhoto = productExtras.productDto.urlPhoto;

          setMeatsName(prevState => ({ ...prevState, [item.id]: { name: productName, urlPhoto: productUrlPhoto } }));
          setMeatsExtraName(prevState => ({ ...prevState, [item.id]: { name: extraName } }));
        });
      }

    } catch (error) {
      console.error('Error al obtener los datos del carrito:', error);
    }
  };

  useEffect(() => {
    if (meats.length > 0) {
      const total = meats.reduce((acc, meat) => {
        const extraPrice = meat.productExtrasDto.extraDto.price || 0;
        const quantity = meat.quantity || 0;
        const itemPrice = (carnePrecioFijo + extraPrice) * quantity;
        return acc + itemPrice;
      }, 0);
      setTotalPrice(total);
      setTotalPriceEnv(total + 35);
    }
  }, [meats, carnePrecioFijo]);

  const handleBuy = () => {
    navigation.navigate('selecUbi');
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleUpdateQuantity = async () => {
    try {
      if (!selectedItem) {
        console.error('No hay ningún artículo seleccionado para actualizar.');
        return;
      }

      const newQuantity = parseFloat(quantityInput);
      if (isNaN(newQuantity) || newQuantity <= 0) {
        console.error('La cantidad ingresada no es válida.');
        return;
      }

      const token = await AsyncStorage.getItem('token');
      const idCarShop = await AsyncStorage.getItem('idCarShop');

      const data = {
        id: selectedItem.id, // ID del elemento a actualizar
        quantity: newQuantity // Nueva cantidad
      };

      const response = await axios.put(`${API_URL}/api/cardsitems/update`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      });

      console.log(`actualizacion: `, response);
      // Verifica si la solicitud fue exitosa
      if (response.status === 200) {
        // Actualiza los datos locales (si es necesario)
        // Cierra el modal
        setIsModalVisible(false);
        // Vuelve a cargar los artículos del carrito para reflejar los cambios
        fetchCartItems();
      } else {
        console.error('Error al actualizar la cantidad del artículo:', response.data.message);
      }
    } catch (error) {
      console.error('Error al actualizar la cantidad del artículo:', error);
    }
  };

  const handleDeleteItem = async () => {
    try {
      if (!selectedItem) {
        console.error('No hay ningún artículo seleccionado para eliminar.');
        return;
      }

      const data = {
        id: selectedItem.id
      };

      const token = await AsyncStorage.getItem('token');
      console.log(selectedItem.id);

      const response = await fetch(`${API_URL}/api/cardsitems/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(data)
      });

      console.log('Eliminación exitosa:', response);

      if (response.status === 200) {
        setIsModalVisible(false); // Cierra el modal
        fetchCartItems(); // Recarga los datos del carrito
      } else {
        console.error('Error al eliminar el artículo:', response.data.message);
      }
    } catch (error) {
      console.error('Error al eliminar el artículo:', error);
    }
  };


  const handleCloseModal = () => {
    setIsModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={meats}
        renderItem={({ item }) => (
          <View key={item.id}>
            <View style={styles.card}>
              <Image source={{ uri: meatsName[item.id]?.urlPhoto }} style={styles.image} />
              <View style={styles.textContainer}>
                <View>
                  <Text style={styles.name}>{meatsName[item.id]?.name}</Text>
                  <Text style={styles.optionName}>{meatsExtraName[item.id]?.name}</Text>
                </View>
                <View style={styles.priceCount}>
                  <Text style={styles.optionPrice}>${(carnePrecioFijo + (item.productExtrasDto.extraDto.price || 0)) * item.quantity}</Text>
                  <View style={styles.quant}>
                    <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
                    <TouchableOpacity style={styles.buyButton} onPress={() => handleEditItem(item)}>
                      <Text style={styles.editButtonText}>Editar</Text>
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

      {/* Modal para editar la cantidad */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Ionicons name="close-circle" size={24} color={colors.red3} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Editar Cantidad</Text>
            <TextInput
              style={styles.input}
              placeholder="Cantidad"
              keyboardType="numeric"
              value={quantityInput}
              onChangeText={text => setQuantityInput(text)}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.buyButton} onPress={handleUpdateQuantity}>
                <Text style={styles.editButtonText}>Actualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buyButton} onPress={handleDeleteItem}>
                <Text style={styles.editButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
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
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
    padding: 5,
  },
});

export default ShoppingCart;