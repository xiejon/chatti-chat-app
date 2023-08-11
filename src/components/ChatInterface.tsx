"use client";

import React, { useState } from "react";
import { Channel } from "../interfaces/channel";
import ChannelList from "./ChannelList";
import { channels as sampleChannels } from "../data/channels";
import MessageBox from "./MessageBox";
import Image from "next/image";

const ChatInterface = () => {
  const [channels, setChannels] = useState<Channel[]>(sampleChannels);
  //   const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <section className="relative flex w-full md:w-3/4 lg:w-1/2 bg-light-gray justify-center mt-16 rounded">
      <div className="flex">
        <button
          className="absolute left-6"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Image src="/menu.svg" alt="menu" height={30} width={30} />
        </button>
        <div>{isMenuOpen && <ChannelList channels={channels} />}</div>
        <MessageBox />
      </div>
    </section>
  );
};

export default ChatInterface;
