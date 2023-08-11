import React from "react";
import { Channel } from "../interfaces/channel";

interface ChannelListProps {
  channels: Channel[];
}

const ChannelList: React.FC<ChannelListProps> = ({ channels }) => {
  return (
    <div>
      {channels?.map((channel) => <div key={channel.id}>{channel.name}</div>)}
    </div>
  );
};

export default ChannelList;
