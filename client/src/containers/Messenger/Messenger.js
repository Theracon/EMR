import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./Messenger.module.css";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as authActionCreators from "../../store/action-creators/authentication";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRef } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCe1DfCRnQlDSoOVOeRE1O9Ck-9tOra4Fg",
  authDomain: "e-med-records.firebaseapp.com",
  databaseURL:
    "https://e-med-records-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "e-med-records",
  storageBucket: "e-med-records.appspot.com",
  messagingSenderId: "144026144493",
  appId: "1:144026144493:web:34e4aa1e9715f4807b06e4",
  measurementId: "G-D20RF0J9RF",
};

// If there is an existing firebase app, use it. Else, initialize a new firebase app
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const firestore = firebase.firestore();

const ChatMessage = (props) => {
  const { date, time, text, uid, sender } = props.message;
  const messageClass =
    uid === localStorage.getItem("email") ? styles.Sent : styles.Received;

  return (
    <div className={`${styles.Message} ${messageClass}`}>
      <p>
        {messageClass === styles.Sent ? (
          <span>
            <span className={styles.MessageText}>{text}</span>
            <span className={styles.MessageDateTimeHolder}>
              <span>{date}</span>
              <span>{time}</span>
            </span>
          </span>
        ) : (
          <span>
            <span className={styles.MessageSender}>{sender}</span>
            <span className={styles.MessageText}>{text}</span>
            <span className={styles.MessageDateTimeHolder}>
              <span>{date}</span>
              <span>{time}</span>
            </span>
          </span>
        )}
      </p>
    </div>
  );
};

const ChatRoom = (props) => {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(50);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  let messageReceiver = null;
  let messageReceiverId = null;

  if (localStorage.getItem("userType") === "hw") {
    messageReceiver = localStorage.getItem("patientName");
    messageReceiverId = localStorage.getItem("patientId");
  } else {
    messageReceiver = localStorage.getItem("doctorName");
    messageReceiverId = localStorage.getItem("doctorId");
  }

  const sendMessage = async (e) => {
    e.preventDefault();

    const uid = localStorage.getItem("email");

    let sender = "";
    if (localStorage.getItem("userType") === "hw") {
      sender = `Dr. ${localStorage.getItem("name")} ${localStorage.getItem(
        "surname"
      )}`;
    } else {
      sender = `${localStorage.getItem("name")} ${localStorage.getItem(
        "surname"
      )}`;
    }

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      sender,
      receiver: messageReceiver,
      ruid: messageReceiverId,
      date: new Date().toLocaleDateString("en-NG"),
      time: new Date().toLocaleTimeString(),
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollBottomMsgIntoView = (element) => {
    element.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => scrollBottomMsgIntoView(dummy), [messages]);

  let patientChatUI = (
    <React.Fragment>
      <Backdrop />
      <Spinner />
    </React.Fragment>
  );
  if (!props.loading) {
    patientChatUI =
      messages &&
      messages
        .filter(
          (message) =>
            (message.uid === localStorage.getItem("email") &&
              message.ruid === localStorage.getItem("doctorId")) ||
            (message.ruid === localStorage.getItem("email") &&
              message.uid === localStorage.getItem("doctorId"))
        )
        .map((message) => <ChatMessage key={message.id} message={message} />);
  }

  let doctorChatUI = (
    <React.Fragment>
      <Backdrop />
      <Spinner />
    </React.Fragment>
  );
  if (!props.loading) {
    doctorChatUI =
      messages &&
      messages
        .filter(
          (message) =>
            (message.uid === localStorage.getItem("email") &&
              message.ruid === localStorage.getItem("patientId")) ||
            (message.ruid === localStorage.getItem("email") &&
              message.uid === localStorage.getItem("patientId"))
        )
        .map((message) => <ChatMessage key={message.id} message={message} />);
  }

  const chatsUI =
    localStorage.getItem("userType") === "hw" ? doctorChatUI : patientChatUI;

  return (
    <React.Fragment>
      <main className={styles.Main}>
        {chatsUI}

        <div ref={dummy}></div>
      </main>
      <form className={styles.Form} onSubmit={sendMessage}>
        <button
          type="button"
          className={styles.FormButton}
          onClick={props.startVideoChat}
        >
          <i className={`fas fa-video ${styles.FormButtonIcon}`}></i>
        </button>
        <input
          className={styles.Input}
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit" className={styles.FormButton}>
          <i className={`fas fa-play-circle ${styles.FormButtonIcon}`}></i>
        </button>
      </form>
    </React.Fragment>
  );
};

const Messenger = (props) => {
  let redirectToLogin = null;
  const expirationDate = new Date(localStorage.getItem("expirationDate"));
  const now = new Date();
  if (now >= expirationDate) {
    redirectToLogin = <Redirect to="/login" />;
    props.onLogout();
  }

  const startVideoChat = (props) => {
    props.history.push("video-chat");
  };

  return (
    <React.Fragment>
      {redirectToLogin}
      <div className={styles.App}>
        <section className={styles.AppSection}>
          <ChatRoom
            doctorName={props.doctorName}
            doctorId={props.doctorId}
            patientName={props.patientName}
            patientId={props.patientId}
            loading={props.loading}
            startVideoChat={() => startVideoChat(props)}
          />
        </section>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.messenger.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(authActionCreators.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);
