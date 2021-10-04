/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {_fetchUser, _fetchComm, resetComm} from '../Redux';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      friends: [],
      communications: [],
    };
    this.returnIcon = this.returnIcon.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchComm();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({user: this.props.user});
    }
    if (prevProps.friends !== this.props.friends) {
      this.setState({friends: this.props.friends});
    }

    if (prevProps.comm !== this.props.comm) {
      let propComm = [];
      this.props.comm.forEach(c => {
        let newComm = {...c};
        let startTime = moment(c.start).clone().format('LLLL');
        let endTime = moment(c.start).clone().format('LLLL');
        newComm.start = startTime;
        newComm.end = endTime;
        propComm.push({...newComm});
      });

      this.setState({communications: propComm});
    }
  }

  componentWillUnmount() {
    this.props.resetComm();
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
    const {user, friends, communications} = this.state;
    console.log(friends);

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: user.imageUrl,
              }}
            />
            <Text style={styles.username}>
              {user.firstName} {user.lastName}
            </Text>
          </View>
        </View>
        <FlatList
          enableEmptySections={true}
          data={communications}
          contentContainerStyle={styles.cardcontainer}
          // keyExtractor={item => {
          //   return item.id.toString();
          // }}
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
      </SafeAreaView>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    friends: state.friends,
    comm: state.comm,
  };
};

const mapDispatch = (dispatch, {newJWT}) => {
  return {
    fetchUser: () => dispatch(_fetchUser()),
    fetchComm: () => dispatch(_fetchComm()),
    resetComm: () => dispatch(resetComm()),
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
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  username: {
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

export default connect(mapState, mapDispatch)(Profile);
