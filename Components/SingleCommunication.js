/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {Modal} from '../services/Modal';
import {Button} from '../services/Button';
import {_fetchSingleComm, resetSingleComm, _deleteComm} from '../Redux';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class SingleCommunication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communication: {},
      isModalVisible: false,
    };
    this.deleteComm = this.deleteComm.bind(this);
    this.displayModal = this.displayModal.bind(this);
    this.returnIcon = this.returnIcon.bind(this);
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

  returnIcon(type) {
    if (type === 'phone-call') {
      return <Feather name="phone-call" size={30} />;
    } else if (type === 'text') {
      return <Feather name="message-square" size={30} />;
    } else if (type === 'in-person') {
    } else if (type === 'future') {
      return <Feather name="fast-forward" size={30} />;
    } else if (type === 'other') {
      return <Feather name="more-horizontal" size={30} />;
    } else if (type === 'letter') {
      return <SimpleLineIcons name="envelope-letter" size={30} />;
    } else if (type === 'email') {
      return <Entypo name="email" size={30} />;
    } else if (type === 'social-media') {
      return <SimpleLineIcons name="social-instagram" size={30} />;
    }
  }

  render() {
    const {communication, isModalVisible} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.cardcontainer}>
          <View style={styles.header}>
            <View style={styles.icon}>
              <AntDesign.Button
                name="back"
                backgroundColor="#99c1b9"
                style={styles.button}
                onPress={() =>
                  this.props.navigation.navigate('Friend', {
                    friendId: this.state.communication.friendId,
                  })
                }
              />

              <AntDesign.Button
                name="edit"
                backgroundColor="#99c1b9"
                style={styles.button}
                onPress={() =>
                  this.props.navigation.navigate('Edit Communication', {
                    commId: this.state.communication.id,
                  })
                }
              />

              <AntDesign.Button
                name="delete"
                backgroundColor="#99c1b9"
                style={styles.button}
                onPress={this.displayModal}
              />
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.friend}>
              <Text style={styles.date}>{communication.start}</Text>
              <Text style={styles.label}>Title:</Text>
              <Text style={styles.headerText}>{communication.title}</Text>
              {communication.content ? (
                <>
                  <Text style={styles.label}>Content:</Text>
                  <Text style={styles.headerText}>{communication.content}</Text>
                </>
              ) : null}
            </View>
          </View>

          <Modal isVisible={isModalVisible}>
            <Modal.Container>
              <Modal.Header title="Are you sure you want to delete this friend?" />
              <Modal.Body>
                <Text style={styles.text}>This action cannot be undone</Text>
              </Modal.Body>
              <Modal.Footer>
                <Button title="Delete" onPress={this.deleteComm} />
                <Button title="Cancel" onPress={this.displayModal} />
              </Modal.Footer>
            </Modal.Container>
          </Modal>
        </ScrollView>
      </SafeAreaView>
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
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#709775',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    padding: 5,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },

  icon: {
    marginLeft: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 0.2,
      width: -0.4,
    },
    elevation: 0.5,
  },
  friend: {
    padding: 20,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#fff',
    flexDirection: 'column',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },

  friendInfo: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginLeft: 15,
    padding: 5,
  },

  body: {
    margin: 'auto',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 25,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: 'Helvetica',
  },
  label: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'center',
    fontFamily: 'Helvetica',
    textAlign: 'left',
    marginRight: 'auto',
  },
  date: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    fontFamily: 'Helvetica',
    textAlign: 'left',
    color: '#90a955',
    marginRight: 'auto',
  },
  text: {
    fontSize: 18,
  },
});

export default connect(mapState, mapDispatch)(SingleCommunication);
