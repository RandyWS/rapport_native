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
import {_fetchSingleComm, resetComm} from '../Redux';

class SingleCommunication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communication: {},
    };
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
    this.props.resetComm();
  }

  render() {
    const {communication} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.name}>Date: {communication.date}</Text>
            <Text style={styles.name}>Title: {communication.title}</Text>
            <Text style={styles.name}>Content: {communication.content}</Text>
          </View>
        </View>
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
    backgroundColor: '#20B2AA',
  },
  headerContent: {
    padding: 30,
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
