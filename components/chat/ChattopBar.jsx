import Link from "next/link";
import { PhoneIcon, VideoIcon, InfoIcon, SvgBack } from "../ui/icons/Svg";
import Avatar from "./Avatar";
import React, { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { useAuth } from "@/context/authContext";

const ChatTopBar = React.memo(({ chatUser, conversationId }) => {

  const [isTyping, setIsTyping] = useState(false)
  const [isUserStatus, setUserStatus] = useState([])
  const { user } = useAuth()
  // console.log(user)
console.log(isUserStatus)
  function statusLabel() {

    if (isTyping) return "typing…";

    if (isUserStatus.includes(chatUser?._id)) return "Online";

    // if (chatUser?.lastSeen) {
    //   return `Last seen ${new Date(user?.lastSeen).toLocaleString("en-US", {
    //     month: "short",
    //     day: "numeric",
    //     hour: "numeric",
    //     minute: "2-digit",
    //   })}`;
    // }

    return "Offline";
  }

  useEffect(() => {
    if (!conversationId) return;

    const joinConversation = () => {
      socket.emit("join-conversation", { conversationId });
    };

    if (socket.connected) joinConversation();

    function handleTyping({ userId }) {
      if (user?._id !== userId) {
        setIsTyping(true)
      }
    }
    function handleTypingStop({ userId }) {
      if (user?._id !== userId) {
        setIsTyping(false)
      }
    }
    function handleStatus({ onlineUser }) {
      setUserStatus(onlineUser)
    }

    socket.on("typing:start", handleTyping);
    socket.on("user:online", handleStatus);
    socket.on("typing:stop", handleTypingStop);
    socket.on("connect", joinConversation);

    return () => {
      socket.off("typing:start", handleTyping)
      socket.off("user:online", handleStatus);
      socket.off("typing:stop", handleTypingStop);
      socket.off("connect", joinConversation);
      socket.emit("user:offline", {userId:user?._id})

    }
  }, [conversationId])

  return (
    <header className="z-20 flex shrink-0 items-center justify-between border-b border-silver bg-white px-6 py-3.5">
      <div className="flex items-center gap-2">
        <Link href='/chat' >
          <SvgBack className="text-charcoal" />
        </Link>

        <Link href={`/profile/${chatUser?._id}`} className="cursor-pointer" >
          <Avatar name={chatUser?.name} avatarUrl={chatUser?.avatarUrl} status={isUserStatus.includes(chatUser?._id)} size="sm" />
        </Link>
        <div>
          <Link href={`/profile/${chatUser?._id}`} className="cursor-pointer" >
            <p className="text-sm font-medium text-charcoal capitalize">{chatUser?.name}</p>
          </Link>
          <p className={`text-xs font-medium text-charcoal/50`}> {statusLabel()} </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className="rounded-full p-2 text-charcoal/60 transition-colors hover:bg-silver/30 hover:text-charcoal"
          aria-label="Voice call"
        >
          <PhoneIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="rounded-full p-2 text-charcoal/60 transition-colors hover:bg-silver/30 hover:text-charcoal"
          aria-label="Video call"
        >
          <VideoIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="rounded-full p-2 text-charcoal/60 transition-colors hover:bg-silver/30 hover:text-charcoal"
          aria-label="Conversation info"
        >
          <InfoIcon className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
});

export default ChatTopBar;