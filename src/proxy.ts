import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasLocale, LOCALE_COOKIE, negotiateLocale } from "@/i18n/config";

// Semua halaman berada di bawah /{lang}. Permintaan tanpa prefix bahasa diarahkan ke
// bahasa pilihan pengunjung (cookie), lalu bahasa browser (Accept-Language), lalu default.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (hasLocale(first)) return;

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = hasLocale(saved) ? saved : negotiateLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Lewati aset internal Next.js dan berkas di public/ (yang memiliki ekstensi).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
