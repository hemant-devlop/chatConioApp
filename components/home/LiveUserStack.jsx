import Avatar from "../chat/Avatar";


// TODO: wire up to a real "active users" endpoint — this is illustrative mock data
const USERS = [
  { id: "1", name: "Ava Thompson" },
  { id: "2", name: "Marcus Webb" },
  { id: "3", name: "Priya Nair" },
  { id: "4", name: "Leo Fischer" },
  { id: "5", name: "Sofia Reyes" },
];

// tone="light" for use on the cream background, "dark" for use on charcoal panels
export default function LiveUserStack({ tone = "light" }) {
  const isDark = tone === "dark";

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div className="flex -space-x-3">
        {USERS.map((user) => (
          <span
            key={user.id}
            className={`rounded-full ring-2 ${isDark ? "ring-charcoal" : "ring-cream"}`}
          >
            <Avatar name={user.name} size="sm" />
          </span>
        ))}
      </div>

      <div className={`flex items-center gap-1.5 text-sm ${isDark ? "text-silver" : "text-charcoal/60"}`}>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
        </span>
        <span>
          <strong className={`font-semibold ${isDark ? "text-cream" : "text-charcoal"}`}>
            1,204
          </strong>{" "}
          people chatting now
        </span>
      </div>
    </div>
  );
}