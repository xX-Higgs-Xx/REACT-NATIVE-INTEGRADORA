import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import { API_URL } from '../../constants/config';

const ProfileCust = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const customerId = await AsyncStorage.getItem('customerId');
        const response = await fetch(`${API_URL}/api/customer/read`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({ "id": customerId }),
        });
        const data = await response.json();
        console.log('datos profile: ', data);
        if (data.status === 'OK' && data.data) { // Verificar si 'data.data' no es nulo
          setUserData(data.data);
          setName(data.data.personDto.name);
          setLastName(data.data.personDto.lastName);
          setPhone(data.data.personDto.phone);
          setEmail(data.data.email);
        } else {
          console.error('Error en la respuesta del servidor:', data.error);
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchData();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const customerId = await AsyncStorage.getItem('customerId');
      const response = await fetch(`${API_URL}/api/customer/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          id: customerId,
          name,
          lastName,
          phone,
          email,
        }),
      });
      const data = await response.json();
      console.log('Respuesta del servidor al guardar cambios:', data);
      setMessage('Datos actualizados exitosamente');
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Cargando datos del usuario...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: userData.personDto.urlPhoto }} style={styles.profileImage} />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Apellido:</Text>
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={lastName}
          onChangeText={setLastName}
        />
        <Text style={styles.label}>Teléfono:</Text>
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={phone}
          onChangeText={setPhone}
        />
        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Guardar cambios" onPress={handleSaveChanges} />
        <Button title="Cerrar sesión" onPress={handleLogout} />
      </View>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 180,
    height: 180,
    marginBottom: 20,
    borderRadius: 90,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    marginVertical: 15,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginVertical: 20,
  },
  message: {
    color: 'green',
    marginTop: 10,
  },
});

export default ProfileCust;
