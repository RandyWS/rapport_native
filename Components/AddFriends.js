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

class AddFriend extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Add Friend</Text>
      </View>
    );
  }
}

// const mapStateToProps = state => {
//   return {};
// };

// const mapDispatchToProps = (dispatch, {history}) => {
//   return {};
// };

// export default connect(null, null)(AddFriend);

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { _fetchUser, setUser } from "../redux/user";
// import { _createFriend } from "../redux/userSingleFriend";

// class AddFriend extends Component {
//   constructor() {
//     super();
//     this.state = {
//       user: {},
//       nickname: "",
//       firstName: "",
//       lastName: "",
//       description: "",
//       imageUrl: "",
//       errors: {
//         firstName: "",
//         lastName: "",
//         imageUrl: "",
//       },
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   componentDidMount() {
//     this.props.fetchUser(this.props.match.params.userName);
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.user !== this.props.user) {
//       this.setState({
//         user: this.props.user,
//       });
//     }
//   }

//   componentWillUnmount() {
//     this.props.clearUser();
//   }

//   handleChange(event) {
//     const { name, value } = event.target;

//     let errors = this.state.errors;

//     switch (name) {
//       case "firstName":
//         errors.firstName = !value.length ? "Please provide a first name" : "";
//         break;
//       case "lastName":
//         errors.lastName = !value.length ? "Please provide a last name" : "";
//         break;
//       case "imageUrl":
//         errors.imageUrl = !value.match(/\.(jpeg|jpg|png|gif)/)
//           ? "Please provide a valid image url"
//           : "";
//         errors.imageUrl = !value.length ? "" : errors.imageUrl;
//         break;
//       default:
//         break;
//     }

//     this.setState({
//       errors,
//       [name]: value,
//     });
//   }

//   handleSubmit(evt) {
//     evt.preventDefault();

//     this.props.createFriend({ ...this.state });
//   }

//   render() {
//     // type checks for errors in initial rendering
//     const {
//       nickname,
//       firstName,
//       lastName,
//       description,
//       imageUrl,
//       errors,
//     } = this.state;
//     const { handleChange, handleSubmit } = this;

//     return (
//       <form id="add-friend-form" onSubmit={handleSubmit}>
//         <label htmlFor="nickname">Nickname:</label>
//         <input
//           name="nickname"
//           value={nickname}
//           onChange={handleChange}
//           style={{
//             border: errors.nickname ? "2px solid red" : this.state.value,
//           }}
//         />

//         {errors.firstName ? (
//           <h3 className="error">{errors.firstName}</h3>
//         ) : null}
//         <label htmlFor="firstName">First Name:</label>
//         <input
//           name="firstName"
//           value={firstName}
//           onChange={handleChange}
//           style={{
//             border: errors.firstName ? "2px solid red" : this.state.value,
//           }}
//         />

//         {errors.lastName ? <h3 className="error">{errors.lastName}</h3> : null}
//         <label htmlFor="lastName">Last Name:</label>
//         <input
//           name="lastName"
//           value={lastName}
//           onChange={handleChange}
//           style={{
//             border: errors.lastName ? "2px solid red" : this.state.value,
//           }}
//         />

//         <label htmlFor="description">Description:</label>
//         <input
//           name="description"
//           value={description}
//           onChange={handleChange}
//           style={{
//             border: errors.description ? "2px solid red" : this.state.value,
//           }}
//         />

//         {errors.imageUrl ? <h3 className="error">{errors.imageUrl}</h3> : null}
//         <label htmlFor="imageUrl">Image Url:</label>
//         <input
//           name="imageUrl"
//           value={imageUrl}
//           onChange={handleChange}
//           style={{
//             border: errors.imageUrl ? "2px solid red" : this.state.value,
//           }}
//         />

//         <button type="submit">Add New Friend</button>
//         <Link className="link" to="/">
//           Cancel
//         </Link>
//       </form>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//     loggedIn: state.loggedIn,
//     message: state.authMessage,
//   };
// };

// const mapDispatchToProps = (dispatch, { history }) => {
//   return {
//     createFriend: (friend) => dispatch(_createFriend(friend, history)),
//     fetchUser: (username) => dispatch(_fetchUser(username, history)),
//     clearUser: () => dispatch(setUser({})),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(AddFriend);
