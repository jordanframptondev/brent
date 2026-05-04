"use client";

import Image from "next/image";
import { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Stubbed — wire up to backend later
    console.log("Form submitted:", formState);
  }

  return (
    <section className="relative min-h-[100svh] pt-24">
      {/* Background texture */}
      <Image
        src="/textures/bg/image3_alt_black_white_transparent.png"
        alt=""
        fill
        className="pointer-events-none object-cover opacity-[0.15]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-6 py-16 lg:grid-cols-[1fr_2fr] lg:gap-24 lg:px-10 lg:py-24">
        {/* About column */}
        <div className="flex flex-col">
          <h1 className="font-display text-3xl font-light text-ink sm:text-5xl">
            Get in Touch
          </h1>

          <p className="mt-6 font-body text-sm leading-relaxed text-ink-soft sm:text-base">
            JB|D Custom Home Design creates residences that belong to their
            landscape. Every project begins with a conversation about how you
            live, what the land offers, and where the two can meet.
          </p>

          <div className="mt-8 border-t border-rule pt-8">
            <h2 className="mb-4 font-body text-xs uppercase tracking-[0.15em] text-ink-soft/60">
              Credentials
            </h2>
            <ul className="flex flex-col gap-2 font-body text-sm text-ink-soft">
              <li>AIA Utah — Residential Design Award, 2023</li>
              <li>NAHB Certified Green Professional</li>
              <li>20+ years custom residential experience</li>
            </ul>
          </div>
        </div>

        {/* Form column */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="font-body text-xs uppercase tracking-[0.15em] text-ink-soft/60"
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
              className="border-b border-rule bg-transparent py-3 font-body text-base text-ink outline-none transition-colors focus:border-ink"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="font-body text-xs uppercase tracking-[0.15em] text-ink-soft/60"
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
              className="border-b border-rule bg-transparent py-3 font-body text-base text-ink outline-none transition-colors focus:border-ink"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="projectType"
              className="font-body text-xs uppercase tracking-[0.15em] text-ink-soft/60"
            >
              Project Type
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              value={formState.projectType}
              onChange={handleChange}
              className="border-b border-rule bg-transparent py-3 font-body text-base text-ink outline-none transition-colors focus:border-ink"
            >
              <option value="" disabled>
                Select a project type
              </option>
              <option value="new-build">New Custom Home</option>
              <option value="renovation">Major Renovation</option>
              <option value="addition">Addition</option>
              <option value="consultation">Design Consultation</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="message"
              className="font-body text-xs uppercase tracking-[0.15em] text-ink-soft/60"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formState.message}
              onChange={handleChange}
              className="resize-none border-b border-rule bg-transparent py-3 font-body text-base text-ink outline-none transition-colors focus:border-ink"
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
