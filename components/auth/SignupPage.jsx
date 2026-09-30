"use client";

import { useState } from "react";
import ChatPreview from "@/components/auth/ChatPreview";
import AuthCard from "@/components/auth/AuthCard";
import FormField from "@/components/auth/FormField";
import { register } from "@/lib/http";

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });


  function handlePasswordVisible() {
    setIsPassVisible(prev => !prev)
  }

  function handleForm(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const response = await register({ ...formData, username: formData.email });
    if (response?.success) {
      console.log(response?.data)
      setSuccessMessage("User successFully created");
      setFormData({
        name: '',
        email: '',
        password: ''
      })
    } else {
      setError(response?.message)
      console.log(response)
    }
    setIsSubmitting(false)
  }

  return (
    <main className="flex h-full w-full">
      <ChatPreview
        eyebrow="Thread"
        headline="Start a conversation worth continuing."
        subhead="Create your account and jump into your first thread in seconds."
      />

      <AuthCard
        title="Create your account"
        subtitle="It takes less than a minute."
        footerText="Already have an account?"
        footerLinkText="Sign in"
        footerHref="/login"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Full name"
            type="text"
            name="name"
            onchange={handleForm}
            placeholder="Hemant kumar"
            autoComplete="name"
          />
          <FormField
            label="Email"
            type="email"
            name="email"
            onchange={handleForm}
            placeholder="mail@example.com"
            autoComplete="email"
          />
          <FormField
            label="Password"
            type={isPassVisible ? "text" : "password"}
            name="password"
            onchange={handleForm}
            placeholder="••••••••"
            isPassword={formData.password.length > 0}
            handlePasswordVisible={handlePasswordVisible}
            autoComplete="new-password"
          />

          <label className="flex items-start gap-2 text-sm text-charcoal/70">
            <input
              type="checkbox"
              required
              className="mt-0.5 h-4 w-4 rounded border-silver text-slate focus:ring-slate/30"
            />
            <span>
              I agree to the{" "}
              <a href="/terms" className="text-slate transition-colors hover:text-charcoal">
                Terms
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-slate transition-colors hover:text-charcoal">
                Privacy Policy
              </a>
              .
            </span>
          </label>
          {error && <div className="font-medium text-red-700">{error}</div>}
          {successMessage && <div className="font-medium text-green-700">{successMessage}</div>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-charcoal py-2.5 text-sm font-medium text-cream transition-colors hover:bg-charcoal/90 disabled:opacity-60"
          >
            {isSubmitting ? "Creating account…" : "Create account"}
          </button>
        </form>
      </AuthCard>
    </main>
  );
}