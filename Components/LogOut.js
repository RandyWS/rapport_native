import React, {useState, Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../Redux';

const LogOut = props => {
  const onSubmit = () => {
    props.logout();
  };

  return (
    <View style={styles.container}>
      {/* Maybe put logo here? */}

      <Text>Are you sure you would like to logout?</Text>
      <TouchableOpacity onPress={onSubmit} style={styles.loginBtn}>
        <Text style={styles.loginText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = (dispatch, {newJWT}) => {
  return {
    logout: () => dispatch(logout(newJWT)),
  };
};

export default connect(null, mapDispatchToProps)(LogOut);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },

  image: {
    marginBottom: 40,
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
});
