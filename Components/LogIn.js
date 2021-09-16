import React, { Component } from "react";
import { connect } from "react-redux";
import { _logIn } from "../redux/loggedIn";

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSubmit(ev) {
    ev.preventDefault();

    this.props.logIn({
      ...this.state,
    });
  }
  render() {
    const { onChange, onSubmit } = this;
    const { username, password } = this.state;
    return (
      <form onSubmit={onSubmit}>
        <input value={username} onChange={onChange} name="username" />
        <input value={password} onChange={onChange} name="password" />
        <button>Sign In</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    logIn: (credentials) => dispatch(_logIn(credentials, history)),
  };
};

export default connect(null, mapDispatchToProps)(LogIn);
