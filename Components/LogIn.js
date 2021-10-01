import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {authenticate} from '../Redux';

const LogIn = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    props.authenticate({email, password});
  };

  return (
    <View style={styles.container}>
      {/* Maybe put logo here? */}

      {props.auth.message ? <Text>{props.auth.message}</Text> : null}

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          autoCapitalize="none"
          onChangeText={email => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={password => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSubmit} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOG IN</Text>
      </TouchableOpacity>

      <Text>New User?</Text>
      <TouchableOpacity onPress={onSubmit} style={styles.loginBtn}>
        <Text style={styles.loginText}>Sign Up!</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapState = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatch = (dispatch, {newJWT}) => {
  return {
    authenticate: formData => dispatch(authenticate('login', formData, newJWT)),
  };
};

export default connect(mapState, mapDispatch)(LogIn);

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
