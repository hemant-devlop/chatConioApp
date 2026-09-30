"use client";

import { getConversation, getConversations, getsConversation, sendMessage } from "@/lib/http";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChatTopBar from "./ChattopBar";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { socket } from "@/lib/socket";
import { useAuth } from "@/context/authContext";

export default function ConversationPage() {
  const { user: me, accessToken } = useAuth()
  const _id = me?._id;
  const { conversationId } = useParams()

  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    let active = true;
    setLoading(true);

    async function fetchConversations() {
      const userConversation = await getConversations(accessToken)

      if (!active) return;

      if (userConversation.success && _id) {
        setUser(userConversation.data[0].participants.filter(c => c._id !== _id)[0])
      }

      setLoading(false);
    }

    fetchConversations();

    return () => {
      active = false;
    };
  }, [accessToken, conversationId, _id]);

  useEffect(() => {
    if (!accessToken || !conversationId) return;
    let active = true;
    setLoading(true);

    async function fetchMessages() {
      const userMessages = await getConversation(accessToken, conversationId)

      if (!active) return;
      if (userMessages.success) {
        setMessages(userMessages.data)
      }
      setLoading(false);
    }

    fetchMessages();

    return () => {
      active = false;
    };
  }, [accessToken, conversationId, _id]);


  useEffect(() => {
    const getData=(data)=>{
      console.log(data)
    }
    socket.on("new-message",getData)
    return () => {
      socket.off("new-message",getData)
    }
  }, [])
  
  async function handleSend(text) {
    console.log(messages)
    console.log(text)
    socket.emit("send-message", { text, conversationId })

    // setMessages((prev) => [...prev, optimisticMessage]);

    // try {
    //   const saved = await sendMessage(1, text);
    //   setMessages((prev) => prev.map((m) => (m.id === optimisticMessage.id ? saved : m)));
    // } catch (err) {
    //   setMessages((prev) =>
    //     prev.map((m) => (m.id === optimisticMessage.id ? { ...m, status: "failed" } : m))
    //   );
    // }
  }

  // if (loading || !conversation) {
  //   return (
  //     <div className="flex h-full flex-1 items-center justify-center">
  //       <p className="text-sm text-charcoal/60">Loading conversation…</p>
  //     </div>
  //   );
  // }

  return (
    <div className="relative flex flex-1 h-dvh flex-col overflow-hidden">
      <ChatTopBar user={user} />
      <MessageList messages={messages} isTyping={false} />
      <MessageInput onSend={handleSend} />
    </div>
  );
}