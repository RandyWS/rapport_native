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
import {_fetchSingleFriend, resetSingleFriend, _deleteFriend} from '../Redux';

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

  render() {
    const {friend, communications, isModalVisible} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: friend.imageUrl,
              }}
            />
            <Text style={styles.name}>
              {friend.firstName} {friend.lastName}
            </Text>
            <Text style={styles.name}>Nickname: {friend.nickname}</Text>
            <Text style={styles.name}>Description: {friend.description}</Text>
            <Text style={styles.name}>
              {`Rapport since: ${friend.createdAt}`}
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Edit Friend', {
                  friendId: friend.id,
                })
              }
              style={styles.loginBtn}>
              <Text style={styles.loginText}>Edit Friend</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.displayModal}
              style={styles.loginBtn}>
              <Text style={styles.loginText}>Delete Friend</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.body}>
          <FlatList
            enableEmptySections={true}
            data={communications}
            contentContainerStyle={styles.cardcontainer}
            keyExtractor={item => {
              return item.id;
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
                    <Text style={styles.username}>
                      Date: {item.date.slice(0, 10)}
                    </Text>
                    <Text style={styles.username}>Title: {item.title}</Text>
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
      </View>
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

export default connect(mapState, mapDispatch)(SingleFriend);
