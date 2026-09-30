import Link from "next/link";

export default function AuthCard({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerHref,
}) {
  return (
    <div className="flex w-full items-center justify-center px-6 py-16 sm:px-10 lg:w-1/2">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-charcoal"
        >
          thread<span className="text-slate">.</span>
        </Link>

        <h2 className="font-display mt-10 text-2xl font-semibold text-charcoal">
          {title}
        </h2>
        <p className="mt-2 text-sm text-charcoal/60">{subtitle}</p>

        <div className="mt-8">{children}</div>

        <p className="mt-8 text-sm text-charcoal/60">
          {footerText}{" "}
          <Link
            href={footerHref}
            className="font-medium text-slate transition-colors hover:text-charcoal"
          >
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
}