"use client";

import React, { useReducer } from "react";
import Image from "next/image";
import ChannelList from "./ChannelList";
import MessageContainer from "./MessageContainer";
import Modal from "./Modal";
import { User } from "../interfaces/user";
import { Channel } from "../interfaces/channel";
import { State, Action } from "../interfaces/chat";
import { messages as sampleMessages } from "../data/messages";
import { channels as sampleChannels } from "../data/channels";
import { users as initialUsers } from "../data/users";
import { getUsername } from "../utils/userUtil";

const initialState: State = {
  channels: sampleChannels,
  currentChannel: sampleChannels[0],
  messages: sampleMessages,
  inputMessage: "",
  isMenuOpen: false,
  isModalOpen: true,
  users: initialUsers,
  currUser: { id: "", username: "" },
  replyTo: null,
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
        messages: [...state.messages, { ...action.payload, isReply: true }],
        inputMessage: "",
        replyTo: null,
      };

    case "ENTER_REPLY_MODE":
      return { ...state, replyTo: action.payload };

    case "CANCEL_REPLY_MODE":
      return { ...state, replyTo: null };

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

    // Set chat channel
    case "SET_CHANNEL":
      return {
        ...state,
        currentChannel: action.payload,
      };

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
      parentId: state.replyTo ? state.replyTo.messageId : undefined, // Add parentId if it's a reply
    };

    // If in reply mode, dispatch reply, else send a normal message
    if (state.replyTo) {
      dispatch({ type: "REPLY_TO_MESSAGE", payload: newMessage });
    } else {
      dispatch({ type: "SEND_MESSAGE", payload: newMessage });
    }

    dispatch({ type: "CANCEL_REPLY_MODE" });
  };

  // Create new user after name is entered in Modal, then set as currUser
  const handleSetName = (name: string) => {
    const newId = (state.users.length + 1).toString();
    const newUser: User = {
      id: newId,
      username: name,
    };

    dispatch({ type: "SET_NAME", payload: { newUser } });
  };

  const handleChannelClick = (channel: Channel) => {
    dispatch({ type: "SET_CHANNEL", payload: channel });
  };

  // Filter messages based on current channel
  const channelMessages = state.messages.filter(
    (message) => message.channelId === state.currentChannel.id
  );

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
          <ChannelList
            channels={state.channels}
            onChannelClick={handleChannelClick}
          />
        </div>
        <div className="flex flex-col w-full">
          <MessageContainer
            messages={channelMessages}
            users={state.users}
            currUser={state.currUser}
            onReply={(parentId, userId) =>
              dispatch({
                type: "ENTER_REPLY_MODE",
                payload: { messageId: parentId, userId },
              })
            }
          />
          <form className="flex flex-row" onSubmit={handleSendMessage}>
            {state.replyTo && (
              <button
                type="button"
                className="bg-red p-2 text-off-white"
                onClick={() => dispatch({ type: "CANCEL_REPLY_MODE" })}
              >
                Cancel Reply
              </button>
            )}
            <input
              className="flex-grow px-4 py-2 focus:outline-dark-red"
              type="text"
              placeholder={
                state.replyTo
                  ? `Replying to ${getUsername(
                      state.replyTo.userId,
                      state.users
                    )}...` // "Replying to Jane Doe..."
                  : "Type your message..."
              }
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
