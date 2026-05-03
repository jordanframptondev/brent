"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const projectsHref = pathname === "/" ? "#projects" : "/#projects";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" aria-label="JB|D Home">
          <Image
            src="/logo-no-tagline/jbd-logo-no-tagline-menu-160w.png"
            alt="JB|D Custom Home Design"
            width={56}
            height={19}
            className="hidden sm:block"
            priority
          />
          <Image
            src="/logo-no-tagline/jbd-logo-no-tagline-menu-160w.png"
            alt="JB|D Custom Home Design"
            width={44}
            height={15}
            className="block sm:hidden"
            priority
          />
        </Link>

        <ul className="flex items-center gap-5 rounded-full bg-overlay-dim px-6 py-2.5 text-sm tracking-wide text-white/90 backdrop-blur-sm lg:gap-8 lg:px-8 lg:py-3 lg:text-base">
          <li>
            <Link
              href={projectsHref}
              className="transition-opacity duration-300 hover:opacity-60"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="transition-opacity duration-300 hover:opacity-60"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
