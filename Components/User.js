import React from 'react';
import {Text, Image, View} from 'react-native';

const User = props => {
  if (!props.user) {
    return null;
  }

  const user = props.user;
  return (
    <View>
      <Image source={{uri: user.imageUrl}} />
      <Text>Username: {user.userName}</Text>
      <Text>
        Name: {user.firstName} {user.lastName}
      </Text>
      <Text>Email: {user.email}</Text>
    </View>
  );
};

export default User;
