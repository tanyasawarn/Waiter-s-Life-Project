import React from "react";

function DeleteButton(props) {
  return (
    <button onClick={() => props.onDelete(props.index)}>Delete</button>
  );
}

export default DeleteButton;
