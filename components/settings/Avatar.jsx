const SIZES = {
  sm: "h-9 w-9 text-xs",
  md: "h-14 w-14 text-lg",
  lg: "h-24 w-24 text-3xl",
};

export default function Avatar({ name, avatarUrl, size = "md" }) {
  const initials = name
    ? name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className={`${SIZES[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`${SIZES[size]} font-display flex items-center justify-center rounded-full bg-slate font-semibold text-cream`}
    >
      {initials}
    </div>
  );
}