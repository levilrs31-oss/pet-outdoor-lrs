/* app/contact/page.tsx */
"use client";

import { useState } from "react";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClass =
    "w-full font-sans text-sm border border-surface rounded-sm px-4 py-3 bg-bg text-text placeholder:text-text/30 focus:border-brand focus:outline-none transition-colors duration-200";

  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        <div className="max-w-2xl mx-auto px-6 py-16">
          <h1 className="font-serif text-5xl font-light text-text mb-4">Contact Us</h1>
          <p className="font-sans text-sm text-text/60 leading-relaxed mb-12">
            We read every message and usually reply within one business day.
          </p>

          {submitted ? (
            <div className="bg-surface rounded-lg p-10 text-center">
              <p className="font-serif text-3xl font-light text-text mb-3">Message received.</p>
              <p className="font-sans text-sm text-text/60">
                We'll get back to you at <strong className="text-text">{form.email}</strong> within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-sans text-xs tracking-[0.1em] uppercase text-text/50 mb-2 block">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="font-sans text-xs tracking-[0.1em] uppercase text-text/50 mb-2 block">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="font-sans text-xs tracking-[0.1em] uppercase text-text/50 mb-2 block">
                  Subject
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select a topic…</option>
                  <option value="order">Order & Shipping</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="sizing">Sizing Help</option>
                  <option value="ambassadors">Ambassador Application</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="font-sans text-xs tracking-[0.1em] uppercase text-text/50 mb-2 block">
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help…"
                  rows={6}
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className="font-sans text-sm tracking-[0.1em] uppercase bg-brand text-white px-8 py-3 rounded-sm hover:bg-brand/90 transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          )}

          <div className="mt-16 pt-12 border-t border-surface grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="font-sans text-xs tracking-[0.15em] uppercase text-text/40 mb-2">Email</p>
              <p className="font-sans text-sm text-text">hello@wanderpaw.com</p>
            </div>
            <div>
              <p className="font-sans text-xs tracking-[0.15em] uppercase text-text/40 mb-2">Hours</p>
              <p className="font-sans text-sm text-text">Monday–Friday, 9am–5pm PT</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
