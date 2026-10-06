const SIZES = {
  sm: "h-9 w-9 text-xs",
  md: "h-14 w-14 text-lg",
  lg: "h-24 w-24 text-3xl",
};

const STATUS_COLORS = {
  online: "bg-green-500",
  typing: "bg-slate",
  offline: "bg-silver",
};

const DOT_SIZES = {
  sm: "h-2.5 w-2.5 border-2",
  md: "h-3.5 w-3.5 border-2",
  lg: "h-5 w-5 border-[3px]",
};

export default function Avatar({ name, avatarUrl, size = "md", status,statusHide=true }) {
  const initials = name
    ? name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  const image = avatarUrl ? (
    <img
      src={avatarUrl}
      alt={name}
      className={`${SIZES[size]} rounded-full object-cover`}
    />
  ) : (
    <div
      className={`${SIZES[size]} font-display flex items-center justify-center rounded-full bg-slate font-semibold text-cream`}
    >
      {initials}
    </div>
  );

  if (!status) return image;

  return (
    <span className="relative inline-flex shrink-0">
      {image}
      {statusHide && <span
        className={`absolute bottom-0 right-0 rounded-full border-white bg-white ${DOT_SIZES[size]}`}
      >
        <span
          className={`block h-full w-full rounded-full ${status ?"bg-green-500": "bg-silver"} ${
            status ? "animate-pulse" : ""
          }`}
        />
      </span>}
    </span>
  );
}