import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, Button, TextInput, Modal, TouchableOpacity } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './config';
import axios from 'axios';

const Factura = ({ isVisible, onClose, selectedLocation }) => {
  const [rfc, setRFC] = useState("");
  const [meats, setMeats] = useState([]);
  const [meatsName, setMeatsName] = useState({});
  const [meatsExtraName, setMeatsExtraName] = useState({});
  const [carnePrecioFijo, setCarnePrecioFijo] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const preEnv = 35;

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const confirmLocation = async () => {
    const carShopId = await AsyncStorage.getItem('idCarShop');
    if (selectedLocation && carShopId) {
      const { latitude, longitude } = selectedLocation;

      const body = JSON.stringify({
        latitue: latitude,
        longitude: longitude,
        idCarShop: carShopId
      });

      console.log(body);
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        const response = await fetch(`${API_URL}/api/order/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          },
          body: body
        });
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        Alert.alert('Pedido en curso', 'Puedes ver tu pedido en el historial.');
        navigation.navigate('Index');
      } catch (error) {
        console.error('Error al enviar los datos:', error);
        Alert.alert('Error', 'Hubo un error al enviar los datos.');
      }
    } else {
      Alert.alert('Error', 'Por favor, selecciona una ubicación en el mapa y asegúrate de tener un carrito activo.');
    }
  };

  useEffect(() => {
    // Función para obtener datos del carrito
    const fetchData = async () => {
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

            setMeatsName(prevState => ({ ...prevState, [item.id]: { name: productName } }));
            setMeatsExtraName(prevState => ({ ...prevState, [item.id]: { name: extraName } }));
          });
        }

        fetchCarnePrecioFijo();

      } catch (error) {
        console.error('Error al obtener los datos del carrito:', error);
      }
    };

    fetchData();
  }, []);

  const fetchCarnePrecioFijo = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/priceKg/readNow`);
      setCarnePrecioFijo(response.data.data.priceSale);
    } catch (error) {
      console.error('Error al obtener el precio fijo de la carne:', error);
    }
  };

  useEffect(() => {
    const totalPriceSum = meats.reduce((acc, meat) => {
      const extraPrice = meat.productExtrasDto.extraDto.price || 0;
      const quantity = meat.quantity || 0;
      const itemPrice = (carnePrecioFijo + extraPrice) * quantity;
      return acc + itemPrice;
    }, 0);
    setTotalPrice(totalPriceSum);
  }, [meats, carnePrecioFijo]);


  const generatePdf = async () => {
    try {
      const html = `
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SWIFCUT Factura</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
      }
  
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        text-color: black;
      }
  
      .logo img {
        background-color: #FFFFFF;
        max-width: 100px;

      }
  
      .contact-info p {
        margin: 5px 0;
      }
  
      main {
        background-color: #FFFFFF;
        padding: 20px;
        border-radius: 5px;
      }
  
      h1 {
        text-align: left;
        margin-bottom: 20px;
      }
  
      .client-info {
        float: right;
        width: 50%;
        text-align: right;
        
      }
  
      .invoice-info {
        float: left;
        width: 50%;
      }
  
  
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
  
      th, td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }
  
      .totals {
        margin-bottom: 20px;
      }
  
      .terms h3 {
        margin-bottom: 10px;
      }
  
      footer .logo {
        margin-top: 10px;
        display: flex;
        align-items: center;
        float: right; 
      }
  
      footer .contact-info p {
        margin: 5px;
      }
    </style>
  </head>
  <body>
    <header>
      <div class="logo">
      <svg></svg>
      </div>
      <div class="contact-info">
        <p>www.SWIFTCUT.com</p>
        <p>swiftcut@gmail.com</p>
        <p>Morelos 66214</p>
        <p>Tel: 913-538-0999</p>
      </div>
    </header>
  
    <main>
      <h1>Factura</h1>
      <div class="invoice-info">
        <p> Fecha de facturacion: 07/04/2024 </p>
        <p>Cantidad debida: $${totalPrice.toFixed(2)}</p>
      </div>
  
      <div class="client-info">
        <p>Factura para:</p>
        <p>Nombre: Jared</p>
        <P>RFC: ${rfc}</P>
        <p>Direccion: Paseos de las arboleadas #11</p>
        <p>Numero de telefono: 7771429870</p>
      </div>
  
      <table class="product-table">
      <thead>
        <tr>
          <th>Descripción de productos</th>
          <th>Precio unitario</th>
          <th>Cantidad</th>
          <th>Precio total</th>
        </tr>
      </thead>
      <tbody class="data">
        ${meats.map((meat, index) => `
          <tr key=${index}>
            <td>${meatsName[meat.id].name} - ${meatsExtraName[meat.id].name}</td>
            <td>${(carnePrecioFijo + meat.productExtrasDto.extraDto.price).toFixed(2)}</td>
            <td>${meat.quantity}</td>
            <td>${((carnePrecioFijo + meat.productExtrasDto.extraDto.price) * meat.quantity).toFixed(2)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <table class="totals">
      <tr>
        <td>Total:</td>
        <td>${totalPrice.toFixed(2)}</td>
      </tr>
    </table>  
      <div class="terms">
        <h3>Terminos y Condiciones</h3>
        <p>El saldo adeudado se paga en 14 días a partir de la fecha de esta factura.</p>
        <p>Metodo de pago:</p>
        <p>PayPal: 123456@gmail.com</p>
        <p>Numero de  cuenta: 1123-112234-3345665543</p>
      </div>

      <footer>
      <div class="logo">
      <svg></svg>
      </div>
    </footer>
    </main>
  </body>
  </html>
  
  `;
      const file = await printToFileAsync({
        html: html,
        base64: false
      });

      // Compartir el PDF
      await shareAsync(file.uri);

      // Confirmar la ubicación seleccionada
      if (selectedLocation) {
        const { latitude, longitude } = selectedLocation;
        const idCarShop = await AsyncStorage.getItem('idCarShop');

        const body = JSON.stringify({
          latitude: latitude,
          longitude: longitude,
          idCarShop: idCarShop
        });

        try {
          const token = await AsyncStorage.getItem('token');
          const response = await fetch(`${API_URL}/api/order/add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token
            },
            body: body
          });
          const data = await response.json();
          console.log('Respuesta del servidor:', data);
          Alert.alert('Pedido en curso', 'Puedes ver tu pedido en el historial.');
          onClose(); // Cerrar el modal después de confirmar la ubicación
        } catch (error) {
          console.error('Error al enviar los datos:', error);
          Alert.alert('Error', 'Hubo un error al enviar los datos.');
        }
      } else {
        Alert.alert('Error', 'Por favor, selecciona una ubicación en el mapa antes de generar la factura.');
      }

    } catch (error) {
      console.error('Error al generar o compartir el PDF:', error);
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>Cerrar</Text>
          </TouchableOpacity>
          <View style={styles.container}>
            <TextInput
              value={rfc}
              placeholder='RFC'
              style={styles.textInput}
              onChangeText={(value) => setRFC(value)}
            />
            <Button title='Generar PDF' onPress={generatePdf}></Button>
            <Button title='Cancelar' onPress={closeModal}></Button>
            <StatusBar style="auto" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default Factura;