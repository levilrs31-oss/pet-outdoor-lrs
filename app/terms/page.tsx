/* app/terms/page.tsx */

import Footer from "@/components/layout/Footer";

const sections = [
  {
    title: "条款接受",
    body: "访问或使用 Wanderpaw 网站（wanderpaw.com）即表示你同意受本使用条款约束。如不同意，请勿使用本站。我们保留随时更新条款的权利；更新后继续使用本站即视为接受。",
  },
  {
    title: "使用规范",
    body: "你只能将本站用于合法目的。禁止以下行为：违反适用法律、侵犯知识产权、传播有害或恶意内容、干扰本站或服务器的正常运营。",
  },
  {
    title: "商品与定价",
    body: "我们保留在不另行通知的情况下随时修改商品描述、定价和库存状态的权利。所有价格以美元计，可能随时变动。我们对商品描述或定价中的印刷错误概不负责。如发现定价错误，我们保留取消相关订单的权利。",
  },
  {
    title: "订单与支付",
    body: "下单即表示你声明有权使用所提供的支付方式。支付信息由 Stripe 安全处理。我们保留自行决定拒绝或取消任何订单的权利，包括在怀疑存在欺诈行为时。",
  },
  {
    title: "知识产权",
    body: "本站所有内容——包括文字、图片、Logo、产品设计及代码——均为 Wanderpaw 所有或经授权使用。未经我们明确书面许可，不得复制、分发或创作衍生作品。产品摄影及品牌素材受版权保护。",
  },
  {
    title: "责任限制",
    body: "对于因使用本站或我们的产品而产生的任何间接、附带或后果性损害，Wanderpaw 概不负责。我们对任何索赔的总责任以你为该商品支付的金额为限。部分司法管辖区不允许限制责任，上述限制可能对你不适用。",
  },
  {
    title: "适用法律",
    body: "本条款受美国俄勒冈州法律管辖，不考虑法律冲突原则。任何争议须在俄勒冈州马尔特诺马县的州或联邦法院解决。",
  },
  {
    title: "联系我们",
    body: "关于本条款的问题，请发邮件至 legal@wanderpaw.com，或邮寄至：Wanderpaw, 1234 NW Everett St, Portland, OR 97209, USA。",
  },
];

export default function TermsPage() {
  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="font-serif text-5xl font-light text-text mb-3">使用条款</h1>
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