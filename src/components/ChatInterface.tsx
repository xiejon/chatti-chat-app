"use client";

import React, { useReducer } from "react";
import { messages as sampleMessages } from "../data/messages";
import { channels as sampleChannels } from "../data/channels";
import ChannelList from "./ChannelList";
import MessageContainer from "./MessageContainer";
import Image from "next/image";
import { users as initialUsers } from "../data/users";
import Modal from "./Modal";
import { User } from "../interfaces/user";
import { State, Action } from "../interfaces/chat";

const initialState: State = {
  channels: sampleChannels,
  currentChannel: sampleChannels[0],
  messages: sampleMessages,
  inputMessage: "",
  isMenuOpen: false,
  isModalOpen: true,
  users: initialUsers,
  currUser: { id: "", username: "" },
};

function chatReducer(state: State, action: Action) {
  switch (action.type) {
    // Set value of input message
    case "SET_INPUT_MESSAGE":
      return { ...state, inputMessage: action.payload };

    // Send new message and clear input field
    case "SEND_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
        inputMessage: "",
      };

    // Add reply to a specific message
    case "REPLY_TO_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    // Set name of user, add to users list, and close modal
    case "SET_NAME":
      return {
        ...state,
        users: [...state.users, action.payload.newUser],
        currUser: action.payload.newUser,
        isModalOpen: false,
      };

    // Toggle channel menu visibility
    case "TOGGLE_MENU":
      return { ...state, isMenuOpen: !state.isMenuOpen };

    default:
      return state;
  }
}

const ChatInterface = () => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (state.inputMessage.trim() === "") return; // Return if input is empty

    const newMessage = {
      id: (state.messages.length + 1).toString(),
      content: state.inputMessage,
      senderId: state.currUser.id,
      timestamp: new Date(),
      channelId: state.currentChannel.id,
    };

    dispatch({ type: "SEND_MESSAGE", payload: newMessage });
  };

  // Create new user after name is entered in Modal & set as currUser
  const handleSetName = (name) => {
    const newId = (state.users.length + 1).toString();
    const newUser: User = {
      id: newId,
      username: name,
    };

    dispatch({ type: "SET_NAME", payload: { newUser } });
  };

  return (
    <section className="relative flex flex-col w-full md:w-3/4 lg:w-1/2 bg-light-gray justify-center mt-16 rounded">
      {state.isModalOpen && <Modal onSetName={handleSetName} />}
      <nav className="flex flex-row w-full bg-red">
        <button
          className="mx-4 my-2 lg:hidden"
          onClick={() => dispatch({ type: "TOGGLE_MENU" })}
        >
          <Image src="/menu.svg" alt="menu" height={30} width={30} />
        </button>
        <div className="ml-2 mt-3 text-off-white lg:mx-4 lg:my-3 text-xl text-center">
          {state.currentChannel.name}
        </div>
      </nav>
      <div className="flex">
        <div
          className={`lg:flex ${state.isMenuOpen ? "flex" : "hidden"} lg:block`}
        >
          <ChannelList channels={state.channels} />
        </div>
        <div className="flex flex-col w-full">
          <MessageContainer messages={state.messages} users={state.users} currUser={state.currUser}/>
          <form className="flex flex-row" onSubmit={handleSendMessage}>
            <input
              className="flex-grow px-4 py-2 focus:outline-dark-red"
              type="text"
              placeholder="Type your message..."
              value={state.inputMessage}
              onChange={(e) =>
                dispatch({ type: "SET_INPUT_MESSAGE", payload: e.target.value })
              }
            ></input>
            <button className="p-2 bg-red text-white" type="submit">
              <Image src="/send.svg" alt="send" height={30} width={30} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
