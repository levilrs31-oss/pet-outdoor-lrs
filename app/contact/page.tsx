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
          <h1 className="font-serif text-5xl font-light text-text mb-4">联系我们</h1>
          <p className="font-sans text-sm text-text/60 leading-relaxed mb-12">
            我们会认真阅读每一封来信，通常在一个工作日内回复。
          </p>

          {submitted ? (
            <div className="bg-surface rounded-lg p-10 text-center">
              <p className="font-serif text-3xl font-light text-text mb-3">消息已收到。</p>
              <p className="font-sans text-sm text-text/60">
                我们会在一个工作日内回复至 <strong className="text-text">{form.email}</strong>。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-sans text-xs tracking-[0.1em] uppercase text-text/50 mb-2 block">
                    姓名
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="你的姓名"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="font-sans text-xs tracking-[0.1em] uppercase text-text/50 mb-2 block">
                    邮箱
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
                  主题
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">请选择话题…</option>
                  <option value="order">订单与配送</option>
                  <option value="returns">退货与换货</option>
                  <option value="sizing">尺码咨询</option>
                  <option value="ambassadors">品牌大使申请</option>
                  <option value="other">其他</option>
                </select>
              </div>

              <div>
                <label className="font-sans text-xs tracking-[0.1em] uppercase text-text/50 mb-2 block">
                  留言
                </label>
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="请告诉我们如何帮助你…"
                  rows={6}
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className="font-sans text-sm tracking-[0.1em] uppercase bg-brand text-white px-8 py-3 rounded-sm hover:bg-brand/90 transition-colors duration-200"
              >
                发送消息
              </button>
            </form>
          )}

          {/* 其他联系方式 */}
          <div className="mt-16 pt-12 border-t border-surface grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="font-sans text-xs tracking-[0.15em] uppercase text-text/40 mb-2">邮件</p>
              <p className="font-sans text-sm text-text">hello@wanderpaw.com</p>
            </div>
            <div>
              <p className="font-sans text-xs tracking-[0.15em] uppercase text-text/40 mb-2">工作时间</p>
              <p className="font-sans text-sm text-text">周一至周五，上午 9 点–下午 5 点（太平洋时间）</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}