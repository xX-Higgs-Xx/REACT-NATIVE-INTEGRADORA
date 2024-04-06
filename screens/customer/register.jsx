import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import colors from '../../constants/colors';
import axios from 'axios';
import { API_URL } from '../../constants/config';

const Register = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState(null);

    const createUser = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('lastName', lastname);
            formData.append('phone', phoneNumber);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('sex', gender);
            if (image) {
                const uriParts = image.split('.');
                const fileType = uriParts[uriParts.length - 1];
                formData.append('image', {
                    uri: image,
                    name: `photo.${fileType}`,
                    type: `image/${fileType}`,
                });
            }

            const response = await axios.post(`${API_URL}/api/customer/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                navigation.replace('Login');
                Alert.alert('Usuario creado exitosamente');
            } else {
                Alert.alert('Error al crear el usuario', response.data.message);
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            Alert.alert('Error', 'Ocurrió un error al crear el usuario. Por favor, inténtalo de nuevo más tarde.');
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log('URI de la imagen seleccionada:', result.uri); // Agregar este console.log
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.register}>
                    <View style={styles.form}>
                        <Text>Nombre</Text>
                        <TextInput
                            placeholder="Nombre"
                            keyboardType="default"
                            autoCapitalize="none"
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                        <Text>Apellido</Text>
                        <TextInput
                            placeholder="Apellido"
                            keyboardType="default"
                            autoCapitalize="none"
                            style={styles.input}
                            value={lastname}
                            onChangeText={setLastname}
                        />
                        <Text>Género</Text>
                        <RNPickerSelect
                            style={pickerSelectStyles}
                            onValueChange={(value) => setGender(value)}
                            items={[
                                { label: 'Hombre', value: 'hombre' },
                                { label: 'Mujer', value: 'mujer' },
                            ]}
                        />
                        <Text>Numero telefonico</Text>
                        <TextInput
                            placeholder="7771234567"
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            style={styles.input}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                        <Text>Correo</Text>
                        <TextInput
                            placeholder="alguien@ejemplo.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Text>Contraseña</Text>
                        <TextInput
                            placeholder="password"
                            secureTextEntry
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <Text>Confirma contraseña</Text>
                        <TextInput
                            placeholder="password"
                            secureTextEntry
                            style={styles.input}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <Button title='Seleccionar foto de perfil' onPress={pickImage} />
                        {image && <Image source={{ uri: image }} style={styles.profileImage} />}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={createUser}>
                    <Text style={styles.buttonText}>Crear</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        padding: 10,
        paddingStart: 30,
        borderRadius: 50,
        height: 50,
        backgroundColor: colors.white,
        marginBottom: 20,
        marginTop: 10,
    },
    inputAndroid: {
        padding: 10,
        paddingStart: 30,
        borderRadius: 50,
        height: 50,
        backgroundColor: colors.white,
        marginBottom: 20,
        marginTop: 10,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingTop: 30,
    },
    register: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: 10,
        paddingStart: 30,
        width: '100%',
        height: 50,
        marginTop: 10,
        borderRadius: 30,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    form: {
        alignItems: 'flex-start',
        width: '80%',
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
        bottom: 0,
        right: 0,
        marginBottom: -55,
        marginRight: -40,
        alignItems: 'flex-end',
    },
    imageButton: {
        backgroundColor: '#A62940',
        padding: 10,
        borderRadius: 50,
        marginTop: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10,
    },
});

export default Register;
