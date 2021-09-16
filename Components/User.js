import React from "react";

const User = (props) => {
  if (!props.user) {
    return null;
  }

  const user = props.user;
  return (
    <div className="column">
      <img src={user.imageUrl} />
      <div className="row">
        <h2>Username: {user.userName}</h2>
        <h3>
          Name: {user.firstName} {user.lastName}
        </h3>
        <h3>Email: {user.email}</h3>
      </div>
    </div>
  );
};

export default User;
