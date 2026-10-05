"use client";

import { useRef, useState } from "react";
import { SendIcon } from "../ui/icons/Svg";
import { socket } from "@/lib/socket";


export default function MessageInput({ onSend,conversationId }) {
  const [message, setMessage] = useState("");
  const isTyping = useRef(false)
  const typingCounter = useRef(null)
  function handleSubmit(e) {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;
    onSend(text);
    setValue("");
  }
  const handleTyping = (e) => {
    const value = e.target.value;
    setMessage(value);
    if (isTyping.current) {
      socket.emit("typing:start", {conversationId})
    }

    clearTimeout(typingCounter.current);

    typingCounter.current = setTimeout(() => {
      isTyping.current = false;
      socket.emit("typing:stop", {conversationId})
    }, 1000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full z-20  flex items-center gap-3 border-t border-silver bg-white px-2 md:px-6 py-4"
    >
      <input
        type="text"
        value={value}
        onChange={handleTyping}
        placeholder="Write a message…"
        className="flex-1 rounded-full border border-silver bg-cream/60 px-4 py-2.5 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/40 focus:border-slate focus:ring-2 focus:ring-slate/20"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal text-cream transition-colors hover:bg-charcoal/90 disabled:opacity-40"
        aria-label="Send message"
      >
        <SendIcon className="h-4 w-4" />
      </button>
    </form>
  );
}