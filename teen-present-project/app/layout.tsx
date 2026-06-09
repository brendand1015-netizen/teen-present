import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teen Present",
  description:
    "A calm online photography exhibition about presence and teen well-being."
};

const navItems = [
  { href: "/exhibition", label: "Exhibition" },
  { href: "/share", label: "Share" },
  { href: "/portledge", label: "Portledge" },
  { href: "/about", label: "About" }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <header className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-7 text-sm text-ink/70 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <Link
            href="/"
            className="font-serif text-2xl tracking-wide text-ink focus-ring"
          >
            Teen Present
          </Link>
          <nav
            aria-label="Main navigation"
            className="flex flex-wrap justify-center gap-x-6 gap-y-3 sm:justify-end"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="quiet-link underline decoration-transparent transition hover:decoration-ink/40 focus-ring"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main>{children}</main>
        <footer className="mx-auto max-w-6xl px-6 pb-10 pt-20 text-sm text-ink/45 md:px-10">
          <p>Move slowly. Notice what is here.</p>
        </footer>
      </body>
    </html>
  );
}
