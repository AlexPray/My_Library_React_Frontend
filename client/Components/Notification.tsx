import React from "react";
import { useState } from "react";
import "./Notification.css";

const Notification = (props: any) => {

  const [statusText, setStatusText] = useState("")

  return (
    <div className={`notification-container ${props.className}`}>
      <div className="notification" >{props.message}</div>
      {/* <button className="undo-button">Undo</button> */}
    </div>
  );
};

export default Notification;
