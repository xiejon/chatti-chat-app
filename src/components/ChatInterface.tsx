"use client";

import React, { useState } from "react";
import { Channel } from "../interfaces/channel";
import { Message } from "../interfaces/message";
import { messages as sampleMessages } from "../data/messages";
import { channels as sampleChannels } from "../data/channels";
import ChannelList from "./ChannelList";
import MessageContainer from "./MessageContainer";
import Image from "next/image";
import { users as initialUsers } from "../data/users";
import Modal from "./Modal";
import { User } from "../interfaces/user";

const ChatInterface = () => {
  const [channels, setChannels] = useState<Channel[]>(sampleChannels);
  const [currentChannel, setCurrentChannel] = useState<Channel>(
    sampleChannels[0]
  );
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [currUser, setCurrUser] = useState<User>({id: '', username: ''});

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return; // Prevent sending empty messages

    const newMessage = {
      id: (messages.length + 1).toString(),
      content: inputMessage,
      senderId: currUser.id,
      timestamp: new Date(),
      channelId: currentChannel.id,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
  };

  const handleSetName = (name) => {
    const newId = (users.length + 1).toString();
    const newUser: User = {
      id: newId,
      username: name,
    };

    setUsers(prev => [...prev, newUser]);
    setCurrUser(newUser);
    setIsModalOpen(false);
  };

  return (
    <section className="relative flex flex-col w-full md:w-3/4 lg:w-1/2 bg-light-gray justify-center mt-16 rounded">
      {isModalOpen && <Modal onSetName={handleSetName} />}
      <nav className="flex flex-row w-full bg-red">
        <button
          className="mx-4 my-2 lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Image src="/menu.svg" alt="menu" height={30} width={30} />
        </button>
        <div className="ml-2 mt-3 text-off-white lg:mx-4 lg:my-3 text-xl text-center">
          {currentChannel.name}
        </div>
      </nav>
      <div className="flex">
        <div className={`lg:flex ${isMenuOpen ? "flex" : "hidden"} lg:block`}>
          <ChannelList channels={channels} />
        </div>
        <div className="flex flex-col w-full">
          <MessageContainer messages={messages} users={users}/>
          <div className="flex flex-row">
            <input
              className="flex-grow px-4 py-2 focus:outline-dark-red"
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            ></input>
            <button
              onClick={handleSendMessage}
              className="p-2 bg-red text-white"
            >
              <Image src="/send.svg" alt="send" height={30} width={30} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
