/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {Modal} from '../services/Modal';
import {Button} from '../services/Button';
import {_fetchSingleComm, resetSingleComm, _deleteComm} from '../Redux';

class SingleCommunication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communication: {},
      isModalVisible: false,
    };
    this.deleteComm = this.deleteComm.bind(this);
    this.displayModal = this.displayModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleComm(this.props.route.params.commId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.singleComm !== this.props.singleComm) {
      this.setState({communication: this.props.singleComm});
    }
  }

  componentWillUnmount() {
    this.props.resetSingleComm();
  }

  displayModal() {
    this.setState({isModalVisible: !this.state.isModalVisible});
  }

  deleteComm() {
    this.displayModal();
    this.props.deleteComm(this.state.communication.id);
    this.props.navigation.navigate('Friend', {
      friendId: this.state.communication.friendId,
    });
  }

  render() {
    const {communication, isModalVisible} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.name}>Date: {communication.date}</Text>
            <Text style={styles.name}>Title: {communication.title}</Text>
            <Text style={styles.name}>Content: {communication.content}</Text>
            <TouchableOpacity
              onPress={this.displayModal}
              style={styles.loginBtn}>
              <Text style={styles.loginText}>Delete Communication</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal isVisible={isModalVisible}>
          <Modal.Container>
            <Modal.Header title="Are you sure you want to delete this friend?" />
            <Modal.Body>
              <Text style={styles.text}>This action cannot be undone</Text>
            </Modal.Body>
            <Modal.Footer>
              <Button title="Delete Communication" onPress={this.deleteComm} />
              <Button title="Cancel" onPress={this.displayModal} />
            </Modal.Footer>
          </Modal.Container>
        </Modal>
      </View>
    );
  }
}

const mapState = state => {
  return {
    singleComm: state.singleComm,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchSingleComm: commId => dispatch(_fetchSingleComm(commId)),
    resetSingleComm: () => dispatch(resetSingleComm()),
    deleteComm: commId => dispatch(_deleteComm(commId)),
  };
};

const styles = StyleSheet.create({
  cardcontainer: {
    overflow: 'hidden',
    borderWidth: 0,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#20B2AA',
  },
  headerContent: {
    padding: 30,
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
  avatar: {
    width: 130,
    height: 130,

    borderWidth: 4,
    borderColor: '#FFFFFF',
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    padding: 30,
    backgroundColor: '#E6E6FA',
    flex: 1,
  },
  box: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  username: {
    color: '#20B2AA',
    fontSize: 22,
    marginLeft: 10,
  },
});

export default connect(mapState, mapDispatch)(SingleCommunication);
