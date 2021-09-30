import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function Header({screen}) {
  const navigation = useNavigation();
  return (
    <View style={headerStyles.container}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Text>Side Drawer</Text>
      </TouchableOpacity>
      <View>
        <Text>{screen}</Text>
      </View>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 33,
    left: 0,
    width: '100%',
    backgroundColor: '#fa7da7',
    elevation: 5,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
