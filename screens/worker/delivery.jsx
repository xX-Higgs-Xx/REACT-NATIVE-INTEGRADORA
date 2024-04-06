import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView, ImageBackground, TextInput, Button } from 'react-native';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Delivery = () => {
    const navigation = useNavigation();
    const [selectedMeat, setSelectedMeat] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [comments, setComments] = useState('');
    const [deliveryStatus, setDeliveryStatus] = useState(''); 
    
    const handleCloseModal = () => {
      setCommentModalVisible(false);
      setComments('');
    };

    const meats = [
      { id: '1', name: 'Filete de cerdo', price: 10, imageUrl: 'https://ensalpicadas.com/wp-content/uploads/2022/06/Filete-de-Cerdo-Jugoso-5.jpg'},
      { id: '2', name: 'Costillas de cerdo', price: 10, imageUrl: 'https://carnivalmeatlab.com/wp-content/uploads/2021/06/Costillas-de-cerdo-SIN-NOMBRE.jpg'},
      { id: '3', name: 'Cabeza de cerdo', price: 10, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Cabezadecerdo-04614.jpg'},
      { id: '4', name: 'Chuletas de cerdo', price: 10, imageUrl: 'https://espanol.kingsford.com/wp-content/uploads/2017/02/KFD_CiderBrinedPorkChopswithBrownSugarApplewoodBBQSauce35335_WEB.jpg'},
      { id: '5', name: 'Carne molida de cerdo', price: 10, imageUrl: 'https://carnesrikatas.com/wp-content/uploads/2023/03/molida-de-cerdo-min-convert.io-1.webp'},
    ];

    useEffect(() => {
      if (meats.length > 0) {
        const total = meats.reduce((acc, meat) => acc + meat.price, 0);
        setTotalPrice(total);
      }
    }, [meats]);

    const handleDelivery = () => {
      setDeliveryStatus('Entregado');
      setCommentModalVisible(true);
      setSelectedMeat(null);
    };

    const handleReject = () => {
      setDeliveryStatus('Rechazado');
      setCommentModalVisible(true);
    };

    const handleSubmitComments = () => {
      console.log('Comentarios enviados:', comments);
      // Aquí deberías enviar los comentarios junto con el estado de entrega al backend
      navigation.navigate('Orders'); // Redirigir a la pantalla de pedidos
      setCommentModalVisible(false);
      setComments('');
    };

    return (
      <View style={styles.container}>
        <FlatList
          data={meats}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={styles.card}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.footer}>
          <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.deliveryButton} onPress={handleDelivery}>
              <Text style={styles.deliveryButtonText}>Entregar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
              <Text style={styles.rejectButtonText}>Rechazar</Text>
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
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    padding: 10,
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
    backgroundColor: '#f0f0f0',
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  rejectButton: {
    backgroundColor: colors.red3,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  rejectButtonText: {
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
});

export default Delivery;
