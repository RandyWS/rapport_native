import React from 'react';
import {Text, Image, View} from 'react-native';

export const FriendsList = props => {
  const friend = props.friend;

  return (
    <View>
      <Image source={{uri: friend.imageUrl}} />
      <Text>
        Name: {friend.firstName} {friend.lastName}
      </Text>
    </View>
  );
};
