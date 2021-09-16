import React from "react";

export const Contact = (props) => {
  const singleContact = props.singleContact;

  return (
    <div className="column">
      <h2>Title: {singleContact.title}</h2>
      <h2>Date: {singleContact.date}</h2>
      <h3>Content: {singleContact.content}</h3>
    </div>
  );
};
