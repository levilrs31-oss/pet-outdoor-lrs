/* components/home/EmailSignup.tsx */
"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import SectionEntrance from "@/components/ui/SectionEntrance";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-28 px-6 bg-bg">
      <SectionEntrance>
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-serif text-4xl font-light text-text mb-3">
            Join the Pack
          </h2>
          <p className="font-sans text-sm text-text/60 mb-8 leading-relaxed">
            Trail updates, new drops, and dog pics. Weekly.
          </p>

          {submitted ? (
            <p className="font-sans text-sm text-brand font-medium tracking-wide">
              You're in. Watch your inbox. 🐾
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 h-11 px-4 bg-transparent border border-surface focus:border-brand rounded-sm font-sans text-sm text-text placeholder:text-text/40 outline-none transition-colors duration-[200ms]"
              />
              <Button type="submit" variant="solid">
                Join
              </Button>
            </form>
          )}
        </div>
      </SectionEntrance>
    </section>
  );
}
