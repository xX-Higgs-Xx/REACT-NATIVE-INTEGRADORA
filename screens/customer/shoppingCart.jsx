import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ShoppingCart = () => {
  const navigation = useNavigation();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceEnv, setTotalPriceEnv] = useState(0);
  const [meats, setMeats] = useState([]);
  const [meatsName, setMeatsName] = useState({});
  const [meatsExtraName, setMeatsExtraName] = useState({});
  const [carnePrecioFijo, setCarnePrecioFijo] = useState(0);

  useEffect(() => {
    fetchCartItems();
    fetchCarnePrecioFijo();
  }, []);

  const fetchCarnePrecioFijo = async () => {
    try {
      const response = await axios.get('http://192.168.110.170:8080/api/priceKg/readNow');
      setCarnePrecioFijo(response.data.data.priceSale);
    } catch (error) {
      console.error('Error al obtener el precio fijo de la carne:', error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('idCarShop');
      const url = 'http://192.168.110.170:8080/api/cardsitems/readForShop';

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
  }
});

export default ShoppingCart;
