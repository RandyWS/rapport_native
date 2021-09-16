import React, {Component} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Link,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {connect} from 'react-redux';
import {createContact} from '../redux/singleContact';
import {_fetchUser, setUser} from '../redux/user';
import DatePicker from 'react-native-date-picker';

class NewCommunication extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      userFriends: [],
      friend: '',
      title: '',
      date: '',
      content: '',
      open: false,
      errors: {
        title: '',
        date: '',
        content: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.selectFriend = this.selectFriend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userName);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        user: this.props.user,
      });
    }
    if (prevProps.userFriends !== this.props.userFriends) {
      this.setState({
        userFriends: this.props.userFriends,
      });
    }
  }

  componentWillUnmount() {
    this.props.clearUser();
  }

  handleChange(event) {
    // front-end error handling
    const {name, value} = event.target;
    // make a copy of the state's errors
    let errors = this.state.errors;
    // error handling for valid name, address, and imageUrl
    switch (name) {
      // first two check if the first/last name is empty
      case 'title':
        errors.title = !value.length ? 'Please provide a title' : '';
        break;
      default:
        break;
    }

    // sets the copy of the error state we made with the changes we implemented through switch on the state

    this.setState({
      errors,
      [name]: value,
    });
  }

  handleDate(date) {
    this.setState({
      date: date,
      open: false,
    });
  }

  selectFriend(ev) {
    ev.preventDefault();
    this.setState({
      friend: ev.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.props.createContact({...this.state});
  }

  render() {
    // type checks for errors in initial rendering
    const {title, date, content, errors, open} = this.state;
    const {handleChange, handleSubmit, handleDate, selectFriend} = this;
    const userFriends = this.state.userFriends || [];

    return (
      <View>
        {errors.title ? <Text>{errors.title}</Text> : null}
        <Text>Title:</Text>
        <TextInput
          placeholder="Title of communcation"
          placeholderTextColor="#003f5c"
          onChangeText={handleChange}
          value={title}
          // style={{
          //   border: errors.title ? '2px solid red' : this.state.value,
          // }}
        />
        {errors.content ? <Text>{errors.content}</Text> : null}
        <Text>Content:</Text>
        <TextInput
          placeholder="Description of communcation"
          placeholderTextColor="#003f5c"
          onChangeText={handleChange}
          value={content}
          // style={{
          //   border: errors.content ? '2px solid red' : this.state.value,
          // }}
        />

        <Button
          title="Choose Date"
          onPress={() => this.setState({open: true})}
        />
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={handleDate}
          onCancel={() => this.setState({open: false})}
        />
        <Picker selectedValue={this.state.friend} onValueChange={selectFriend}>
          <Picker.Item label="Select Friend" value="" />
          {userFriends.map(friend => (
            <Picker.Item
              key={friend.id}
              label={friend.firstName + ' ' + friend.lastName}
              value={friend.id}
            />
          ))}
        </Picker>
        <TouchableOpacity onPress={handleSubmit}>
          <Text>Add New Communication</Text>
        </TouchableOpacity>
        <Link to="/" underlayColor="#f0f4f7">
          <Text>Cancel</Text>
        </Link>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    userFriends: state.userFriends,
    loggedIn: state.loggedIn,
    message: state.authMessage,
  };
};

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    createContact: contact => dispatch(createContact(contact, history)),
    fetchUser: username => dispatch(_fetchUser(username, history)),
    clearUser: () => dispatch(setUser({})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCommunication);
