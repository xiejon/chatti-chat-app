import React from 'react'
import ChannelList from './ChannelList'

const ChatInterface = () => {
  return (
    <section className='flex w-full md:w-3/4 lg:w-1/2 bg-mid-gray justify-center mt-16 rounded'>
        Chat Interface
        <ChannelList />
    </section>
  )
}

export default ChatInterface