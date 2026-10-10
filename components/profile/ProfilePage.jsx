"use client"
import { useAuth } from "@/context/authContext";
import { logout } from "@/lib/http";
import { setLoading } from "@/redux/ReduxSlices/app";
import { useRouter } from "next/navigation";
import React, { use } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProfilePage() {
  const { user, accessToken, setAuthStatus, setUser } = useAuth()
  const { loading } = useSelector(state => state.app)
  const router = useRouter()
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      dispatch(setLoading(true))
      const res = await logout(accessToken)
      if (res.success) {
        router.push('/login');
        setAuthStatus('unauthenticated');
        localStorage.clear();
        setUser(null)
      } else {
        dispatch(setLoading(false))
      }
    } catch (error) {
      console.log('logout error', error);
    } finally {
      dispatch(setLoading(null))
    }
  }
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Main Container */}
      <main className="mx-auto max-w-4xl px-4 py-6 md:px-8">

        {/* Header */}
        <div className="flex items-center gap-2">
          <div onClick={()=>router.back()} className="inline-flex cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M328 112L184 256l144 144" />
            </svg>

          </div>
          <div className="flex items-center justify-between flex-1 ">
            <h1 className="font-semibold uppercase">{user?.name}</h1>
            <button onClick={handleLogout} className="cursor-pointer text-sm border  border-zinc-900 px-4 rounded-full py-1">logout</button>
          </div>
        </div>

        {/* Profile Section */}
        <section className="flex flex-col gap-7 md:flex-row">

          {/* Profile Image */}
          <div className="flex justify-center md:w-56 md:justify-start">
            <div className="h-28 w-28 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[3px] md:h-36 md:w-36">
              <div className="h-full flex justify-center items-center text-center text-white font-bold w-full rounded-full bg-gray-700 p-1">
                comming soon...
                {/* <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                /> */}
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">

            {/* Username */}
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-normal capitalize">{user?.name}</h2>


              <div className="flex gap-6">
                <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold hover:bg-gray-200">
                  Edit Profile
                </button>

                <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold hover:bg-gray-200">
                  Share Profile
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 flex gap-8">
              <div>
                <span className="font-semibold">36</span>{" "}
                <span className="text-gray-600">posts</span>
              </div>

              <div>
                <span className="font-semibold">12.8K</span>{" "}
                <span className="text-gray-600">followers</span>
              </div>

              <div>
                <span className="font-semibold">421</span>{" "}
                <span className="text-gray-600">following</span>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-5">
              <h3 className="font-semibold capitalize">{user?.username}</h3>

              <p className="mt-1 text-sm leading-5">
                  Making ideas into innovation
                <br />
                React • Next.js • Node.js
                <br />
                Building scalable web applications 🚀
                <br />
                New Delhi, India
              </p>

              <a
                href="#"
                className="mt-2 block text-sm font-semibold text-blue-900"
              >
                hemantdeveloper.netlify.app
              </a>
            </div>
          </div>
        </section>

        {/* Mobile Stats */}
        <div className="mt-7 flex justify-around border-y py-4 md:hidden">
          <div className="text-center">
            <p className="font-semibold">36</p>
            <p className="text-xs text-gray-500">Posts</p>
          </div>

          <div className="text-center">
            <p className="font-semibold">12.8K</p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>

          <div className="text-center">
            <p className="font-semibold">421</p>
            <p className="text-xs text-gray-500">Following</p>
          </div>
        </div>
      </main>
    </div>
  );
}
