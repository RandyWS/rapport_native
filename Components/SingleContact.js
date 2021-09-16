import React, { Component } from "react";
import { connect } from "react-redux";
import { resetSingleContact, getSingleContact } from "../redux/singleContact";
import { FriendsList } from "./FriendsList";
import { Contact } from "./Contact";

class SingleContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleContact: {},
      singleFriend: {},
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.props.getSingleContact(this.props.match.params.contactId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.singleContact !== this.props.singleContact) {
      this.setState({
        singleContact: this.props.singleContact,
      });
    }

    if (prevProps.singleFriend !== this.props.singleFriend) {
      this.setState({
        singleFriend: this.props.singleFriend,
      });
    }
  }

  componentWillUnmount() {
    this.props.resetSingleContact();
  }

  render() {
    const singleContact = this.state.singleContact.id
      ? this.state.singleContact
      : {};

    const singleFriend = this.state.singleFriend.id
      ? this.state.singleFriend
      : {};

    if (!singleContact.id && !singleFriend.id) {
      return null;
    }

    return (
      <div className="column">
        <Contact singleContact={singleContact} />
        <FriendsList friend={singleFriend} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singleContact: state.singleContact,
    singleFriend: state.singleFriend,
    message: state.authMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleContact: (contactId) => dispatch(getSingleContact(contactId)),
    resetSingleContact: () => dispatch(resetSingleContact()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleContact);
