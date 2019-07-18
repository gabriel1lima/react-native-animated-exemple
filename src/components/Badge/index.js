import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Badge(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.quant}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 15,
    height: 15,
    backgroundColor: 'white',
    borderRadius: 7.5,
    position: 'absolute',
    right: -6,
    top: -4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#d3222a',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
