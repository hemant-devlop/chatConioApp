export default function TextField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
  required,
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-charcoal">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={`mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/40 focus:ring-2 ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-100"
            : "border-silver focus:border-slate focus:ring-slate/20"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}