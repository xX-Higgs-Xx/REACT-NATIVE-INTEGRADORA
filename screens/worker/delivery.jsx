import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView, ImageBackground, TextInput, Button } from 'react-native';
import colors from '../../constants/colors';
import Splash from '../all/splash';

const Delivery = () => {
    const [selectedMeat, setSelectedMeat] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true); // Estado para controlar si el splash está cargando
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [comments, setComments] = useState('');

    useEffect(() => {
      // Simula una carga inicial
      setTimeout(() => {
        setLoading(false); // Después de 2 segundos, establece el estado de carga en falso
      }, 2000); // 2000 milisegundos (2 segundos)
    }, []);

    if (loading) {
      return <Splash />; // Si loading es verdadero, muestra el splash screen
    }

    // Define la lista de productos fuera del componente de entrega
    const meats = [
      { id: '1', name: 'Filete de cerdo', price: 10.99, imageUrl: 'https://ensalpicadas.com/wp-content/uploads/2022/06/Filete-de-Cerdo-Jugoso-5.jpg'},
      { id: '2', name: 'Costillas de cerdo', price: 8.49, imageUrl: 'https://carnivalmeatlab.com/wp-content/uploads/2021/06/Costillas-de-cerdo-SIN-NOMBRE.jpg'},
      { id: '3', name: 'cabeza de cerdo', price: 6.99, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Cabezadecerdo-04614.jpg'},
      { id: '4', name: 'Chuletas de cerdo', price: 12.99, imageUrl: 'https://espanol.kingsford.com/wp-content/uploads/2017/02/KFD_CiderBrinedPorkChopswithBrownSugarApplewoodBBQSauce35335_WEB.jpg'},
      { id: '5', name: 'Carne molida de cerdo', price: 7.99, imageUrl: 'https://carnesrikatas.com/wp-content/uploads/2023/03/molida-de-cerdo-min-convert.io-1.webp'},
    ];

    // Calcula el total sumando los precios de todos los productos
    useEffect(() => {
      const total = meats.reduce((accumulator, current) => accumulator + current.price, 0);
      setTotalPrice(total);
    }, [meats]);

    const MeatCard = ({ name, price, imageUrl }) => {
      const handleSelectMeat = (selectedMeat) => {
        setSelectedMeat(selectedMeat);
      };

      return (
        <TouchableOpacity onPress={() => handleSelectMeat({ name, price, imageUrl })}>
          <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.price}>${price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    const handleDelivery = () => {
      // Lógica para entregar los productos
      // Aquí puedes enviar los productos seleccionados a una API o hacer cualquier otra acción necesaria
      setCommentModalVisible(true);
      console.log("Productos entregados:", selectedMeat);
      setSelectedMeat(null);
    };

    const handleReject = () => {
      setCommentModalVisible(true);
    };

    const handleSubmitComments = () => {
      console.log('Comentarios enviados:', comments);
      setCommentModalVisible(false);
      setComments('');
    };

    return (
      <View style={styles.container}>
        <FlatList
          data={meats}
          renderItem={({ item }) => (
            <MeatCard
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          )}
          keyExtractor={(item) => item.id}
        />

        <Modal visible={selectedMeat !== null} transparent={true} animationType="fade">
          <ImageBackground source={{ uri: selectedMeat?.imageUrl }} style={styles.modalBackgroundImage}>
            <View style={styles.modalContent}>
              <ScrollView contentContainerStyle={styles.modalScrollView}>
                <View style={styles.modalDescriptionContainer}>
                  <Text style={styles.name}>{selectedMeat?.name}</Text>
                  <Text style={styles.price}>${selectedMeat?.price}</Text>
                </View>
              </ScrollView>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setSelectedMeat(null)}>
                <Text style={styles.modalCloseButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Modal>

        <View style={styles.footer}>
          <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
          <TouchableOpacity style={styles.deliveryButton} onPress={handleDelivery}>
            <Text style={styles.deliveryButtonText}>Entregar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
            <Text style={styles.rejectButtonText}>Rechazar</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={commentModalVisible} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.commentModal}>
              <Text style={styles.commentTitle}>Comentarios</Text>
              <TextInput
                style={styles.commentInput}
                multiline={true}
                placeholder="Escribe tus comentarios aquí..."
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
  modalBackgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
  },
  modalScrollView: {
    flexGrow: 1,
  },
  modalDescriptionContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    height: 100,
    width: '100%',
    alignItems: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
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
    elevation: 5, // Esto es solo para Android
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deliveryButton: {
    backgroundColor: colors.red3,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
});

export default Delivery;
