"use client";

import React, { useState } from "react";
import { Channel } from "../interfaces/channel";
import { Message } from "../interfaces/message";
import { messages as sampleMessages } from "../data/messages";
import { channels as sampleChannels } from "../data/channels";
import ChannelList from "./ChannelList";
import MessageContainer from "./MessageContainer";
import Image from "next/image";

const ChatInterface = () => {
  const [channels, setChannels] = useState<Channel[]>(sampleChannels);
  const [currentChannel, setCurrentChannel] = useState<Channel>(
    sampleChannels[0]
  );
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleSendMessage = () => {
    setInputMessage("");
  };

  return (
    <section className="relative flex flex-col w-full md:w-3/4 lg:w-1/2 bg-light-gray justify-center mt-16 rounded">
      <nav className="flex flex-row w-full bg-red">
        <button
          className="mx-4 my-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Image src="/menu.svg" alt="menu" height={30} width={30} />
        </button>
        <div className="ml-2 mt-3 text-off-white">{currentChannel.name}</div>
      </nav>
      <div className="flex">
        <div>{isMenuOpen && <ChannelList channels={channels} />}</div>
        <MessageContainer messages={messages} />
      </div>
      <div className="flex">
        <input
          className="flex-grow rounded p-2"
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        ></input>
        <button onClick={handleSendMessage} className="p-2 rounded bg-red text-white">
          <Image src="/send.svg" alt="send" height={30} width={30} />
        </button>
      </div>
    </section>
  );
};

export default ChatInterface;
