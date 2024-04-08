import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../constants/config';
import colors from '../../constants/colors';
import * as ImagePicker from 'expo-image-picker'; // Importar ImagePicker desde Expo

const ProfileCust = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null); // Estado para almacenar la imagen
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
        if (data.status === 'OK' && data.data) {
          setUserData(data.data);
          setName(data.data.personDto.name);
          setLastName(data.data.personDto.lastName);
          setPhone(data.data.personDto.phone);
          setEmail(data.data.email);
        } else {
          console.error('Error en la respuesta del servidor:', data.error);
        }
        setIsLoading(false);
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
      const formData = new FormData();
      formData.append('id', customerId);
      formData.append('name', name);
      formData.append('lastName', lastName);
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('password', password);
      if (image) {
        const localUri = image;
        const filename = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        formData.append('image', { uri: localUri, name: filename, type });
      }
      const response = await fetch(`${API_URL}/api/customer/update`, {
        method: 'PUT',
        headers: {
          Authorization: token,
        },
        body: formData,
      });
      const data = await response.json();
      console.log('Respuesta del servidor al guardar cambios:', data);
      setMessage('Datos actualizados exitosamente');
      Alert.alert('Éxito', 'Los datos se han guardado correctamente.');
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      maxFileSize: 5 * 1024 * 1024,
    });
    setImage(result.assets[0].uri);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }

  const handleGoToHistory = () => {
    navigation.navigate('record');
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {image ? <Image source={{ uri: image }} style={styles.profileImage} /> : <Image source={{ uri: userData.personDto.urlPhoto }} style={styles.profileImage} />}
            <Text style={styles.imagePickerText}>Seleccionar imagen</Text>
          </TouchableOpacity>
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
              keyboardType="number-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <Text style={styles.label}>Correo electrónico:</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry={true}
              value={password}
              onChangeText={handlePasswordChange}
            />
            <Text style={styles.label}>Confirmar Contraseña:</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirmar Contraseña"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Guardar cambios" onPress={handleSaveChanges} />
            <Button title="Cerrar sesión" onPress={handleLogout} />
          </View>
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleGoToHistory}>
          <Text style={styles.buttonText}>Historial</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 60,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerText: {
    color: 'blue',
  },
  profileImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    marginTop: -50,
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
  button: {
    backgroundColor: '#A62940',
    padding: 20,
    borderRadius: 50,
    height: 130,
    width: 250,
    alignItems: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    marginStart: 50,
  },
  footer: {
    position: 'absolute',
    bottom: -55,
    right: -40,
    width: '40%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },
});

export default ProfileCust;
