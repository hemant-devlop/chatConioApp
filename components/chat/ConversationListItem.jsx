import Link from "next/link";
import Avatar from "./Avatar";
import { useAuth } from "@/context/authContext";

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ConversationListItem({ conversation, active }) {
  const {user:me}=useAuth()
  const _id=me?._id;
  const { _id:conversationId, lastMessage, unreadCount=1,participants } = conversation;

  const user=participants?.filter(user=>user._id!==_id)[0]
  // const isTyping = user.status === "typing";
  const isTyping = false;
  return (
    <Link
      href={`/chat/${conversationId}`}
      className={`flex items-center gap-3 rounded-xl px-2 py-1.5 md:px-3 md:py-2.5 transition-colors ${
        active ? "bg-charcoal" : "hover:bg-silver/30"
      }`}
    >
      <Avatar name={user.name} avatarUrl={user.avatarUrl} status={user.status} size="sm" />

      <div className=" min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className={`truncate text-sm capitalize font-medium ${active ? "text-cream" : "text-charcoal"}`}>
            {user.name}
          </span>
          <span className={`shrink-0 text-xs ${active ? "text-cream/60" : "text-charcoal/50"}`}>
            {formatTime(lastMessage?.createdAt)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span
            className={`truncate text-xs ${
              isTyping ? "font-medium text-slate" : active ? "text-cream/70" : "text-charcoal/60"
            }`}
          >
            {isTyping
              ? "typing…"
              : lastMessage.sender === _id
              ? `You: ${lastMessage.content}`
              : lastMessage.content}
          </span>
          {unreadCount > 0 && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-slate px-1.5 text-[11px] font-semibold text-cream">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}