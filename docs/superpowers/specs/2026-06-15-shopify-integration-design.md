# Shopify 全栈集成设计

**日期：** 2026-06-15  
**项目：** pet-outdoor-test（Wanderpaw 品牌电商前台）  
**方案：** Shopify Storefront API（GraphQL）无头商店模式

---

## 背景与目标

当前项目为 Next.js 16 电商前台，产品数据全部硬编码在 `lib/data.ts`。目标是将其对接到已有 Shopify 店铺，实现：

- 产品与集合数据从 Shopify 实时拉取
- 购物车通过 Shopify Cart API 管理，结账跳转 Shopify 原生 Checkout
- 客户账户使用 Shopify Customer Accounts API（新版 OAuth 2.0）
- Webhooks 接入点用于接收订单事件

不在本次范围内：评价系统对接（Reviews 保持硬编码）、邮件/库存等 Webhook 下游业务逻辑。

---

## 技术选型

| 功能 | 技术 |
|---|---|
| 产品/集合/购物车 | Shopify Storefront API（GraphQL） |
| 客户账户 | Shopify Customer Accounts API（OAuth 2.0） |
| Checkout | 跳转 Shopify 原生 Checkout URL |
| Webhooks | Next.js Route Handler + HMAC 验证 |
| 客户端状态 | React Context（CartContext） |
| Token 存储 | httpOnly Cookie（服务端读取） |

---

## 架构

### 目录结构变更

```
lib/
  shopify/
    client.ts            ← createStorefrontApiClient 实例
    types.ts             ← Shopify 响应类型 → 应用内部类型映射
    queries/
      products.ts        ← 产品/集合 GraphQL 查询
      cart.ts            ← Cart mutations（create/add/update/remove）
      customer.ts        ← 客户账户查询（订单历史、个人信息）
  data.ts                ← 废弃（Reviews 数据暂时保留）

context/
  CartContext.tsx         ← 全局购物车状态（Client Component）

components/
  cart/
    CartDrawer.tsx        ← 购物车侧滑抽屉
    CartLineItem.tsx      ← 单条购物车项
  ui/
    AddToCartButton.tsx   ← 替换 PurchasePanel 中的加购逻辑

app/
  account/
    page.tsx             ← 客户账户页（订单历史、个人信息）
  auth/
    callback/
      route.ts           ← OAuth 回调，code 换 access token
  api/
    webhooks/
      route.ts           ← Shopify Webhook 接收端点
```

### 数据流

```
Server Components（产品页、商城页）
  └─ await shopify.products() / shopify.collection()
       └─ Storefront API GraphQL → 返回产品数据

Client Components（购物车操作）
  └─ CartContext.addItem(variantId)
       └─ cartCreate / cartLinesAdd mutation
            └─ 更新 CartContext 状态 → UI 响应

结账
  └─ cart.checkoutUrl → window.location.href 跳转

客户账户
  └─ 点击登录 → 重定向 Shopify Customer Accounts 登录页
       └─ OAuth 回调 → /auth/callback → set httpOnly Cookie
            └─ /account 页读取 Cookie → 查询订单历史
```

---

## Section 1：环境变量

```env
# Storefront API
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=

# Customer Accounts API（OAuth 2.0）
SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID=
SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_SECRET=

# Webhooks
SHOPIFY_WEBHOOK_SECRET=

# 前端可用
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
```

---

## Section 2：产品与集合数据

### 字段映射

| 应用字段 | Shopify 字段 |
|---|---|
| `id` | `product.id` |
| `slug` | `product.handle` |
| `name` | `product.title` |
| `subtitle` | `product.metafields["subtitle"]` |
| `price` | `variants.priceRange.minVariantPrice.amount` |
| `priceMax` | `variants.priceRange.maxVariantPrice.amount` |
| `image` | `product.featuredImage.url` |
| `hoverImage` | `product.images.edges[1].node.url`（第二张图，无则 fallback 到 featuredImage） |
| `images[]` | `product.images.edges[].node.url` |
| `colors` | `product.options` where `name === "Color"` |
| `sizes` | `product.options` where `name === "Size"` |
| `badge` | `product.tags`（"new" → "New"，"best-seller" → "Best Seller"） |
| `category` | `product.productType` |
| `description` | `product.description` |
| `features` | `product.metafields["features"]`（JSON list metafield） |

### Metafields 配置（需在 Shopify Admin 设置）

- Namespace: `custom`
- `custom.subtitle`：single_line_text_field
- `custom.features`：json（字符串数组）

### Reviews

保持 `lib/data.ts` 中的硬编码评价数据，通过 `productId` 关联。后续可独立对接 Judge.me 等第三方 App。

### 集合替代分类

`CategoryTabs` 和 `FilterSidebar` 改为通过 Shopify Collection handle 过滤。Collection handle 需与现有 category slug 保持一致（boots / harnesses / leashes / owner）。

---

## Section 3：购物车

### CartContext 接口

```ts
interface CartContextValue {
  cart: ShopifyCart | null
  totalQuantity: number
  isOpen: boolean
  addItem: (variantId: string, quantity: number) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  openCart: () => void
  closeCart: () => void
}
```

### 持久化

- `cartId` 存入 `localStorage`（key: `shopify_cart_id`）
- 页面刷新时从 localStorage 恢复并调用 `cartFetch` 同步最新状态

### Cart mutations 列表

| 操作 | Mutation |
|---|---|
| 创建购物车 | `cartCreate` |
| 添加商品 | `cartLinesAdd` |
| 更新数量 | `cartLinesUpdate` |
| 移除商品 | `cartLinesRemove` |
| 获取购物车 | `cart` query（by id） |

### UI 组件

- **CartDrawer**：右侧滑入，显示所有 line items、总价、"前往结账"按钮
- **AddToCartButton**：集成在 `PurchasePanel`，选择颜色/尺码后激活
- **Navbar**：购物车图标 + `totalQuantity` 角标（红点）

### 结账

```ts
window.location.href = cart.checkoutUrl
```

---

## Section 4：客户账户

### 登录流程

1. 用户点击 Navbar "账户"图标
2. 重定向至：`https://{store}.myshopify.com/account/login?...`（附带 `client_id`、`redirect_uri`、`scope`、`state`、`nonce`）
3. 用户完成登录
4. Shopify 回调 `/auth/callback?code=...&state=...`
5. Route Handler 用 `code` 换取 `access_token` + `refresh_token`
6. Token 写入 `httpOnly` Cookie（`shopify_customer_token`），有效期跟随 `expires_in`
7. 重定向至 `/account`

### 账户页（`/account`）

- 服务端读取 Cookie 中的 access token
- 调用 Customer Accounts API 查询：客户姓名、邮箱、最近 10 条订单
- 订单展示：订单号、日期、金额、状态
- 登出：清除 Cookie，重定向首页

### 未登录保护

`/account` 路由在服务端检查 Cookie，无 token 时重定向至 Shopify 登录页。

---

## Section 5：Webhooks

### 端点

`POST /api/webhooks`

### 验证流程

```ts
// 1. 读取 raw request body（不能用 req.json()，会破坏签名）
// 2. 从 header 取 X-Shopify-Hmac-Sha256
// 3. 用 SHOPIFY_WEBHOOK_SECRET 计算 HMAC-SHA256(body)，Base64 编码
// 4. 对比，不匹配返回 401
// 5. 根据 X-Shopify-Topic 路由处理
```

### 支持的事件

| Topic | 当前处理 |
|---|---|
| `orders/create` | 记录日志（console.log），预留扩展点 |
| `orders/paid` | 记录日志，预留扩展点 |

### Shopify Admin 配置

在 Shopify Admin → Settings → Notifications → Webhooks 中注册：
- URL: `https://{your-domain}/api/webhooks`
- 版本: `2024-10`（或最新稳定版）

---

## 实现顺序建议

1. 环境变量 + Shopify Client 初始化
2. 产品/集合查询 → 替换 Shop 页数据
3. PDP 页产品详情对接
4. CartContext + CartDrawer + AddToCartButton
5. Navbar 账户入口 + OAuth 登录流程 + `/account` 页
6. Webhook 端点

---

## 不在本次范围

- Reviews 第三方对接（Judge.me 等）
- Webhook 下游业务逻辑（发邮件、扣库存）
- 多语言 / 多货币
- Shopify Markets
