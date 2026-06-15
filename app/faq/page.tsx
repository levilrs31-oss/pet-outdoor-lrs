/* app/faq/page.tsx */
"use client";

import { useState } from "react";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

const faqs = [
  {
    q: "如何确认我的狗狗适合哪个靴子尺码？",
    a: "将狗狗的爪子放在纸上，轻轻向下按压使其展平（模拟承重状态），描出轮廓。量取最宽处为爪宽，最长处为爪长，取较大值对照尺码表。拿不准时选大一码——稍大的靴子比过紧的更不容易甩落。",
  },
  {
    q: "狗狗总是甩掉靴子，是我操作有误吗？",
    a: "最常见的原因是尺码偏大。请重新测量并对照尺码表。同时检查旋转扣是否收紧到位——应该贴合而不夹紧。许多狗狗还需要每天 5–10 分钟的适应期，再逐步过渡到完整散步。",
  },
  {
    q: "胸背带适合爱拉扯的狗狗吗？",
    a: "适合。Trail Harness 配备前后两个挂绳点。前扣可将拉力方向引向你，是训练松绳行走最有效的方式；后扣适合已经走得很好的狗狗。如果你的狗狗爱拉扯，建议从前扣开始。",
  },
  {
    q: "皮质牵引绳如何清洁和保养？",
    a: "泥泞散步后用湿布擦拭，在远离直射热源的地方自然晾干。每 2–3 个月（或高强度使用后），薄涂一层皮革护理膏——推荐 Leather Honey 或 Otter Wax。避免将牵引绳完全浸入水中，以免皮革干裂、五金件变硬。",
  },
  {
    q: "你们的退货政策是什么？",
    a: "购买后 30 天内免费退货，无需说明理由。商品须未穿用并保留原包装。发起退货请发邮件至 returns@wanderpaw.com，附上订单号，我们将在一个工作日内发送预付运费退货标签。",
  },
  {
    q: "配送需要多长时间？",
    a: "标准配送 5–7 个工作日；加急配送 2–3 个工作日；次日达也可在结账时选择。工作日下午 2 点（太平洋时间）前提交的订单当天发出。订单满 $75 享免费标准配送。",
  },
  {
    q: "你们支持国际配送吗？",
    a: "目前配送至美国、加拿大和英国。国际订单可能涉及关税，由收件人承担。国际配送时效因目的地而异，通常为 7–14 个工作日。",
  },
  {
    q: "可以修改或取消订单吗？",
    a: "我们处理订单速度很快，修改需在下单后 1 小时内提出。请立即发邮件至 hello@wanderpaw.com，附上订单号和需要的变更内容。订单发出后无法修改，但你可以在收货后发起退货。",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="font-serif text-5xl font-light text-text mb-4">常见问题</h1>
          <p className="font-sans text-sm text-text/60 leading-relaxed mb-14">
            常见疑问，诚实解答。
          </p>

          <div className="divide-y divide-surface">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left py-5 flex justify-between items-start gap-6 group"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-sans text-sm font-medium text-text group-hover:text-brand transition-colors duration-200">
                    {faq.q}
                  </span>
                  <span
                    className={`font-sans text-lg text-text/30 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openIndex === i && (
                  <div className="pb-5">
                    <p className="font-sans text-sm text-text/60 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-surface text-center">
            <p className="font-sans text-sm text-text/60 mb-6">
              没有找到答案？
            </p>
            <Button variant="outline" href="/contact">联系我们</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}