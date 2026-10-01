"use client";

import { getConversation, getConversationUser } from "@/lib/http";
import { useParams, useRouter } from "next/navigation";
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
const router=useRouter()
  // const [optimisticMessages, setOptimisticMessages] = useOptimistic(messages,(curr,newMess)=>[...curr,newMess]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!accessToken || !conversationId) return;
    let active = true;
    setLoading(true);

    async function fetchConversations() {
     try {
       const [conversationResponse,messageResponse]=await Promise.all([
        getConversationUser(accessToken,conversationId),
        getConversation(accessToken,conversationId)
      ])

      if (!active) return;
      if(!conversationResponse.success || !messageResponse.success){
        alert('user not found/invalid id')
         router.push('/chat')
      }
      if (conversationResponse.success && _id) {
        setUser(conversationResponse?.data?.participants.filter(c => c._id !== _id)[0])
      }
      if (messageResponse.success && _id) {
        setMessages(messageResponse.data)
      }

      setLoading(false);
     } catch (error) {
        console.error("api",error)
     }finally{
        setLoading(false);
     }
    }

    fetchConversations();

    return () => {
      active = false;
    };
  }, [accessToken, conversationId, _id]);

 


  useEffect(() => {
    if (!conversationId) return;

    const joinConversation = () => {
      socket.emit("join-conversation", { conversationId });
    };
    const handleNewMessage = (data) => {
      if (data.conversationId !== conversationId) return;
    const setMsgData=(current) =>
        current.some((message) => message.clientMessageId === data.newMessage.clientMessageId)
          ? current
          : [...current, data.newMessage]
      setMessages(setMsgData);
    };

    socket.on("connect", joinConversation);
    socket.on("new-message", handleNewMessage);
    if (socket.connected) joinConversation();

    return () => {
      socket.off("connect", joinConversation);
      socket.off("new-message", handleNewMessage);
    };
  }, [conversationId]);

  async function handleSend(text) {
    const clientMessageId=crypto.randomUUID();
    const optimisticMessage = {
      _id: new Date().toISOString(),
      content: text,
      clientMessageId,
      conversation: conversationId,
      createdAt: new Date().toISOString(),
      messageType: "text",
      sender: _id,
    }

    setMessages(prev=>[...prev,optimisticMessage])


    socket.emit("send-message", { text, conversationId,clientMessageId })
  }

  if (loading || !conversationId) {
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <p className="text-sm font- text-charcoal/60">Loading conversation…</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-1 h-dvh flex-col overflow-hidden">
      <ChatTopBar user={user} />
      <MessageList messages={messages} isTyping={false} />
      <MessageInput onSend={handleSend} />
    </div>
  );
}