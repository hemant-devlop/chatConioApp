"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getConversations } from "@/lib/http";
import ConversationListItem from "./ConversationListItem";
import { SearchIcon } from "../ui/icons/Svg";
import { useAuth } from "@/context/authContext";

export default function ConversationList() {
  const { accessToken } = useAuth()

  const [conversations, setConversations] = useState([])
  // console.log(conversations)
  useEffect(() => {
    if (!accessToken) return;
    async function getConversationList() {
      const res = await getConversations(accessToken)
      if (res.success) {
        const filteredConversations = res?.data?.filter(conversation => conversation?.lastMessage !== null)
        setConversations(filteredConversations)
      } else {
        console.log(res)
      }
    }
    getConversationList()
  }, [accessToken])
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const filtered = conversations?.filter((c) => c);
  // const filtered = conversations?.filter((c) =>
  //   c.user.name.toLowerCase().includes(query.toLowerCase())
  // );

  if (!!!conversations) {
    return (
      <div className={` ${pathname.startsWith('/chat/') && "hidden md:flex "} `} >
        loading...
      </div>
    )
  }
  return (
    <aside className={`flex ${pathname.startsWith('/chat/') && "hidden md:flex "} h-screen w-full md:max-w-xs shrink-0 flex-col border-r border-silver bg-white lg:w-80`}>
      <div className=" flex items-center justify-between px-2.5 py-2.5 md:px-5 md:pt-6">
        <Link href="/" className="font-display  text-lg font-semibold text-charcoal">
          Thread<span className="text-slate">.</span>
        </Link>
        <Link
          href="/settings"
          className="text-sm text-charcoal/60 transition-colors hover:text-slate"
        >
          Settings
        </Link>
      </div>

      <div className=" px-5 py-4">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations"
            className="w-full rounded-lg border border-silver bg-cream/60 py-2 pl-9 pr-3.5 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/40 focus:border-slate focus:ring-2 focus:ring-slate/20"
          />
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {filtered.map((conversation) => (
          <ConversationListItem
            key={conversation._id}
            conversation={conversation}
            active={pathname === `/chat/${conversation._id}`}
          />
        ))}
        {filtered.length === 0 && (
          <p className="px-2 py-6 text-center text-sm text-charcoal/50">No conversations found</p>
        )}
      </nav>
    </aside>
  );
}