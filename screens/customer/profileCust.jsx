import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileCust = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };
  // Estado para almacenar los datos del usuario y sus cambios
  const [userData, setUserData] = useState({
    email: 'a',
    password: '12345',
    phoneNumber: '1234567890',
  });

  // Función para manejar el cambio en el correo electrónico
  const handleChangeEmail = (text) => {
    setUserData((prevState) => ({ ...prevState, email: text }));
  };

  // Función para manejar el cambio en la contraseña
  const handleChangePassword = (text) => {
    setUserData((prevState) => ({ ...prevState, password: text }));
  };

  // Función para manejar el cambio en el número de teléfono
  const handleChangePhoneNumber = (text) => {
    setUserData((prevState) => ({ ...prevState, phoneNumber: text }));
  };

  // Función para guardar los cambios en los datos del usuario
  const handleSaveChanges = () => {
    // Aquí puedes implementar la lógica para guardar los cambios en la base de datos
    console.log('Datos actualizados:', userData);
  };

  const handleHistorialClick = () => {
    navigation.navigate('record'); // Reemplaza 'history' con el nombre real de tu pantalla de historial
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="person" size={180} color="black" marginVertical={10} />
      {/* Campo de correo electrónico */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={userData.email}
          onChangeText={handleChangeEmail}
        />
      </View>
      {/* Campo de contraseña */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          value={userData.password}
          onChangeText={handleChangePassword}
        />
      </View>
      {/* Campo de número de teléfono */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Número de teléfono:</Text>
        <TextInput
          style={styles.input}
          placeholder="Número de teléfono"
          keyboardType="numeric"
          value={userData.phoneNumber}
          onChangeText={handleChangePhoneNumber}
        />
      </View>
      {/* Botones para guardar los cambios y cerrar sesión en línea */}
      <View style={styles.buttonContainer}>
        <Button title="Guardar cambios" onPress={handleSaveChanges} />
        <Button title="Cerrar sesión" onPress={handleLogout} />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleHistorialClick}>
          <Text style={styles.buttonText}>Historial</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
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
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    marginStart: 50,
  },
  button: {
    backgroundColor: '#A62940',
    padding: 20,
    borderRadius: 50,
    height: 130,
    width: 250,
    alignItems: 'flex-start',
  },
  footer: {
    position: 'absolute',
    bottom: -55,
    right: -40,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },
});

export default ProfileCust;
