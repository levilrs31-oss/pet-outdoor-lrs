/* components/home/EmailSignup.tsx */
"use client";

import { useState } from "react";
import Image from "next/image";
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
    <section className="relative py-20 md:py-28 px-6 overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1659639237692-2442096a1f04?auto=format&fit=crop&w=1600&h=600&q=80"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      {/* Brand color overlay */}
      <div className="absolute inset-0 bg-brand/85" />

      {/* Content */}
      <div className="relative z-10">
        <SectionEntrance>
          <div className="max-w-lg mx-auto text-center">
            <h2 className="font-serif text-4xl font-light text-white mb-3">
              Join the Pack
            </h2>
            <p className="font-sans text-sm text-white/75 mb-8 leading-relaxed">
              Get 10% off your first order + weekly trail drops.
            </p>

            {submitted ? (
              <p className="font-sans text-sm text-white font-medium tracking-wide">
                You're in. Check your inbox for your discount. 🐾
              </p>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 h-11 px-4 bg-white/10 border border-white/30 focus:border-white rounded-sm font-sans text-sm text-white placeholder:text-white/40 outline-none transition-colors duration-[200ms]"
                  />
                  <Button
                    type="submit"
                    variant="solid"
                    className="bg-white text-brand hover:bg-white/90 hover:shadow-none"
                  >
                    Join
                  </Button>
                </form>
                <p className="font-sans text-xs text-white/50 mt-3">
                  No spam. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </SectionEntrance>
      </div>
    </section>
  );
}