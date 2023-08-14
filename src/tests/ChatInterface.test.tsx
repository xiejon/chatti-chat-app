import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ChatInterface from "../components/ChatInterface";

describe("ChatInterface component", () => {
  // Mock scrollIntoView
  let originalScrollIntoView: typeof window.HTMLElement.prototype.scrollIntoView;

  beforeEach(() => {
    originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
  });

  it("should render the ChatInterface component", () => {
    render(<ChatInterface />);
    expect(
      screen.getByPlaceholderText("Type your message...")
    ).toBeInTheDocument();
  });

  it("should allow typing in the input field", () => {
    render(<ChatInterface />);
    const input = screen.getByPlaceholderText(
      "Type your message..."
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Hello, World!" } });
    expect(input.value).toBe("Hello, World!");
  });

  it("should send a message when the send button is clicked", () => {
    render(<ChatInterface />);
    const input = screen.getByPlaceholderText("Type your message...");
    fireEvent.change(input, { target: { value: "Hello, World!" } });
    const sendButton = screen.getByAltText("send");
    fireEvent.click(sendButton);

    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });

  it('should not send a message when the input field is empty', () => {
    render(<ChatInterface />);

    const messagesBefore = screen.queryAllByTestId('message');

    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByAltText('send');
    
    expect(input).toHaveValue('');

    fireEvent.click(sendButton);

    // Count # of messages after attempting to send empty message
    const messagesAfter = screen.queryAllByTestId('message');

    // # of messages should remain the same
    expect(messagesAfter.length).toBe(messagesBefore.length);
  });
});
