import ConversationList from "@/components/chat/ConversationList";

export default function ChatLayout({ children }) {
    
  return (
    <div className="flex w-full overflow-hidden bg-cream">
      <ConversationList />
      <>{children}</>
    </div>
  );
}