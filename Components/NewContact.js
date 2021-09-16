import React, { Component } from "react";
import { connect } from "react-redux";
import { createContact } from "../redux/singleContact";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { _fetchUser, setUser } from "../redux/user";

class NewContact extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      userFriends: [],
      friend: "",
      title: "",
      date: "",
      content: "",
      errors: {
        title: "",
        date: "",
        content: "",
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
    const { name, value } = event.target;
    // make a copy of the state's errors
    let errors = this.state.errors;
    // error handling for valid name, address, and imageUrl
    switch (name) {
      // first two check if the first/last name is empty
      case "title":
        errors.title = !value.length ? "Please provide a title" : "";
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

    this.props.createContact({ ...this.state });
  }

  render() {
    // type checks for errors in initial rendering
    const { title, date, content, errors } = this.state;
    const { handleSubmit } = this;
    const userFriends = this.state.userFriends || [];

    return (
      <form id="sign-up-form" onSubmit={handleSubmit}>
        {errors.title ? <h3 className="error">{errors.title}</h3> : null}
        <label htmlFor="contact-title">Title:</label>
        <input
          name="title"
          value={title}
          onChange={this.handleChange}
          style={{
            border: errors.firstName ? "2px solid red" : this.state.value,
          }}
        />

        {errors.content ? <h3 className="error">{errors.content}</h3> : null}
        <label htmlFor="content">Content:</label>
        <input
          name="content"
          value={content}
          onChange={this.handleChange}
          style={{
            border: errors.lastName ? "2px solid red" : this.state.value,
          }}
        />

        {errors.date ? <h3 className="error">{errors.date}</h3> : null}
        <label htmlFor="date">Date:</label>
        <DatePicker
          selected={date}
          onChange={this.handleDate} //only when value has changed
        />

        <select
          id="dropdown"
          value={this.state.friend}
          onChange={this.selectFriend}
        >
          <option value="">Select Friend</option>
          {userFriends.map((friend) => (
            <option key={friend.id} value={friend.id}>
              {friend.firstName + " " + friend.lastName}
            </option>
          ))}
        </select>

        <button type="submit">Submit New Message</button>
        <Link className="link" to="/">
          Cancel
        </Link>
      </form>
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
    createContact: (contact) => dispatch(createContact(contact, history)),
    fetchUser: (username) => dispatch(_fetchUser(username, history)),
    clearUser: () => dispatch(setUser({})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewContact);
