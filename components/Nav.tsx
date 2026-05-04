"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const contactHref = pathname === "/" ? "#contact" : "/#contact";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" aria-label="JB|D Home">
          <Image
            src="/logo/jbd-logo-no-tagline-clean-menu-160w_light.png"
            alt="JB|D Custom Home Design"
            width={76}
            height={25}
            className="hidden h-auto sm:block min-w-15"
            priority
          />
          <Image
            src="/logo/jbd-logo-no-tagline-clean-menu-160w_light.png"
            alt="JB|D Custom Home Design"
            width={60}
            height={20}
            className="block h-auto sm:hidden min-w-15"
            priority
          />
        </Link>

        <ul className="flex items-center gap-5 px-6 py-2.5 text-sm tracking-wide text-white lg:gap-8 lg:px-8 lg:py-3 lg:text-base">
          <li>
            <Link
              href={contactHref}
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  const el = document.getElementById("contact");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                  window.history.replaceState(null, "", "#contact");
                }
              }}
              className="transition-opacity duration-300 hover:opacity-60"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className="transition-opacity duration-300 hover:opacity-60"
            >
              Projects
            </Link>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center transition-opacity duration-300 hover:opacity-60"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
