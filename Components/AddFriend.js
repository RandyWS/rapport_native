import React, {useState, Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {_createFriend} from '../Redux';

const AddFriends = props => {
  const [nickname, setNickname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [description, setDescription] = useState('');
  // const [imageUrl, setImageUrl] = useState('');

  const onSubmit = () => {
    props.createFriend({nickname, firstName, lastName, description});
    props.navigation.navigate('Friends List');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Nickname"
          placeholderTextColor="#003f5c"
          onChangeText={nickname => setNickname(nickname)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="First Name"
          placeholderTextColor="#003f5c"
          onChangeText={firstName => setFirstName(firstName)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Last Name"
          placeholderTextColor="#003f5c"
          onChangeText={lastName => setLastName(lastName)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Description"
          placeholderTextColor="#003f5c"
          onChangeText={description => setDescription(description)}
        />
      </View>

      <Text style={{fontSize: 16, fontWeight: '700'}}>Upload an Image</Text>

      <TouchableOpacity onPress={onSubmit} style={styles.loginBtn}>
        <Text style={styles.loginText}>ADD FRIEND</Text>
      </TouchableOpacity>

      <Text>Cancel</Text>
    </View>
  );
};

const mapDispatch = dispatch => {
  return {
    createFriend: newFriend => dispatch(_createFriend(newFriend)),
  };
};

export default connect(null, mapDispatch)(AddFriends);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,

    // alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    alignItems: 'center',
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#FF1493',
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
});
