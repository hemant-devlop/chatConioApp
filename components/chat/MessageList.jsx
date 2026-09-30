"use client";

import { useEffect, useRef } from "react";
import TypingIndicator from "./MessageIndicator";
import MessageBubble from "./MessageBubble";
import { useAuth } from "@/context/authContext";


// TODO: replace with the signed-in user's id from your auth/session layer

export default function MessageList({ messages, isTyping }) {
  const {user}=useAuth()
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 pb-24 pt-20">
      {messages?.map((message) => (
        <MessageBubble
          key={message._id}
          message={message}
          isOwn={message.sender === user?._id}
        />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}