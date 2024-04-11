import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native'; // Importa Alert desde 'react-native'
import Svg, { Circle, Ellipse, G, Path, Defs, ClipPath } from "react-native-svg";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../constants/config';
import colors from '../../constants/colors';
import { ActivityIndicator } from 'react-native';


const Login = () => {
  function SvgTop() {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" fill="none">
        <Circle cx={444.5} cy={-199.5} r={571.5} fill="#FCCDD6" />
        <Ellipse cx={464} cy={-212.5} fill="#F87E94" rx={491} ry={524.5} />
        <Ellipse cx={596} cy={-212.5} fill="#F43759" rx={491} ry={506.5} />
        <G clipPath="url(#a)" filter="url(#b)">
          <Path
            fill="#35343D"
            d="M123.704 340.424c-41.033 0-74.296-2.413-74.296-5.388 0-2.976 33.263-5.389 74.296-5.389 41.032 0 74.296 2.413 74.296 5.389 0 2.975-33.264 5.388-74.296 5.388ZM122.459 276.215h2.49v1.572h-2.49v-1.572ZM117.477 276.215h2.491v1.572h-2.491v-1.572ZM112.497 276.215h2.49v1.572h-2.49v-1.572ZM107.516 276.215h2.491v1.572h-2.491v-1.572ZM102.536 276.215h2.49v1.572h-2.49v-1.572ZM97.555 276.215h2.49v1.572h-2.49v-1.572ZM92.574 276.215h2.49v1.572h-2.49v-1.572ZM87.594 276.215h2.49v1.572h-2.49v-1.572ZM82.612 276.215h2.49v1.572h-2.49v-1.572ZM77.632 276.215h2.49v1.572h-2.49v-1.572ZM72.651 276.215h2.49v1.572h-2.49v-1.572Z"
          />
          <Path
            fill="#35343D"
            d="M66.944 277.225c0 8.575 3.148 16.798 8.753 22.86 5.604 6.063 13.206 9.469 21.131 9.469 7.926 0 15.527-3.406 21.132-9.469 5.604-6.062 8.753-14.285 8.753-22.86h-59.77Z"
          />
          <Path
            fill="#35343D"
            d="m68.389 277.432 19.01-61.299a27.758 27.758 0 0 0-11.568-1.608 28.133 28.133 0 0 0-11.254 3.306c-3.514 1.892-6.65 4.515-9.226 7.718-2.576 3.203-4.544 6.925-5.79 10.951a34.99 34.99 0 0 0-.545 1.956c-1.957 7.943-1.043 16.395 2.556 23.635 3.598 7.241 9.612 12.726 16.817 15.341Z"
          />
          <Path
            fill="#35343D"
            d="M67.67 282.277c-2.062 0-3.735-1.809-3.735-4.041s1.673-4.041 3.736-4.041 3.735 1.809 3.735 4.041-1.672 4.041-3.735 4.041Z"
          />
          <Path
            fill="#A62940"
            d="M105.649 285.644c.275 0 .539.119.734.329.194.211.304.496.304.794 0 .298-.11.583-.304.794-.195.21-.459.328-.734.328H87.801a1 1 0 0 1-.734-.328 1.172 1.172 0 0 1-.303-.794c0-.298.109-.583.303-.794.195-.21.459-.329.734-.329h17.848Z"
          />
          <Path
            fill="#35343D"
            d="m72.029 335.709 3.716.149 13.388-31.147-3.387-1.704-13.717 32.702ZM121.629 335.709l-3.716.149-13.388-31.147 3.387-1.704 13.717 32.702Z"
          />
          <Path fill="#35343D" d="M81.367 317.749h30.715v2.245H81.367v-2.245Z" />
          <Path
            fill="#A62940"
            d="M86.639 214.989c.146 0 .29.037.42.108.13.071.243.174.33.301a1.088 1.088 0 0 1 .143.896l-.788 2.791a.999.999 0 0 1-.454.597.874.874 0 0 1-.711.074.955.955 0 0 1-.552-.491 1.084 1.084 0 0 1-.07-.769l.788-2.792c.059-.207.177-.388.338-.517a.893.893 0 0 1 .556-.198ZM127.958 277.787c.247 0 .485.106.66.296.175.189.274.446.274.714 0 .268-.099.525-.274.714a.898.898 0 0 1-.66.296h-2.698a.9.9 0 0 1-.661-.296 1.052 1.052 0 0 1-.273-.714c0-.268.098-.525.273-.714a.9.9 0 0 1 .661-.296h2.698Z"
          />
          <Path
            fill="#FF6584"
            d="M105.649 270.378h11.206a2.826 2.826 0 0 1 2.126 1.001c.5.581.779 1.345.78 2.139a3.289 3.289 0 0 1-.776 2.141 2.822 2.822 0 0 1-2.13 1.005h-11.206a2.8 2.8 0 0 1-2.055-.92 3.28 3.28 0 0 1-.851-2.223c0-.833.306-1.633.851-2.222a2.798 2.798 0 0 1 2.055-.921Z"
          />
          <Path
            fill="#B43434"
            d="M117.984 276.415c-1.909-.265-3.412-2.871-3.412-6.037h.415c0 3.096 1.49 5.613 3.321 5.613v.251l-.324.173ZM113.95 276.44v-.449c-1.831 0-3.32-2.518-3.32-5.613h-.415c0 3.342 1.675 6.062 3.735 6.062ZM109.592 276.44v-.449c-1.831 0-3.321-2.518-3.321-5.613h-.415c0 3.342 1.676 6.062 3.736 6.062Z"
            opacity={0.2}
          />
          <Path
            fill="#FF6584"
            d="M85.31 270.378h11.207a2.825 2.825 0 0 1 2.126 1.001c.5.581.78 1.345.78 2.139 0 .794-.276 1.559-.776 2.141a2.823 2.823 0 0 1-2.13 1.005H85.311a2.8 2.8 0 0 1-2.055-.92 3.28 3.28 0 0 1-.85-2.223c0-.833.305-1.633.85-2.222a2.797 2.797 0 0 1 2.055-.921Z"
          />
          <Path
            fill="#B43434"
            d="M97.646 276.415c-1.91-.265-3.412-2.871-3.412-6.037h.415c0 3.096 1.49 5.613 3.32 5.613v.251l-.323.173ZM93.611 276.44v-.449c-1.83 0-3.32-2.518-3.32-5.613h-.415c0 3.342 1.675 6.062 3.735 6.062ZM89.254 276.44v-.449c-1.831 0-3.32-2.518-3.32-5.613h-.416c0 3.342 1.676 6.062 3.736 6.062Z"
            opacity={0.2}
          />
          <Path
            fill="#E6E6E6"
            d="M106.468 240.195c1.469-.859 3.285.078 4.017 1.597.89 1.848.152 4.07-.886 5.65-1.079 1.641-2.543 2.996-3.263 4.893a8.798 8.798 0 0 0-.23 5.621c.54 1.844 1.666 3.421 3.18 4.452.675.462.051 1.628-.629 1.163-1.484-1.003-2.658-2.462-3.373-4.19a10.24 10.24 0 0 1-.637-5.514c.151-.967.44-1.903.856-2.775a13.38 13.38 0 0 1 1.621-2.477c1.08-1.384 2.44-2.908 2.508-4.833a3.323 3.323 0 0 0-.048-.745 2.862 2.862 0 0 0-.144-.5 2.422 2.422 0 0 0-.654-.883 1.926 1.926 0 0 0-.891-.436 1.243 1.243 0 0 0-.798.14c-.705.412-1.335-.751-.629-1.163ZM87.732 248.343a3.371 3.371 0 0 1 1.934-.086c.64.16 1.227.506 1.7.999.244.272.425.603.528.966.102.362.123.746.062 1.119-.119.816-.595 1.541-1.112 2.125-1.011 1.144-2.427 1.883-3.275 3.195a4.208 4.208 0 0 0-.685 1.901 3.847 3.847 0 0 0 .304 1.797c.633 1.391 1.888 2.338 3.213 2.947.31.142.377.636.223.921a.645.645 0 0 1-.381.305.599.599 0 0 1-.47-.063c-2.438-1.121-4.693-3.632-4.02-6.716.353-1.622 1.437-2.767 2.604-3.763.58-.459 1.127-.965 1.638-1.512.403-.463.823-1.097.748-1.725a.984.984 0 0 0-.28-.568 2.424 2.424 0 0 0-.616-.443 2.157 2.157 0 0 0-1.784-.1.586.586 0 0 1-.472-.066.673.673 0 0 1-.294-.405.738.738 0 0 1 .064-.509.65.65 0 0 1 .371-.319ZM97.211 229.182c.371-.343.84-.538 1.327-.553.463.009.913.166 1.293.452.859.675 1.466 1.659 1.713 2.776.629 2.607-.192 5.417-1.332 7.713-.577 1.161-1.248 2.263-1.829 3.422a15.938 15.938 0 0 0-1.278 3.51 18.322 18.322 0 0 0-.154 7.662c.498 2.521 1.546 5.018 3.33 6.758a.704.704 0 0 1 .182.476c0 .179-.066.35-.182.476a.603.603 0 0 1-.44.197.6.6 0 0 1-.44-.197c-1.584-1.544-2.642-3.662-3.281-5.84a19.311 19.311 0 0 1-.605-7.61 18.66 18.66 0 0 1 .798-3.732 21.35 21.35 0 0 1 1.584-3.497c1.17-2.141 2.416-4.306 2.586-6.855.083-1.253-.062-2.56-.779-3.567.04.055-.031-.041-.031-.041a3.381 3.381 0 0 0-.422-.452c.022.018.077.058-.023-.017-.05-.038-.101-.074-.153-.107-.043-.027-.087-.051-.13-.076a1.237 1.237 0 0 0-.079-.04c.06.028.057.028-.01 0-.049-.016-.29-.072-.156-.054a1.21 1.21 0 0 0-.135-.01c-.019 0-.187.009-.105 0 .096-.012-.075.018-.077.018a1.27 1.27 0 0 0-.158.055c.13-.056-.212.152-.133.085a.619.619 0 0 1-.44.189.619.619 0 0 1-.44-.189c-.216-.232-.268-.728 0-.952Z"
          />
          <Path
            fill="#FFB9B9"
            d="m145.02 330.406 4.693 1.347 8.622-43.11-9.675-.933-3.64 42.696ZM166.496 331.068l4.801.785 4.221-43.87-9.712.215.69 42.87ZM168.968 268.643l-.443 8.953c-.017.33.033.659.145.966.111.306.283.584.502.813.22.228.482.403.77.513.287.109.593.15.897.121a2.064 2.064 0 0 0 1.313-.667c.351-.382.568-.885.612-1.422l.802-9.899 6.323-23.213-.192-14.923-7.472.415-3.257 38.343Z"
          />
          <Path
            fill="#2F2E41"
            d="M164.945 290.612c3.742-1.406 8.085-1.682 13.028-.829-.701-8.982-1.107-17.324-.767-24.042h-25.481l13.22 24.871Z"
          />
          <Path
            fill="#2F2E41"
            d="M147.128 290.405c3.857 2.207 9.437 3.264 15.901 3.73l8.047-27.772-19.733-.415-4.215 24.457ZM137.194 334.912l13.882.557c1.778.071 1.872-1.581 1.536-3.472l-1.643-5.076c-3.7 3.921-4.049 4.14-5.635-1.438l-4.841 4.136-3.583.665a2.125 2.125 0 0 0-1.285.796 2.457 2.457 0 0 0-.507 1.506c.001.603.218 1.182.605 1.616.387.433.914.688 1.471.71ZM158.219 334.912l13.881.557c1.779.071 1.872-1.581 1.537-3.472l-1.644-5.076c-3.7 3.921-4.049 4.14-5.635-1.438l-4.841 4.136-3.583.665a2.125 2.125 0 0 0-1.285.796 2.45 2.45 0 0 0-.506 1.506c.001.603.217 1.182.604 1.616.387.433.915.688 1.472.71Z"
          />
          <Path
            fill="#FFB9B9"
            d="M154.982 207.916c-4.127 0-7.472-3.619-7.472-8.083 0-4.465 3.345-8.083 7.472-8.083 4.127 0 7.472 3.618 7.472 8.083 0 4.464-3.345 8.083-7.472 8.083Z"
          />
          <Path
            fill="#FFB9B9"
            d="m158.814 214.133 8.813-2.901-5.939-9.534-6.706 3.109 3.832 9.326Z"
          />
          <Path
            fill="#A62940"
            d="M150.576 268.228c9.06 2.204 19.117 1.329 27.78-1.244-2.074-12.515-1.073-25.957.958-36.892 1.59-8.558-2.603-15.74-9.579-19.275a18.224 18.224 0 0 0-4.644-1.131c-4.894-.469-9.199 3.5-9.71 8.785l-4.805 49.757Z"
          />
          <Path
            fill="#A62940"
            d="m174.141 234.238 6.323-.83-1.916-10.777h-4.407v11.607Z"
          />
          <Path
            fill="#2F2E41"
            d="m155.087 201.112 1.145-.55a1.834 1.834 0 0 1 1.643.029c.255.133.481.325.661.562.18.237.31.514.382.811l1.595 3.118 3.973-.681-.138-6.6a9.696 9.696 0 0 0-1.222-3.508 8.937 8.937 0 0 0-2.41-2.693 8.188 8.188 0 0 0-3.201-1.433 7.9 7.9 0 0 0-3.465.062l-.108.027c-1.94.474-4.458 2.015-5.772 3.632l-2.45 3.013a1.112 1.112 0 0 0-.174 1.063c.063.178.17.333.31.449a.92.92 0 0 0 .48.21l3.35.4 5.401 2.089Z"
          />
          <Path
            fill="#E6E6E6"
            d="m130.303 256.237 4.291 4.071a.295.295 0 0 0 .439-.031.353.353 0 0 0 .076-.244.346.346 0 0 0-.105-.231l-4.29-4.071.821-1.013 4.29 4.071a.296.296 0 0 0 .439-.031.354.354 0 0 0-.028-.475l-4.291-4.071.821-1.013 4.291 4.071a.295.295 0 0 0 .226.084.308.308 0 0 0 .213-.114.349.349 0 0 0 .077-.245.37.37 0 0 0-.031-.127.355.355 0 0 0-.075-.104l-4.29-4.071 1.026-1.266 6.064 5.753a3.482 3.482 0 0 1 1.024 1.981 3.64 3.64 0 0 1-.356 2.237l18.305 17.37-1.642 2.025-18.294-17.358a2.895 2.895 0 0 1-1.963.706 2.912 2.912 0 0 1-1.927-.815l-6.137-5.823 1.026-1.266Z"
          />
          <Path
            fill="#FFB9B9"
            d="m151.151 268.643-.444 8.953c-.016.33.033.659.145.966.112.306.283.584.503.813.219.228.482.403.769.513.288.109.594.15.898.121.496-.049.96-.285 1.312-.667a2.38 2.38 0 0 0 .612-1.422l.803-9.899 6.322-23.213-.191-14.923-7.472.415-3.257 38.343Z"
          />
          <Path
            fill="#A62940"
            d="M153.833 232.58c2.273-2.36 5.274-2.446 8.621-1.451V219.99c0-1.333-.49-2.612-1.361-3.555-.872-.943-2.054-1.472-3.286-1.472-.568 0-1.129.122-1.652.36a4.265 4.265 0 0 0-1.393 1.026c-.396.44-.708.96-.915 1.531a4.943 4.943 0 0 0-.295 1.795l.281 12.905Z"
          />
        </G>
        <Defs>
          <ClipPath id="a">
            <Path fill="#fff" d="M198 190H48v150.424h150z" />
          </ClipPath>
        </Defs>
      </Svg>
    )
  }

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Campos Vacíos', 'Por favor, complete todos los campos para iniciar sesión.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/signinClients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": email, "password": password }),
      });

      const data = await response.json();

      const customerId = data.data.body.data.id;
      const carShopId = data.data.body.data.carShopBean.id;

      if (response.ok) {
        if (data) {
          await AsyncStorage.setItem('token', data.data.body.data.token);
          await AsyncStorage.setItem('idCarShop', carShopId.toString());
          await AsyncStorage.setItem('customerId', customerId.toString());
          navigation.replace('Index');
        } else {
          console.error('El token recibido es nulo o no está definido.');
        }
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      alert('Ocurrió un error durante el inicio de sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.containerMain}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Ajusta el comportamiento según la plataforma
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // Ajusta el desplazamiento vertical para iOS
    >
      <View style={styles.containerSVG}>
        <SvgTop />
      </View>
      <Text style={styles.titulo1}>SWIFTCUT</Text>
      <Text style={styles.subTitulo}>Sabores que Cortan a la Perfección</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="alguien@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          style={{ ...styles.input, marginBottom: 20 }}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.buttonRegis} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.textRegis}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="white" style={{ marginLeft: 80, marginTop: 10 }} />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  container: {
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  containerSVG: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: "100%",
    height: 380,
  },
  titulo1: {
    fontSize: 60,
    color: '#35343D',
    fontWeight: 'bold',
  },
  subTitulo: {
    marginBottom: 30,
    fontSize: 15,
    color: 'gray'
  },
  input: {
    padding: 10,
    paddingStart: 30,
    width: '80%',
    height: 50,
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  forPass: {
    fontSize: 13,
    color: 'gray',
    marginTop: 15
  },
  form: {
    position: 'absolute',
    bottom: 75,
    left: 0,
    alignItems: 'center',
    width: '100%',
    marginRight: 80,
    backgroundColor: '#f1f1f1',
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
    width: '120%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },
  textRegis: {
    textAlign: 'left',
    color: colors.grey,
    fontSize: 15,
  },
  buttonRegis: {
    fontSize: 15,
    width: '80%',
    padding: 25,
  }
});

export default Login;
