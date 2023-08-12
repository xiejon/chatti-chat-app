import React from "react";
import { useState } from "react";

interface ModalProps {
  onSetName: (name: string) => void;
}

const Modal: React.FC<ModalProps> = ({ onSetName }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSetName(name);
  };

  return (
    <div className="absolute w-full h-full flex z-50 bg-red justify-center items-center">
      <form className="p-4 flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-off-white">
          Enter Your Name:
        </label>
        <input
          id="name"
          className="rounded bg-off-white focus:outline-red px-4 py-2 mt-2"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="px-4 py-2 rounded bg-dark-red text-off-white text-xl mt-4"
          type="submit"
        >
          Start Chatting
        </button>
      </form>
    </div>
  );
};

export default Modal;
