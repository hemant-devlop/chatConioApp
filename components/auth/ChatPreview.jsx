const thread = [
  { from: "them", text: "Hey — did the export finish?" },
  { from: "me", text: "Just landed, sending it over now." },
  { from: "them", text: "Perfect, that was fast." },
];

export default function ChatPreview({ eyebrow, headline, subhead }) {
  return (
    <div className="relative hidden lg:flex h-full w-1/2 flex-col justify-between overflow-hidden bg-charcoal px-12 py-14">
      <div>
        <span className="font-display text-sm uppercase tracking-[0.2em] text-slate">
          {eyebrow}
        </span>
        <h1 className="font-display mt-4 max-w-sm text-4xl font-semibold leading-tight text-cream">
          {headline}
        </h1>
        <p className="mt-4 max-w-xs text-sm text-silver">{subhead}</p>
      </div>

      <div className="flex max-w-sm flex-col gap-3">
        {thread.map((message, i) => (
          <div
            key={i}
            style={{ animationDelay: `${i * 0.25 + 0.2}s` }}
            className={`flex opacity-0 animate-bubble-in ${
              message.from === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                message.from === "me"
                  ? "rounded-br-sm bg-slate text-cream"
                  : "rounded-bl-sm bg-[#5c5c5c] text-cream"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        <div
          style={{ animationDelay: `${thread.length * 0.25 + 0.2}s` }}
          className="flex justify-start opacity-0 animate-bubble-in"
        >
          <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-[#5c5c5c] px-4 py-3">
            <span
              className="h-1.5 w-1.5 rounded-full bg-silver animate-typing-dot"
              style={{ animationDelay: "0s" }}
            />
            <span
              className="h-1.5 w-1.5 rounded-full bg-silver animate-typing-dot"
              style={{ animationDelay: "0.15s" }}
            />
            <span
              className="h-1.5 w-1.5 rounded-full bg-silver animate-typing-dot"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}