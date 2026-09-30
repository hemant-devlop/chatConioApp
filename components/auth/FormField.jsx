import { SvgEyeClose, SvgEyeOpen } from "../ui/icons/Svg";

export default function FormField({ label, type, name, placeholder, autoComplete, onchange, isPassword, handlePasswordVisible }) {

  return (
    <label className="block relative">
      <span className="text-sm font-medium text-charcoal">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onchange}
        onClick={e => e.stopPropagation()}
        required
        className="mt-1.5 w-full rounded-lg border border-silver bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/40 focus:border-slate focus:ring-2 focus:ring-slate/20"
      />

      <span onClick={handlePasswordVisible} className="absolute z-99 right-2 top-11 cursor-pointer hover:scale-110">
        {isPassword && type === 'password' ? <SvgEyeClose /> : isPassword && type === 'text' ? <SvgEyeOpen /> : ''}
      </span>

    </label>
  );
}