import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Modal from "../components/Modal";

describe("Modal component", () => {
  it("should render 'Enter Your Name' label", () => {
    render(<Modal onSetName={() => {}} />);
    const linkElement = screen.getByText(/Enter Your Name:/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("should handle input change and submit", () => {
    const handleSetName = jest.fn();
    render(<Modal onSetName={handleSetName} />);

    fireEvent.change(screen.getByLabelText(/Enter Your Name:/i), {
      target: { value: "John Doe" },
    });
    fireEvent.click(screen.getByText(/Start Chatting/i));

    expect(handleSetName).toHaveBeenCalledWith("John Doe");
  });
});
