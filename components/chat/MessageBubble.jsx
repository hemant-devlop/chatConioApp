function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export default function MessageBubble({ message, isOwn }) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[70%] flex-col gap-1 ${isOwn ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm ${
            isOwn
              ? "rounded-br-sm bg-charcoal text-cream"
              : "rounded-bl-sm bg-silver/40 text-charcoal"
          }`}
        >
          {message.content}
        </div>
        <span className="px-1 text-[11px] text-charcoal/40">
          {formatTime(message.createdAt)}
          {isOwn && message.status ? ` · ${message.status}` : ""}
        </span>
      </div>
    </div>
  );
}