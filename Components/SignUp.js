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
import {connect} from 'react-redux';
import {createUser} from '../redux/user';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      errors: {
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        imageUrl: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // front-end error handling
    const {name, value} = event.target;
    // make a copy of the state's errors
    let errors = this.state.errors;
    // error handling for valid name, address, and imageUrl
    switch (name) {
      // first two check if the first/last name is empty
      case 'userName':
        errors.userName = !value.length ? 'Please provide a username' : '';
        break;
      case 'password':
        errors.password = !value.length ? 'Please provide a password' : '';
        break;
      case 'firstName':
        errors.firstName = !value.length ? 'Please provide a first name' : '';
        break;
      case 'lastName':
        errors.lastName = !value.length ? 'Please provide a last name' : '';
        break;
      case 'email':
        // checks email contains @ and .com
        errors.email = errors.email = !value.match(/(?=.*@)(?=.*\.com)/)
          ? 'Please provide a valid email'
          : '';
        break;
      case 'imageUrl':
        // match tests if the value contains valid file format
        errors.imageUrl = !value.match(/\.(jpeg|jpg|png|gif)/)
          ? 'Please provide a valid image url'
          : '';
        // checks if the field is empty because the user is allowed to do that
        errors.imageUrl = !value.length ? '' : errors.imageUrl;
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

  handleSubmit(evt) {
    evt.preventDefault();

    this.props.createUser({...this.state});
  }

  render() {
    // type checks for errors in initial rendering
    const {userName, password, firstName, lastName, email, imageUrl, errors} =
      this.state;
    const {handleChange, handleSubmit} = this;

    return (
      <View>
        {errors.userName ? <Text>{errors.userName}</Text> : null}
        <Text>Username:</Text>
        <TextInput
          placeholder="Please add a username"
          placeholderTextColor="#003f5c"
          onChangeText={handleChange}
          value={userName}
        />

        {errors.password ? <Text>{errors.password}</Text> : null}
        <Text>Password:</Text>
        <TextInput
          placeholder="Please add a password"
          placeholderTextColor="#003f5c"
          onChangeText={handleChange}
          value={password}
        />

        {errors.firstName ? <Text>{errors.firstName}</Text> : null}
        <Text>First Name:</Text>
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#003f5c"
          onChangeText={handleChange}
          value={firstName}
        />

        {errors.lastName ? <Text>{errors.lastName}</Text> : null}
        <Text>Last Name:</Text>
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#003f5c"
          onChangeText={handleChange}
          value={lastName}
        />

        {errors.email ? <Text>{errors.email}</Text> : null}
        <Text>Email:</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={handleChange}
          value={email}
        />

        {errors.imageUrl ? <Text>{errors.imageUrl}</Text> : null}
        <Text>ImageUrl:</Text>
        <TextInput
          placeholder="Please provide an optional ImageUrl for your profile"
          placeholderTextColor="#003f5c"
          onChangeText={handleChange}
          value={imageUrl}
        />

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

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    createUser: user => dispatch(createUser(user, history)),
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
