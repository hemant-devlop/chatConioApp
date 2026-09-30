"use client";

import { useEffect, useState } from "react";
// import TextField from "@/components/ui/TextField";
// import SelectField from "@/components/ui/SelectField";
// import AvatarUploader from "@/components/settings/AvatarUploader";
import { getProfile } from "@/lib/http";
import AvatarUploader from "./AvatarUploader";
import TextField from "./TextField";
import SelectField from "./SelectedField";

// TODO: replace with the signed-in user's id from your auth/session layer
const CURRENT_USER_ID = "me";

const TABS = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
];

const GENDER_OPTIONS = [
  { value: "", label: "Prefer not to say" },
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "non-binary", label: "Non-binary" },
  { value: "other", label: "Other" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [profileForm, setProfileForm] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    dob: "",
    gender: "",
    avatarUrl: null,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    let active = true;
    getProfile(CURRENT_USER_ID).then((data) => {
      if (!active) return;
      setProfileForm({
        name: data.name ?? "",
        username: data.username ?? "",
        email: data.email ?? "",
        bio: data.bio ?? "",
        dob: data.dob ?? "",
        gender: data.gender ?? "",
        avatarUrl: data.avatarUrl ?? null,
      });
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  function handleProfileChange(e) {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  }

  async function handleProfileSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await updateProfile(CURRENT_USER_ID, profileForm);
      setSaved(true);
    } catch (err) {
      setError("Couldn't save your changes. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handlePasswordChange(e) {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    setPasswordError("");
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New password and confirmation don't match.");
      return;
    }

    setSaving(true);
    setPasswordError("");
    try {
      await changePassword(CURRENT_USER_ID, passwordForm);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setSaved(true);
    } catch (err) {
      setPasswordError("Couldn't update your password. Check your current password and try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-sm text-charcoal/60">Loading settings…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-6 py-16">
      <div className="mx-auto flex max-w-3xl gap-10">
        <nav className="w-40 shrink-0">
          <h1 className="font-display text-lg font-semibold text-charcoal">Settings</h1>
          <ul className="mt-6 space-y-1">
            {TABS.map((tab) => (
              <li key={tab.id}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSaved(false);
                  }}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-charcoal text-cream"
                      : "text-charcoal/70 hover:bg-silver/40"
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex-1 rounded-2xl border border-silver bg-white p-8">
          {activeTab === "profile" && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div>
                <h2 className="font-display text-lg font-semibold text-charcoal">Profile</h2>
                <p className="mt-1 text-sm text-charcoal/60">
                  This is how others see you on Thread.
                </p>
              </div>

              <AvatarUploader
                name={profileForm.name}
                avatarUrl={profileForm.avatarUrl}
                onChange={(file) =>
                  setProfileForm((prev) => ({
                    ...prev,
                    avatarUrl: URL.createObjectURL(file),
                  }))
                }
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                  label="Full name"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  required
                />
                <TextField
                  label="Username"
                  name="username"
                  value={profileForm.username}
                  onChange={handleProfileChange}
                  required
                />
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  required
                />
                <TextField
                  label="Date of birth"
                  type="date"
                  name="dob"
                  value={profileForm.dob}
                  onChange={handleProfileChange}
                />
                <SelectField
                  label="Gender"
                  name="gender"
                  value={profileForm.gender}
                  onChange={handleProfileChange}
                  options={GENDER_OPTIONS}
                />
              </div>

              <label className="block">
                <span className="text-sm font-medium text-charcoal">Bio</span>
                <textarea
                  name="bio"
                  rows={3}
                  value={profileForm.bio}
                  onChange={handleProfileChange}
                  placeholder="Tell people a little about yourself"
                  className="mt-1.5 w-full resize-none rounded-lg border border-silver bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/40 focus:border-slate focus:ring-2 focus:ring-slate/20"
                />
              </label>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-charcoal px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-charcoal/90 disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save changes"}
                </button>
                {saved && <span className="text-sm text-slate">Saved</span>}
              </div>
            </form>
          )}

          {activeTab === "security" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <h2 className="font-display text-lg font-semibold text-charcoal">Security</h2>
                <p className="mt-1 text-sm text-charcoal/60">Update your password.</p>
              </div>

              <div className="space-y-4">
                <TextField
                  label="Current password"
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                  required
                />
                <TextField
                  label="New password"
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  autoComplete="new-password"
                  required
                />
                <TextField
                  label="Confirm new password"
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  autoComplete="new-password"
                  required
                />
              </div>

              {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-charcoal px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-charcoal/90 disabled:opacity-60"
                >
                  {saving ? "Updating…" : "Update password"}
                </button>
                {saved && <span className="text-sm text-slate">Updated</span>}
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}