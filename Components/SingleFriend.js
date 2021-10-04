/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {Modal} from '../services/Modal';
import {Button} from '../services/Button';
import {_fetchSingleFriend, resetSingleFriend, _deleteFriend} from '../Redux';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class SingleFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friend: {},
      communications: [],
      isModalVisible: false,
    };
    this.deleteFriend = this.deleteFriend.bind(this);
    this.displayModal = this.displayModal.bind(this);
    this.returnIcon = this.returnIcon.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleFriend(this.props.route.params.friendId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.singleFriend !== this.props.singleFriend) {
      this.setState({
        friend: this.props.singleFriend,
        communications: this.props.singleFriend.communications,
      });
    }

    if (prevProps.singleFriend.id !== this.props.route.params.friendId) {
      this.props.fetchSingleFriend(this.props.route.params.friendId);
    }
  }

  componentWillUnmount() {
    this.props.resetSingleFriend();
  }

  displayModal() {
    this.setState({isModalVisible: !this.state.isModalVisible});
  }

  deleteFriend() {
    this.displayModal();
    this.props.deleteFriend(this.state.friend.id);
    this.props.navigation.navigate('Friends List');
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
    const {friend, communications, isModalVisible} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.icon}>
              <AntDesign.Button
                name="back"
                backgroundColor="#99c1b9"
                style={styles.back}
                onPress={() => this.props.navigation.navigate('Friends List')}
              />

              <AntDesign.Button
                name="addfile"
                backgroundColor="#99c1b9"
                style={styles.button}
                onPress={() =>
                  this.props.navigation.navigate('Add Communication', {
                    friendId: friend.id,
                  })
                }
              />
              <AntDesign.Button
                name="edit"
                backgroundColor="#99c1b9"
                style={styles.button}
                onPress={() =>
                  this.props.navigation.navigate('Edit Friend', {
                    friendId: friend.id,
                  })
                }
              />
              <AntDesign.Button
                name="deleteusergroup"
                backgroundColor="#99c1b9"
                style={styles.button}
                onPress={this.displayModal}
              />
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.friend}>
            <View style={styles.friendBox}>
              <Image
                style={styles.avatar}
                source={{
                  uri: friend.imageUrl,
                }}
              />
              <View style={styles.friendInfo}>
                <Text style={styles.headerText}>
                  {friend.firstName} {friend.lastName}
                </Text>
                {friend.nickname ? (
                  <Text style={styles.nickname}>{friend.nickname}</Text>
                ) : null}
                <Text style={styles.rapport}>Rapport since:</Text>
                <Text style={styles.time}>
                  {moment(friend.createdAt).format('LL')}
                </Text>
              </View>
            </View>
            {friend.description ? (
              <>
                <Text style={styles.rapport}>Description:</Text>
                <Text style={styles.headerText}>{friend.description}</Text>
              </>
            ) : null}
          </View>
          <FlatList
            enableEmptySections={true}
            data={communications}
            contentContainerStyle={styles.cardcontainer}
            keyExtractor={item => {
              return item.id.toString();
            }}
            scrollEnabled={true}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Communication', {
                      commId: item.id,
                    })
                  }>
                  <View style={styles.box}>
                    <View style={styles.iconBox}>
                      {this.returnIcon(item.type)}
                    </View>
                    <View style={styles.info}>
                      <Text style={styles.date}>{item.start}</Text>
                      <Text style={styles.name}>Title: {item.title}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <Modal isVisible={isModalVisible}>
          <Modal.Container>
            <Modal.Header title="Are you sure you want to delete this friend?" />
            <Modal.Body>
              <Text style={styles.text}>This action cannot be undone</Text>
            </Modal.Body>
            <Modal.Footer>
              <Button title="Delete Friend" onPress={this.deleteFriend} />
              <Button title="Cancel" onPress={this.displayModal} />
            </Modal.Footer>
          </Modal.Container>
        </Modal>
      </SafeAreaView>
    );
  }
}

const mapState = state => {
  return {
    singleFriend: state.singleFriend,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchSingleFriend: friendId => dispatch(_fetchSingleFriend(friendId)),
    resetSingleFriend: () => dispatch(resetSingleFriend()),
    deleteFriend: friendId => dispatch(_deleteFriend(friendId)),
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
    backgroundColor: '#709775',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  headerContent: {
    padding: 5,
  },
  headerText: {
    fontSize: 25,
    fontFamily: 'Helvetica',
  },
  rapport: {
    fontSize: 20,
    fontFamily: 'Helvetica',
  },
  time: {
    fontSize: 22,
    fontFamily: 'Helvetica',
  },
  nickname: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'HelveticaNeue-Italic',
    color: '#577590',
  },
  text: {
    fontSize: 18,
  },
  friend: {
    padding: 15,
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
  friendBox: {
    flexDirection: 'row',
    height: 160,
  },
  friendInfo: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginLeft: 15,
    padding: 5,
  },
  icon: {
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
    marginLeft: 'auto',
  },
  back: {
    marginRight: 'auto',
  },
  button: {
    marginLeft: 'auto',
  },
  avatar: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
  },

  body: {
    backgroundColor: '#fbfbf2',
    flex: 1,
  },
  box: {
    display: 'flex',
    padding: 15,
    height: 80,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  iconBox: {
    width: 30,
    height: 30,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 15,
    padding: 5,
  },
  date: {
    fontSize: 18,
    alignSelf: 'center',
    fontFamily: 'Helvetica',
    textAlign: 'left',
    color: '#90a955',
    marginRight: 'auto',
  },
  name: {
    fontSize: 25,
    alignSelf: 'center',
    fontFamily: 'Helvetica',
    textAlign: 'left',
    marginRight: 'auto',
  },
});

export default connect(mapState, mapDispatch)(SingleFriend);
