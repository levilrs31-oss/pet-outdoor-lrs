# Navbar 磨砂玻璃样式实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 用 `backdrop-blur` 磨砂玻璃效果替换 Hero 页面 Navbar 顶部的黑色渐变遮罩，使导航栏与 Hero 图自然融合，滚动后仍切换为纯色背景。

**Architecture:** 仅修改 `components/layout/Navbar.tsx`：删除独立的渐变遮罩 div，同时修改 header 在 `hasDarkHero && !scrolled` 时的背景类名。滚动后行为（`bg-bg` 纯色）和非 Hero 页面行为均不变。

**Tech Stack:** Next.js App Router, Tailwind CSS v4, `backdrop-filter: blur`

---

### Task 1: 删除渐变遮罩 div，应用磨砂玻璃背景

**Files:**
- Modify: `components/layout/Navbar.tsx:62-66`（渐变遮罩 div）
- Modify: `components/layout/Navbar.tsx:69-73`（header 条件背景类名）

- [ ] **Step 1: 删除渐变遮罩 div**

  在 `components/layout/Navbar.tsx` 中找到并删除以下整块（约第 61-66 行）：

  ```tsx
  {/* Tall gradient scrim — only on hero pages before scrolling */}
  {hasDarkHero && !scrolled && (
    <div
      className={`fixed left-0 right-0 z-40 h-40 bg-gradient-to-b from-black/60 to-transparent pointer-events-none transition-opacity duration-300 ${top}`}
    />
  )}
  ```

  删除后该位置为空，直接接 `<header ...>`。

- [ ] **Step 2: 修改 header 的条件背景类名**

  找到 header 元素的 `className`（约第 69-73 行）：

  ```tsx
  className={`fixed left-0 right-0 z-50 transition-all duration-[300ms] ease-out ${top} ${
    scrolled || !hasDarkHero
      ? "bg-bg border-b border-surface shadow-[0_1px_8px_rgba(0,0,0,0.06)]"
      : "bg-transparent"
  }`}
  ```

  将 `"bg-transparent"` 替换为磨砂玻璃类名：

  ```tsx
  className={`fixed left-0 right-0 z-50 transition-all duration-[300ms] ease-out ${top} ${
    scrolled || !hasDarkHero
      ? "bg-bg border-b border-surface shadow-[0_1px_8px_rgba(0,0,0,0.06)]"
      : "bg-white/10 backdrop-blur-md border-b border-white/15"
  }`}
  ```

- [ ] **Step 3: 启动开发服务器验证视觉效果**

  ```bash
  npm run dev
  ```

  打开 `http://localhost:3000`，验证以下三个状态：

  1. **首页未滚动**：Navbar 应显示磨砂玻璃效果，Hero 图从背景透出，无黑色渐变遮罩
  2. **首页向下滚动**：Navbar 应平滑切换为纯色 `bg-bg` 背景（浅米色）
  3. **非 Hero 页面**（如 `/contact`、`/faq`）：Navbar 始终显示纯色 `bg-bg`，无变化

- [ ] **Step 4: 提交**

  ```bash
  git add components/layout/Navbar.tsx
  git commit -m "feat: 用磨砂玻璃替换 Navbar 黑色渐变遮罩，滚动后保持纯色背景"
  ```
