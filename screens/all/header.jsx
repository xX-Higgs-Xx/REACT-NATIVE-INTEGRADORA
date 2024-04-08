import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = (props) => {

  return (
    <View style={styles.header}>
      <Text style={[styles.title, { color: '#fff' }]}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  profileIcon: {
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
  },
});

export default Header;
