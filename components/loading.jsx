import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import loadingAnimation from '../assets/animations/Animation - loading.json'; 

const LoadingIndicator = () => (
  <View style={styles.container}>
    <LottieView
      source={loadingAnimation}
      autoPlay
      loop
      style={styles.animation}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default LoadingIndicator;
