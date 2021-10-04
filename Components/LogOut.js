import React, {useState, Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../Redux';
import {Modal} from '../services/Modal';
import {Button} from '../services/Button';

class LogOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: true,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.cancel = this.cancel.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSubmit() {
    this.props.logout();
  }

  cancel() {
    this.setState({
      isModalVisible: false,
    });
    this.props.navigation.navigate('Profile Screens', {
      screen: 'Profile',
    });
  }

  onDismiss() {
    this.setState({isModalVisible: true});
  }

  render() {
    const {isModalVisible} = this.state;
    console.log('newJWT', this.props);
    return (
      <View style={styles.container}>
        <Modal isVisible={isModalVisible} onDismiss={this.onDismiss}>
          <Modal.Container>
            <Modal.Header title="Are you sure you would like to log out?" />
            <Modal.Body>
              <Text style={styles.text}>
                This app functions best when you remain logged in
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <Button title="Log Out" onPress={this.onSubmit} />
              <Button title="Cancel" onPress={this.cancel} />
            </Modal.Footer>
          </Modal.Container>
        </Modal>
      </View>
    );
  }
}

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

  text: {
    fontSize: 18,
  },
});
