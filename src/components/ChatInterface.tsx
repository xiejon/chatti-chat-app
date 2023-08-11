import React, { useState } from "react";
import { Channel } from "../interfaces/channel";
import ChannelList from "./ChannelList";
import { channels as sampleChannels } from "../data/channels";

const ChatInterface = () => {
  const [channels, setChannels] = useState<Channel[]>(sampleChannels);

  return (
    <section className="flex w-full md:w-3/4 lg:w-1/2 bg-mid-gray justify-center mt-16 rounded">
      Chat Interface
      <ChannelList channels={channels} />
    </section>
  );
};

export default ChatInterface;
