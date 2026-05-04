"use client";

import { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "",
    message: "",
  });

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits.length ? `(${digits}` : "";
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormState((prev) => ({ ...prev, phone: formatPhone(value) }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Stubbed — wire up to backend later
    console.log("Form submitted:", formState);
  }

  return (
    <section id="contact" className="relative min-h-[100svh] pt-12">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-16 lg:grid-cols-[1fr_2fr] lg:gap-24 lg:px-10 lg:py-24">
        {/* Info column */}
        <div className="flex flex-col">
          <h1 className="font-display text-3xl font-light text-ink sm:text-5xl">
            Get in Touch
          </h1>

          <p className="mt-6 font-body text-sm leading-relaxed text-ink-soft sm:text-base">
            Every exceptional home begins with a conversation. Whether
            you&apos;re envisioning a new custom build or reimagining an
            existing space, we&apos;d love to hear about your project and
            explore how we can collaborate to bring your vision to life.
          </p>

          <div className="mt-8 border-t border-rule pt-8">
            <h2 className="mb-4 font-body text-xs uppercase tracking-[0.15em] text-ink-soft/60">
              Contact Info
            </h2>
            <ul className="flex flex-col gap-3 font-body text-sm text-ink-soft">
              <li>
                <a
                  href="mailto:hello@jbddesign.com"
                  className="transition-opacity hover:opacity-70"
                >
                  hello@jbddesign.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+18015550134"
                  className="transition-opacity hover:opacity-70"
                >
                  (801) 555-0134
                </a>
              </li>
              <li className="leading-snug">
                247 Main Street, Suite 200
                <br />
                Park City, UT 84060
              </li>
            </ul>
          </div>
        </div>

        {/* Form column */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="font-body text-xs uppercase tracking-[0.15em] text-ink/70"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formState.name}
                onChange={handleChange}
                placeholder="Your name"
                className={`rounded border px-4 py-3 font-body text-base text-white outline-none transition-colors placeholder:text-black focus:border-ink-soft/40 ${formState.name ? "border-ink-soft/30 bg-ink/[0.25]" : "border-ink-soft/15 bg-ink/[0.45]"}`}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="phone"
                className="font-body text-xs uppercase tracking-[0.15em] text-ink/70"
              >
                Phone <span className="normal-case tracking-normal text-ink-soft/40">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                maxLength={14}
                value={formState.phone}
                onChange={handleChange}
                placeholder="(000) 000-0000"
                className={`rounded border px-4 py-3 font-body text-base text-white outline-none transition-colors placeholder:text-black focus:border-ink-soft/40 ${formState.phone ? "border-ink-soft/30 bg-ink/[0.25]" : "border-ink-soft/15 bg-ink/[0.45]"}`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="font-body text-xs uppercase tracking-[0.15em] text-ink/70"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formState.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`rounded border px-4 py-3 font-body text-base text-white outline-none transition-colors placeholder:text-black focus:border-ink-soft/40 ${formState.email ? "border-ink-soft/30 bg-ink/[0.25]" : "border-ink-soft/15 bg-ink/[0.45]"}`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-body text-xs uppercase tracking-[0.15em] text-ink-soft/80">
              I am a&hellip;
            </span>
            <div className="flex gap-3">
              <label
                className={`cursor-pointer rounded border px-5 py-2.5 font-body text-sm tracking-wide transition-all ${
                  formState.userType === "homeowner"
                    ? "border-ink-soft/30 bg-ink/[0.25] text-white"
                    : "border-ink-soft/15 bg-ink/[0.45] text-black hover:border-ink-soft/25 hover:text-black/80"
                }`}
              >
                <input
                  type="radio"
                  name="userType"
                  value="homeowner"
                  checked={formState.userType === "homeowner"}
                  onChange={handleChange}
                  className="sr-only"
                />
                Homeowner
              </label>
              <label
                className={`cursor-pointer rounded border px-5 py-2.5 font-body text-sm tracking-wide transition-all ${
                  formState.userType === "developer"
                    ? "border-ink-soft/30 bg-ink/[0.25] text-white"
                    : "border-ink-soft/15 bg-ink/[0.45] text-black hover:border-ink-soft/25 hover:text-black/80"
                }`}
              >
                <input
                  type="radio"
                  name="userType"
                  value="developer"
                  checked={formState.userType === "developer"}
                  onChange={handleChange}
                  className="sr-only"
                />
                Developer
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="message"
              className="font-body text-xs uppercase tracking-[0.15em] text-ink/70"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              maxLength={2000}
              value={formState.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              className={`resize-none rounded border px-4 py-3 font-body text-base text-white outline-none transition-colors placeholder:text-black focus:border-ink-soft/40 ${formState.message ? "border-ink-soft/30 bg-ink/[0.25]" : "border-ink-soft/15 bg-ink/[0.45]"}`}
            />
          </div>

          <button
            type="submit"
            className="mt-4 self-start border border-ink-soft px-10 py-3 font-body text-sm uppercase tracking-[0.15em] text-ink transition-all duration-300 hover:bg-ink-soft hover:text-bg"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </section>
  );
}
