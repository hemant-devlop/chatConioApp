import Link from "next/link";
import { PhoneIcon, VideoIcon, InfoIcon, SvgBack } from "../ui/icons/Svg";
import Avatar from "./Avatar";

// function statusLabel() {

//   if (user?.status === "typing") return "typing…";

//   if (user?.status === "online") return "Online";

//   if (user?.lastSeen) {
//     return `Last seen ${new Date(user?.lastSeen).toLocaleString("en-US", {
//       month: "short",
//       day: "numeric",
//       hour: "numeric",
//       minute: "2-digit",
//     })}`;
//   }

//   return "Offline";
// }

export default function ChatTopBar({ user }) {
  const isTyping = false;

  return (
    <header className="z-20 flex shrink-0 items-center justify-between border-b border-silver bg-white px-6 py-3.5">
      <div className="flex items-center gap-2">
        <Link href='/chat' >
          <SvgBack className="text-charcoal" />
        </Link>

        <Link href='/profile' className="cursor-pointer" >
          <Avatar name={user?.name} avatarUrl={user?.avatarUrl} status={user?.status} size="sm" />
        </Link>
        <div>
          <Link href='/profile' className="cursor-pointer" >
            <p className="text-sm font-medium text-charcoal">{user?.name}</p>
          </Link>
          <p className={`text-xs ${isTyping ? "font-medium text-slate" : "text-charcoal/50"}`}>  offline </p>
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
}