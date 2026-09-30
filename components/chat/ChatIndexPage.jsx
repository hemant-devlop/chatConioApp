import { ChatBubbleIcon } from "@/components/chat/icons";

export default function ChatIndexPage() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-silver/30 text-charcoal/50">
        <ChatBubbleIcon className="h-7 w-7" />
      </div>
      <h2 className="font-display mt-4 text-lg font-semibold text-charcoal">
        Select a conversation
      </h2>
      <p className="mt-1 max-w-xs text-sm text-charcoal/60">
        Choose someone from the list to see your message history, or start a new thread.
      </p>
    </div>
  );
}