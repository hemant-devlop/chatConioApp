"use client";

import { useRef } from "react";
import Avatar from "./Avatar";


export default function AvatarUploader({ name, avatarUrl, onChange }) {
  const inputRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange?.(file);
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar name={name} avatarUrl={avatarUrl} size="lg" />
      <div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-lg border border-silver px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:border-slate hover:text-slate"
        >
          Change photo
        </button>
        <p className="mt-2 text-xs text-charcoal/50">JPG or PNG. 1MB max.</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFile}
          className="hidden"
        />
      </div>
    </div>
  );
}