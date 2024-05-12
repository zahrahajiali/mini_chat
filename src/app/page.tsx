"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaPhotoVideo, FaStopCircle } from "react-icons/fa";
import { IoMicOutline } from "react-icons/io5";
import io, { Socket } from "socket.io-client";
import { useRecordVoice } from "@/hook/recordVoice/useRecordVoice";

const socket: Socket = io("http://localhost:3001"); // Replace with your server URL

const Index: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [serverStatus, setServerStatus] = useState<string>("connecting...");
  const [upload, setUpload] = useState<boolean>(false);
  const { startRecording, stopRecording, recording } = useRecordVoice();
  //soket showing
  useEffect(() => {
    if (socket.connected) {
      setServerStatus("connected");
    } else if (!socket.connected) {
      setServerStatus("disconnected");
    } else {
      setServerStatus("onnecting...");
    }
  }, [socket]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on("chat message", (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  // useEffect(() => {
  //   console.log("socket", socket);
  // }, [socket]);
  // useEffect(() => {
  //   console.log("messages:::", messages);
  // }, [messages]);
  // useEffect(() => {
  //   console.log("newMessage:::", newMessage);
  // }, [newMessage]);

  //send message
  const sendMessage = () => {
    socket.emit("chat message", newMessage);
    setNewMessage("");
  };
  // upload video
  const uploadMode = () => {
    setUpload(true);
  };
  const [selectedFile, setSelectedFile] = useState();

  const handleFileUpload = async (event) => {
    // Same implementation as in the previous example
  };
  return (
    <div className="flex  bg-[#181818] h-[100vh]  justify-center items-center ">
      <div className="flex bg-[#3a3a3a] rounded-[0.8rem] w-[30%] flex-col items-center h-[50%] justify-between p-[1rem]">
        <div className="flex items-start w-[100%]">
          <CgProfile size={30} />
          <div className="flex flex-col pl-[1rem]">
            <span>username</span>
            <span className="text-[0.8rem] text-[#09B77B]">{serverStatus}</span>
          </div>
        </div>
        <div className="w-[100%] flex items-center justify-between">
          {!upload ? (
            <button onClick={uploadMode}>
              <FaPhotoVideo size={25} />
            </button>
          ) : null}
          {upload ? (
            <div>
              <h2>Upload Video File</h2>
              <form onSubmit={handleFileUpload}>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(event) => setSelectedFile(event.target.files[0])}
                />
                <button type="submit">Upload</button>
              </form>
            </div>
          ) : (
            <input
              placeholder="Message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="rounded-[0.4rem] w-[90%] h-[2.4rem] px-[0.5rem] text-[#181818] outline-[#595959] mx-[0.8rem]"
            />
          )}
          {newMessage.length > 0 ? (
            <button>
              <AiOutlineSend onClick={sendMessage} size={25} color="#09B77B" />
            </button>
          ) : (
            <button>
              {recording ? (
                <FaStopCircle
                  onClick={stopRecording}
                  // onMouseUp={stopRecording} // Stop recording when mouse is released
                  // onTouchEnd={stopRecording} // Stop recording when touch ends on a touch device
                  size={25}
                  color="#09B77B"
                />
              ) : (
                <IoMicOutline
                  size={25}
                  color="#09B77B"
                  onClick={startRecording}
                  // onMouseDown={startRecording}
                  // onTouchStart={startRecording}
                />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
    // <div>
    //   <h1>Real-Time Chat</h1>
    //   <div>
    //     {messages.map((message, index) => (
    //       <div key={index}>{message}</div>
    //     ))}
    //   </div>
    //   <input
    //     type="text"
    //     value={newMessage}
    //     onChange={(e) => setNewMessage(e.target.value)}
    //   />
    //   <button onClick={sendMessage}>Send</button>
    // </div>
  );
};

export default Index;
