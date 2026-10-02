"use client"
import Link from "next/link";
import RotatingWord from "./RotatingWord";
import FloatingMessageCard from "./FloatingMessageCard";
import LiveUserStack from "./LiveUserStack";
import MiniChatPreview from "./MiniChatPreview";
import { SearchIcon } from "../ui/icons/Svg";
import { useState } from "react";
import Avatar from "../chat/Avatar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { findUserByUsername, getNewConversation } from "@/lib/http";

export default function HomePage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [findMyFriend, setFindMyFriend] = useState(false)
  const [error,setError]=useState(null)
  const [findUser, setFindUser] = useState(null)

  const { user ,accessToken} = useAuth()
  const handleFindMyFriend =async (e) => {
    e.preventDefault()
    const res=await findUserByUsername(accessToken,query)
    if(res?.success){
      setError(null)
      setFindUser(res?.data)
    }else{
      setFindUser(null)
      setError(res.message)
    }
  }
  const handleFindUser =() => {
    router.push(`/profile/${findUser._id}`)
  }

  return (
    <div className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-cream">
      {/* Decorative background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-slate/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-charcoal/5 blur-3xl"
      />

      <header className="relative z-10 flex shrink-0 items-center justify-between px-6 py-5 lg:px-10">
        <span className="font-display text-lg font-semibold text-charcoal">
          Thread<span className="text-slate">.</span>
        </span>
        <div className="flex items-center gap-2 sm:gap-4">
          {user ?  <Link
              href="/profile"
              className="rounded-full bg-charcoal ps-4 pe-2 py-2 text-sm capitalize font-medium text-cream transition-colors hover:bg-charcoal/90"
            >
              {user?.name||'Welcome'} <Avatar name="hemant kumar " avatarUrl={null} status='offline' statusHide={false} size="sm"/>
            </Link> :
           <>
            <Link
              href="/login"
              className="text-sm hidden lg:block font-medium text-charcoal/70 transition-colors hover:text-charcoal"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-charcoal px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-charcoal/90"
            >
              Get started
            </Link>
            </>}
        </div>
      </header>

      {/* Floating message previews — desktop only, purely decorative */}
      <FloatingMessageCard
        name="Ava Thompson"
        text="Just landed 🚀"
        status="online"
        delay="0s"
        className="absolute left-[7%] top-[24%] hidden -rotate-3 lg:block"
      />
      <FloatingMessageCard
        name="Marcus Webb"
        text="typing…"
        status="typing"
        delay="1.2s"
        className="absolute right-[9%] top-[20%] hidden rotate-2 lg:block"
      />
      <FloatingMessageCard
        name="Priya Nair"
        text="Sounds perfect, see you then"
        status="online"
        delay="2s"
        className="absolute left-[10%] bottom-[18%] hidden rotate-2 lg:block"
      />
      <FloatingMessageCard
        name="Leo Fischer"
        text="Pushed the update ✅"
        status="offline"
        delay="0.6s"
        className="absolute right-[7%] bottom-[22%] hidden -rotate-2 lg:block"
      />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
        {/* find my friend  */}

        {findMyFriend && <>
          <div className="absolute top-0 w-full max-h-1/2 max-w-lg ">
            <div className="inset-0 bg-[#f5f5f5] absolute blur-2xl  " />
            <div className="z-999 relative p-4 animate-bubble-in">
              <form onSubmit={handleFindMyFriend} className="relative">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find My Friend"
                  className="w-full rounded-lg border border-silver bg-cream/60 py-2 pl-9 pr-3.5 text-sm text-charcoal shadow-md focus:shadow-none outline-none transition-colors placeholder:text-charcoal/40 focus:border-slate focus:ring-2 focus:ring-slate/20 [&::-webkit-search-cancel-button]:cursor-pointer"
                />
              </form>
            </div>
            <div className="relative z-999 px-6 py-2.5 space-y-2 ">
              {error && <div>{error}</div>}
              {findUser && <div onClick={handleFindUser} className="cursor-pointer flex p-2.5 gap-2.5 bg-charcoal rounded-xl">
                <Avatar name="hemant kumar " avatarUrl={null} status='offline' size="sm" />
                <div>
                  <p className="text-xs md:text-sm font-medium text-cream text-start">{findUser?.name}</p>
                  <p className="text-start text-xs text-cream">@{findUser.username}</p>
                </div>
              </div>}
            </div>
          </div>
        </>}

        <span className="font-display text-xs uppercase tracking-[0.25em] text-slate">
          Real-time messaging
        </span>

        <h1 className="font-display max-w-2xl text-4xl font-semibold leading-tight text-charcoal sm:text-5xl lg:text-6xl">
          Conversations that{" "}
          <RotatingWord
            words={["flow", "connect", "never wait", "just work"]}
            className="text-slate"
          />
          .
        </h1>

        <p className="max-w-md text-sm text-charcoal/60 sm:text-base">
          Thread brings your messages, calls, and people into one fast, focused
          place — built for people who'd rather talk than wait on a page to load.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          {user ?
            <>
              <div
                onClick={() => setFindMyFriend(!findMyFriend)}
                className="rounded-lg bg-charcoal cursor-pointer px-6 py-3 text-center text-sm font-medium text-cream transition-colors hover:bg-charcoal/90"
              >
                Find My Friend
              </div>
              <Link
                href="/chat"
                className="rounded-lg border border-silver px-6 py-3 text-center text-sm font-medium text-charcoal transition-colors hover:border-slate hover:text-slate"
              >
                Find My Chat
              </Link>
            </>
            : <>
              <Link
                href="/signup"
                className="rounded-lg bg-charcoal px-6 py-3 text-center text-sm font-medium text-cream transition-colors hover:bg-charcoal/90"
              >
                Create your account
              </Link>
              <Link
                href="/login"
                className="rounded-lg border border-silver px-6 py-3 text-center text-sm font-medium text-charcoal transition-colors hover:border-slate hover:text-slate"
              >
                Sign in
              </Link>
            </>
          }


        </div>

        <LiveUserStack tone="light" />
        <MiniChatPreview />
      </main>
    </div>
  );
}