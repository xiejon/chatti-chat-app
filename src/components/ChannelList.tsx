import React from "react";
import { Channel } from "../interfaces/channel";

interface ChannelListProps {
  channels: Channel[];
}

const ChannelList: React.FC<ChannelListProps> = ({ channels }) => {
  return (
    <div className="bg-dark-red text-off-white px-4 py-2">
      {channels?.map((channel) => <div className="py-2" key={channel.id}>{channel.name}</div>)}
    </div>
  );
};

export default ChannelList;
