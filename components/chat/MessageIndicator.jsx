export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-silver/40 px-4 py-3">
        <span
          className="h-1.5 w-1.5 animate-typing-dot rounded-full bg-charcoal/40"
          style={{ animationDelay: "0s" }}
        />
        <span
          className="h-1.5 w-1.5 animate-typing-dot rounded-full bg-charcoal/40"
          style={{ animationDelay: "0.15s" }}
        />
        <span
          className="h-1.5 w-1.5 animate-typing-dot rounded-full bg-charcoal/40"
          style={{ animationDelay: "0.3s" }}
        />
      </div>
    </div>
  );
}