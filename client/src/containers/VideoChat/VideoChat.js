import React, { useEffect, useRef, useState } from "react";
import styles from "./VideoChat.module.css";

import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";

const url = "https://emr-prod.herokuapp.com";

const socket = io.connect(url || "http://localhost:3001");

const VideoChat = () => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <React.Fragment>
      <h1
        className="lead text-muted"
        style={{ textAlign: "center", fontWeight: "bold" }}
      >
        VIDEO CALL (BETA)
      </h1>
      <div className={styles.Container}>
        <div className={styles.VideoContainer}>
          <div className={styles.Video}>
            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: "100%" }}
              />
            )}
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "100%" }}
              />
            ) : null}
          </div>
          <div className={styles.CallerContainer}>
            {receivingCall && !callAccepted ? (
              <div className={styles.Caller}>
                <h1
                  className="display-6 text-white"
                  style={{
                    color: "black",
                    fontFamily: '"Poppins", sans-serif',
                  }}
                >
                  Incoming call... {name}
                </h1>
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={answerCall}
                >
                  Accept call
                </Button>
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.MyId}>
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            value={
              localStorage.getItem("userType") === "hw"
                ? `Dr. ${localStorage.getItem("name")} ${localStorage.getItem(
                    "surname"
                  )}`
                : `${localStorage.getItem("name")} ${localStorage.getItem(
                    "surname"
                  )}`
            }
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "20px" }}
          />

          <div
            style={{
              width: "100%",
              border: "1px solid #eee",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <p className="lh-1 lead">YOUR ID:</p>

            <p
              className="lead text-center lh-1 bg-dark text-white"
              style={{ padding: "20px" }}
            >
              {me}
            </p>

            <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AssignmentIcon fontSize="large" />}
              >
                Copy to clipboard
              </Button>
            </CopyToClipboard>
            <br />
          </div>
          <br />
          <small
            className="text-muted"
            style={{
              fontSize: "14px",
            }}
          >
            Give your ID to the user who wants to call you, or paste theirs
            below to call them.
          </small>
          <br />

          <TextField
            id="filled-basic"
            label="ID of user to call"
            variant="filled"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          />

          <div className={styles.CallButton}>
            {callAccepted && !callEnded ? (
              <Button variant="contained" color="secondary" onClick={leaveCall}>
                End Call
              </Button>
            ) : (
              <IconButton
                color="primary"
                aria-label="call"
                onClick={() => callUser(idToCall)}
              >
                <PhoneIcon fontSize="large" /> call
              </IconButton>
            )}
            {idToCall}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VideoChat;
