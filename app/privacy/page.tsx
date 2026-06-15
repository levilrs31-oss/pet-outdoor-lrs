/* app/privacy/page.tsx */

import Footer from "@/components/layout/Footer";

const sections = [
  {
    title: "我们收集的信息",
    body: "我们收集你直接提供的信息——例如下单时填写的姓名、邮箱、收货地址和支付信息。我们也自动收集使用数据，包括 IP 地址、浏览器类型、访问页面和停留时长，用于了解用户如何使用 Wanderpaw 并持续改进体验。",
  },
  {
    title: "信息的使用方式",
    body: "我们使用你的信息来完成订单、发送订单及配送确认、回复客服咨询，以及在你已订阅的情况下发送营销邮件。我们绝不向第三方出售你的个人信息。我们仅与运营所需的服务商（支付处理商、快递公司、邮件平台）共享数据。",
  },
  {
    title: "Cookie",
    body: "我们使用 Cookie 来保持购物车状态、记住你的偏好，并通过分析工具了解站点流量。你可以在浏览器设置中禁用 Cookie，但部分功能可能因此无法正常使用。我们使用注重隐私的分析服务（Plausible Analytics），不进行跨站追踪。",
  },
  {
    title: "你的权利",
    body: "你有权随时访问、更正或删除你的个人数据。如需数据副本或申请删除，请发邮件至 privacy@wanderpaw.com，我们将在 30 天内回复。如果你位于欧盟或加利福尼亚州，可能享有 GDPR 或 CCPA 下的额外权利。",
  },
  {
    title: "数据保留",
    body: "出于会计和法律目的，我们保留订单数据 7 年。营销偏好数据保留至你退订为止。分析数据保留 24 个月。对于无需满足法律合规要求的数据，你可申请删除。",
  },
  {
    title: "安全",
    body: "我们在所有页面使用 HTTPS 加密，支付信息通过 Stripe 处理——我们从不存储原始卡号。我们定期进行安全审查，并将个人数据访问权限限制在工作需要的员工范围内。",
  },
  {
    title: "政策变更",
    body: "我们可能不时更新本政策。更新时，我们会修改下方的「最后更新」日期，并就重大变更通过邮件提前告知。继续使用本站即表示你接受更新后的政策。",
  },
  {
    title: "联系我们",
    body: "隐私相关问题请发邮件至 privacy@wanderpaw.com，或邮寄至：Wanderpaw, 1234 NW Everett St, Portland, OR 97209, USA。",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="font-serif text-5xl font-light text-text mb-3">隐私政策</h1>
          <p className="font-sans text-xs text-text/40 mb-14">最后更新：2026年6月15日</p>

          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-serif text-2xl font-light text-text mb-3">{s.title}</h2>
                <p className="font-sans text-sm text-text/70 leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}