"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const projectsHref = pathname === "/" ? "#projects" : "/#projects";

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:flex-row lg:items-start lg:justify-between lg:px-10 lg:py-20">
        {/* Logo + tagline */}
        <div className="flex flex-col gap-4">
          <Link href="/">
            <Image
              src="/logo/jbd-logo-no-tagline-clean-menu-160w_light.png"
              alt="JB|D Custom Home Design"
              width={80}
              height={27}
              className="h-auto"
            />
          </Link>
        </div>

        {/* Links */}
        <div className="flex gap-16">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.15em] text-ink-soft/40">
              Navigate
            </span>
            <Link href="/" className="text-sm text-ink-soft transition-colors hover:text-ink">
              Home
            </Link>
            <Link href={projectsHref} className="text-sm text-ink-soft transition-colors hover:text-ink">
              Projects
            </Link>
            <Link href="/contact" className="text-sm text-ink-soft transition-colors hover:text-ink">
              Contact
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.15em] text-ink-soft/40">
              Connect
            </span>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-rule px-6 py-5 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="text-xs text-ink-soft/30">
            &copy; {new Date().getFullYear()} JB|D Custom Home Design
          </span>
          <span className="text-xs text-ink-soft/30">
            All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
