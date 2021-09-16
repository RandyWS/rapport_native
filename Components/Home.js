import React, { Component } from "react";
import { connect } from "react-redux";
import UserPage from "./UserPage";
import LogIn from "./LogIn";
import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      message: "",
      user: {},
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loggedIn !== this.props.loggedIn) {
      this.setState({
        loggedIn: this.props.loggedIn,
        message: this.props.message,
      });
    }
    if (prevProps.user !== this.props.user) {
      this.setState({
        user: this.props.user,
      });
    }
  }

  // This is doing a sample authenticated call
  // if this call fails, we are not logged in
  // and we can update state accordingly.
  // everytime loggedIn changes, we try this again.
  // to update the message
  // useEffect(() => {
  //   async function fetchAuthenticated() {
  //     const response = await fetch("/authenticated");
  //     const result = await response.json();
  //     setMessage(result.message);
  //     setLoggedIn(result.loggedIn);
  //   }
  //   fetchAuthenticated();
  // }, [loggedIn]);

  render() {
    const loggedIn = this.state.loggedIn;
    const path = `/user/${this.props.user.userName}`;

    return (
      <div>
        {!loggedIn ? (
          <LogIn
            history={this.props.history}
            message={this.state.message}
          ></LogIn>
        ) : (
          <Redirect to={path} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn.loggedIn,
    message: state.loggedIn.message,
    user: state.user,
  };
};

export default connect(mapStateToProps)(Home);
