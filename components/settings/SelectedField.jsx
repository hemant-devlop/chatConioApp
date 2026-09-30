export default function SelectField({ label, name, value, onChange, options }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-charcoal">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1.5 w-full rounded-lg border border-silver bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-slate focus:ring-2 focus:ring-slate/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}