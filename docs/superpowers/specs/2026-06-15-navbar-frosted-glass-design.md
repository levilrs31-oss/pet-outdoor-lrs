# Navbar 磨砂玻璃样式设计

## 背景

现有 Navbar 在 Hero 页面（`/`、`/about`、`/shop`）未滚动时，使用一个 `bg-gradient-to-b from-black/60 to-transparent` 的黑色遮罩 div 来保证白色文字可读。用户反馈这层黑色渐变与 Hero 图视觉割裂，希望改为更融合的方案。

## 目标

用 `backdrop-blur` 磨砂玻璃效果替换黑色渐变遮罩，使 Navbar 在 Hero 区域与页面内容无缝融合，同时滚动进入内容区后切换为干净的纯色背景。

## 范围

仅修改 `components/layout/Navbar.tsx`，不涉及其他组件。

## 行为规格

### 未滚动 × Hero 页面（`scrolled === false && hasDarkHero === true`）

| 属性 | 当前值 | 新值 |
|------|--------|------|
| Header 背景 | `bg-transparent` | `bg-white/10 backdrop-blur-md` |
| Header 边框 | 无 | `border-b border-white/15` |
| 渐变遮罩 div | `bg-gradient-to-b from-black/60 to-transparent`（独立 div） | **删除** |
| Logo 颜色 | `text-white` | `text-white`（不变） |
| 导航链接颜色 | `text-white` | `text-white`（不变） |
| 图标颜色 | `text-white` | `text-white`（不变） |

### 已滚动（`scrolled === true`）

无变化，保持现有 `bg-bg border-b border-surface shadow-[0_1px_8px_rgba(0,0,0,0.06)]`。

### 非 Hero 页面（`hasDarkHero === false`）

无变化，始终显示纯色 `bg-bg`。

### 过渡动画

复用现有 `transition-all duration-[300ms] ease-out`，无需额外修改。

## 实现要点

- 删除 `{hasDarkHero && !scrolled && (<div className="fixed ... bg-gradient-to-b from-black/60 ...">)}` 整块
- 修改 header 的条件类名：将 `hasDarkHero && !scrolled` 时的 `bg-transparent` 替换为 `bg-white/10 backdrop-blur-md border-b border-white/15`

## 不在范围内

- 移动端汉堡菜单样式
- 滚动后 Navbar 的纯色背景逻辑
- CartDrawer / AnnouncementBar 相关样式
