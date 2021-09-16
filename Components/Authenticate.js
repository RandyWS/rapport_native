import React, { Component } from "react";
import UserPage from "./UserPage";
import LogIn from "./LogIn";

class Authenticate extends Component {
  constructor() {
    super();
    this.state = {
      auth: {},
    };
    this.signIn = this.signIn.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    window.localStorage.removeItem("token");
    this.setState({ auth: {} });
  }

  async attemptTokenLogin() {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });

      if (response.status !== 404) {
        const notes = await axios.get(`api/users/${response.data.id}/notes`);
        this.setState({ auth: response.data, notes: notes.data.notes });
      }
    }
  }
  componentDidMount() {
    this.attemptTokenLogin();
  }
  async signIn(credentials) {
    let response = await axios.post("/api/auth", credentials);
    const { token } = response.data;
    window.localStorage.setItem("token", token);
    this.attemptTokenLogin();
  }
  render() {
    const { auth } = this.state;
    const { signIn, logout } = this;
    if (!auth.id) {
      return <SignIn signIn={signIn} />;
    } else {
      return <UserPage />;
    }
  }
}

export default Authenticate;
