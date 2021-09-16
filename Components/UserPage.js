import React, { Component } from "react";
import { connect } from "react-redux";
import User from "./user";
import { FriendsList } from "./FriendsList";
import { Link } from "react-router-dom";
import { _fetchUser, setUser } from "../redux/user";
import Unauthorized from "./Unauthorized";

class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      userFriends: [],
    };
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userName);
  }

  componentWillUnmount() {
    this.props.clearUser();
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

  render() {
    if (this.props.message === "Unauthorized") {
      return <Unauthorized />;
    }
    const user = { ...this.props.user } || {};
    const friends = this.state.userFriends || [];
    const path = `/user/${this.props.match.params.userName}/calendar`;

    return (
      <div>
        <Link to={path}>Go to Calendar</Link>
        <div>{user.id ? <User user={user} /> : null}</div>
        {!friends.length ? (
          <h4>You have no friends!</h4>
        ) : (
          ((<h3>Rapport with {friends.length} friends!</h3>),
          friends.map((friend) => (
            <FriendsList friend={friend} key={friend.id} />
          )))
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userFriends: state.userFriends,
    loggedIn: state.loggedIn,
    message: state.authMessage,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    clearUser: () => dispatch(setUser({})),
    fetchUser: (username) => dispatch(_fetchUser(username, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
