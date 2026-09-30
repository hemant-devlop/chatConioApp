// import Avatar from "@/components/ui/Avatar";

import Avatar from "../chat/Avatar";

export default function FloatingMessageCard({ name, text, status, delay = "0s", className = "" }) {
  return (
    <div
      style={{ animationDelay: delay }}
      className={`animate-float rounded-2xl border border-silver/60 bg-white/90 px-4 py-3 shadow-lg shadow-charcoal/5 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <Avatar name={name} size="sm" status={status} />
        <div className="min-w-0">
          <p className="text-xs font-medium text-charcoal">{name}</p>
          <p className="max-w-[150px] truncate text-xs text-charcoal/60">{text}</p>
        </div>
      </div>
    </div>
  );
}