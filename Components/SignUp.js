import React, { Component } from "react";
import { connect } from "react-redux";
import { createUser } from "../redux/user";
import { Link } from "react-router-dom";
import { _logOut } from "../redux/loggedIn";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      imageUrl: "",
      errors: {
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        gpa: "",
        imageUrl: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.logOut();
    }
  }

  handleChange(event) {
    // front-end error handling
    const { name, value } = event.target;
    // make a copy of the state's errors
    let errors = this.state.errors;
    // error handling for valid name, address, and imageUrl
    switch (name) {
      // first two check if the first/last name is empty
      case "userName":
        errors.userName = !value.length ? "Please provide a username" : "";
        break;
      case "password":
        errors.password = !value.length ? "Please provide a password" : "";
        break;
      case "firstName":
        errors.firstName = !value.length ? "Please provide a first name" : "";
        break;
      case "lastName":
        errors.lastName = !value.length ? "Please provide a last name" : "";
        break;
      case "email":
        // checks email contains @ and .com
        errors.email = errors.email = !value.match(/(?=.*@)(?=.*\.com)/)
          ? "Please provide a valid email"
          : "";
        break;
      case "imageUrl":
        // match tests if the value contains valid file format
        errors.imageUrl = !value.match(/\.(jpeg|jpg|png|gif)/)
          ? "Please provide a valid image url"
          : "";
        // checks if the field is empty because the user is allowed to do that
        errors.imageUrl = !value.length ? "" : errors.imageUrl;
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

    this.props.createUser({ ...this.state });
  }

  render() {
    // type checks for errors in initial rendering
    const {
      userName,
      password,
      firstName,
      lastName,
      email,
      imageUrl,
      errors,
    } = this.state;
    const { handleSubmit } = this;

    return (
      <form id="sign-up-form" onSubmit={handleSubmit}>
        {errors.userName ? <h3 className="error">{errors.userName}</h3> : null}
        <label htmlFor="userName">Username:</label>
        <input
          name="userName"
          value={userName}
          onChange={this.handleChange}
          // changes input box to red if error on state
          style={{
            border: errors.firstName ? "2px solid red" : this.state.value,
          }}
        />

        {errors.password ? <h3 className="error">{errors.password}</h3> : null}
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          value={password}
          onChange={this.handleChange}
          style={{
            border: errors.firstName ? "2px solid red" : this.state.value,
          }}
        />
        {errors.firstName ? (
          <h3 className="error">{errors.firstName}</h3>
        ) : null}
        <label htmlFor="firstName">First Name:</label>
        <input
          name="firstName"
          value={firstName}
          onChange={this.handleChange}
          // changes input box to red if error on state
          style={{
            border: errors.firstName ? "2px solid red" : this.state.value,
          }}
        />
        {errors.lastName ? <h3 className="error">{errors.lastName}</h3> : null}
        <label htmlFor="lastName">Last Name:</label>
        <input
          name="lastName"
          value={lastName}
          onChange={this.handleChange}
          style={{
            border: errors.lastName ? "2px solid red" : this.state.value,
          }}
        />
        {errors.email ? <h3 className="error">{errors.email}</h3> : null}
        <label htmlFor="email">Email Address:</label>
        <input
          name="email"
          value={email}
          onChange={this.handleChange}
          style={{
            border: errors.email ? "2px solid red" : this.state.value,
          }}
        />
        {errors.imageUrl ? <h3 className="error">{errors.imageUrl}</h3> : null}
        <label htmlFor="imageUrl">Image Url:</label>
        <input
          name="imageUrl"
          value={imageUrl}
          onChange={this.handleChange}
          style={{
            border: errors.imageUrl ? "2px solid red" : this.state.value,
          }}
        />
        <button type="submit">Submit New User</button>
        <Link className="link" to="/">
          Cancel
        </Link>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createUser: (user) => dispatch(createUser(user, history)),
    logOut: () => dispatch(logOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
