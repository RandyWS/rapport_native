import React from "react";

export const FriendsList = (props) => {
  const friend = props.friend;

  return (
    <div className="column">
      <img src={friend.imageUrl} />
      <div className="row">
        <h3>
          Name: {friend.firstName} {friend.lastName}
        </h3>
      </div>
    </div>
  );
};
