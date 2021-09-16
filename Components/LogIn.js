import React, {Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  // Image,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {_logIn} from '../redux/loggedIn';

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(ev) {
    this.setState({[ev.target.name]: ev.target.value});
  }
  onSubmit(ev) {
    ev.preventDefault();

    this.props.logIn({
      ...this.state,
    });
  }
  render() {
    const {onChange, onSubmit} = this;
    const {username, password} = this.state;
    return (
      // <form onSubmit={onSubmit}>
      //   <input value={username} onChange={onChange} name="username" />
      //   <input value={password} onChange={onChange} name="password" />
      //   <button>Sign In</button>
      // </form>

      <View style={styles.container}>
        {/* <Image style={styles.image} source={require('./assets/log2.png')} /> */}

        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={onChange}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={onChange}
          />
        </View>

        <TouchableOpacity onPress={onSubmit} style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    logIn: credentials => dispatch(_logIn(credentials, history)),
  };
};

export default connect(null, mapDispatchToProps)(LogIn);

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

    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FF1493',
  },
});
