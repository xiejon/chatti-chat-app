import React from "react";
import ChatInterface from "../components/ChatInterface";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8 bg-off-white">
      <Header />
      <main className="flex w-full flex-col items-center justify-center">
        <ChatInterface />
      </main>
    </div>
  );
}