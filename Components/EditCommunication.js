import React, {useState, Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
import {_fetchSingleComm, _editComm} from '../Redux';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

class EditCommunication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      type: '',
      start: new Date(),
      end: new Date(),
      open: false,
      titleError: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.returnIcon = this.returnIcon.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleComm(this.props.route.params.commId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.singleComm !== this.props.singleComm) {
      let {title, content, type, start, end} = this.props.singleComm;
      console.log(this.props.singleComm);
      start = new Date(new Date(start));
      end = new Date(new Date(end));

      this.setState({title, content, type, start, end});
    }
  }

  onSubmit() {
    const {title, content, type, start, end, titleError} = this.state;

    if (!title) {
      this.setState({titleError: 'You must include a title'});
    } else if (title && titleError) {
      this.setState({titleError: ''});
    }

    if (!titleError) {
      this.props.createComm({
        friendId: this.props.route.params.friendId,
        title,
        content,
        type,
        start,
        end,
      });
    }
    this.props.navigation.navigate('Friend', {
      friendId: this.props.singleComm.friendId,
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
    const {title, content, type, start, end, titleError, open} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <AntDesign.Button
              name="back"
              backgroundColor="#99c1b9"
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('Communication', {
                  commId: this.props.singleComm.id,
                })
              }
            />
          </View>
        </View>
        {titleError ? <Text>{titleError}</Text> : null}
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="edit title"
            placeholderTextColor="#52796f"
            value={title}
            onChangeText={title => this.setState({title: title})}
          />
        </View>

        <View style={styles.content}>
          <TextInput
            style={styles.TextInput}
            placeholder="edit content"
            placeholderTextColor="#52796f"
            value={content}
            onChangeText={content => this.setState({content: content})}
          />
        </View>

        <View style={styles.row}>
          {type ? this.returnIcon(type) : null}
          <RNPickerSelect
            placeholder={{label: `edit type`, value: type}}
            onValueChange={value => this.setState({type: value})}
            style={pickerSelectStyles}
            items={[
              {label: 'phone-call', value: 'phone-call'},
              {label: 'text', value: 'text'},
              {label: 'social-media', value: 'social-media'},
              {label: 'email', value: 'email'},
              {label: 'letter', value: 'letter'},
              {label: 'other', value: 'other'},
            ]}
          />
        </View>

        {start ? (
          <>
            <Text style={styles.date}>
              Start: {moment(start).format('LLLL')}
            </Text>
            <Text style={styles.date}>End: {moment(end).format('LLLL')}</Text>
          </>
        ) : null}

        <TouchableOpacity
          onPress={() => this.setState({open: true})}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>Choose date and time of Rapport</Text>
        </TouchableOpacity>

        <DatePicker
          modal
          open={open}
          date={start}
          onConfirm={date => {
            this.setState({open: false});
            this.setState({start: date});
          }}
          onCancel={() => this.setState({open: false})}
        />

        <TouchableOpacity
          onPress={() => this.setState({open: true})}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>Choose end time of Rapport</Text>
        </TouchableOpacity>

        <DatePicker
          modal
          mode="time"
          open={open}
          date={end}
          onConfirm={date => {
            this.setState({open: false});
            this.setState({end: date});
          }}
          onCancel={() => this.setState({open: false})}
        />

        <TouchableOpacity onPress={this.onSubmit} style={styles.loginBtn}>
          <Text style={styles.loginText}>ADD CONVERSATION</Text>
        </TouchableOpacity>
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
    createComm: newComm => dispatch(_createComm(newComm)),
  };
};

export default connect(mapState, mapDispatch)(EditCommunication);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
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
  row: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 'auto',
    flexDirection: 'row',
    padding: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 0.2,
      width: -0.4,
    },
    elevation: 0.5,
  },
  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#dde5b6',
    borderRadius: 4,
    width: '70%',
    height: 45,
    marginBottom: 20,
    borderWidth: 0.3,
    borderColor: 'gray',
    width: '100%',

    // alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    fontSize: 16,
    alignItems: 'center',
  },

  content: {
    backgroundColor: '#dde5b6',
    borderRadius: 4,
    width: '70%',
    height: 200,
    marginBottom: 20,
    borderWidth: 0.3,
    borderColor: 'gray',
    width: '100%',
  },

  loginBtn: {
    width: '100%',
    borderRadius: 4,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#709775',
  },
  loginText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  date: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    fontFamily: 'Helvetica',
    textAlign: 'left',
    color: '#52796f',
    marginRight: 'auto',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    backgroundColor: '#dde5b6',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0.3,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    width: '100%',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  placeholder: {
    color: '#52796f',
    padding: 10,
  },
});
