"use client";

import { useState } from "react";
import Link from "next/link";
import ChatPreview from "@/components/auth/ChatPreview";
import AuthCard from "@/components/auth/AuthCard";
import FormField from "@/components/auth/FormField";
import { login } from "@/lib/http";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [errors, setErrors] = useState(null);
  const {setAccessToken,setUser,setAuthStatus}=useAuth()
  const router=useRouter()

  const [formData, setFromData] = useState({
    email: "",
    password: ""
  })

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFromData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setIsPassVisible(false)
    try {
      const response = await login(formData?.email, formData?.password)
  
      if(!response?.success){
        setErrors(response?.message)
      }
      if(response?.success){
        setAccessToken(response?.data?.accessToken);
        setUser(response?.data?.user)
        setAuthStatus("authenticated")
        router.replace('/home')
      }
    } catch (error) {
      console.error('login error',error)
      throw new Error(error)
    } finally {
      setIsSubmitting(false)
    }

  }
  const handlePasswordVisible = () => {
    setIsPassVisible(prev => !prev);
  }
  return (
    <main className="flex h-full min-h-screen w-full ">
      <ChatPreview
        eyebrow="Thread"
        headline="Pick up where the conversation left off."
        subhead="Sign in to see new messages, replies, and everything you missed."
      />
      <AuthCard
        title="Sign in"
        subtitle="Welcome back — enter your details to continue."
        footerText="New to Thread?"
        footerLinkText="Create an account"
        footerHref="/signup"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Email"
            type="email"
            name="email"
            onchange={handleForm}
            placeholder="you@example.com"
            autoComplete="email"
          />
          <FormField
            label="Password"
            type={isPassVisible ? "text" : "password"}
            onchange={handleForm}
            name="password"
            placeholder="••••••••"
            isPassword={formData.password.length>0}
            autoComplete="current-password"
            handlePasswordVisible={handlePasswordVisible}
          />
           {errors && <div className="font-medium text-red-700">{errors}</div>}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-charcoal/70">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-silver text-slate focus:ring-slate/30"
              />
              Stay signed in
            </label>
            <Link
              href="/forgot-password"
              className="text-slate transition-colors hover:text-charcoal"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-charcoal py-2.5 text-sm font-medium text-cream transition-colors hover:bg-charcoal/90 disabled:opacity-60"
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </AuthCard>
    </main>
  );
}