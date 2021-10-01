import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function Header({screen}) {
  const navigation = useNavigation();
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.headerContent}>
        <Text style={headerStyles.screen}>{screen}</Text>
      </View>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    position: 'absolute',

    left: 0,
    width: '100%',
    backgroundColor: '#9AC4F8',
    elevation: 5,
    height: 90,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  screen: {
    color: 'white',
    alignSelf: 'center',
  },
});
