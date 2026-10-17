"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, locales, swapLocale, type Locale } from "@/i18n/config";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function LanguageSwitcher({
  lang,
  label,
  names,
}: {
  lang: Locale;
  label: string;
  names: Record<Locale, string>;
}) {
  const pathname = usePathname();

  return (
    <div role="group" aria-label={label} className="flex shrink-0 items-center gap-1 font-mono text-xs">
      {locales.map((code, i) => (
        <span key={code} className="flex items-center gap-1">
          {i > 0 && (
            <span aria-hidden="true" className="text-muted">
              /
            </span>
          )}
          <Link
            href={swapLocale(pathname, code)}
            hrefLang={code}
            lang={code}
            title={names[code]}
            aria-label={names[code]}
            aria-current={code === lang ? "true" : undefined}
            onClick={() => {
              document.cookie = `${LOCALE_COOKIE}=${code}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
            }}
            className={
              code === lang
                ? "font-semibold text-accent"
                : "text-muted transition-colors hover:text-foreground"
            }
          >
            {code.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
