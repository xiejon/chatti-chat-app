import React from "react";
import { Channel } from "../interfaces/channel";

interface ChannelListProps {
  channels: Channel[];
  onChannelClick: (channel: Channel) => void;
}

const ChannelList: React.FC<ChannelListProps> = ({
  channels,
  onChannelClick,
}) => {
  return (
    <div className="bg-dark-red text-off-white px-4 py-2">
      {channels?.map((channel) => (
        <div
          className="py-2 hover:cursor-pointer"
          key={channel.id}
          onClick={(e) => onChannelClick(channel)}
        >
          {channel.name}
        </div>
      ))}
    </div>
  );
};

export default ChannelList;
