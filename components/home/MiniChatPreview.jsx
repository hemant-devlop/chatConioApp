export default function MiniChatPreview() {
  return (
    <div className="flex sm:hidden flex-col gap-2 rounded-2xl border border-silver/60 bg-white/70 p-3">
      <div className="flex justify-start">
        <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-silver/40 px-3 py-2 text-xs text-charcoal opacity-0 animate-bubble-in">
          Hey, are you around?
        </div>
      </div>
      <div className="flex justify-end">
        <div
          style={{ animationDelay: "0.35s" }}
          className="max-w-[80%] rounded-2xl rounded-br-sm bg-slate px-3 py-2 text-xs text-cream opacity-0 animate-bubble-in"
        >
          Just got here 👋
        </div>
      </div>
    </div>
  );
}