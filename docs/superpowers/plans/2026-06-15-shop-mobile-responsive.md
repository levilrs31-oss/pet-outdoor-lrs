# Shop 移动端响应式适配 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复 Shop 页在移动端的三处布局缺陷：CategoryTabs 滚动条可见、FilterSidebar 在移动端占用宽度挤压产品网格、过滤器无移动端入口。

**Architecture:** 纯 Tailwind 响应式，不引入新依赖。FilterSidebar 移除自带固定宽度，由 ProductGrid 在桌面端控制；移动端通过 bottom sheet（CSS transform 动画）暴露过滤器，状态全部保留在 ProductGrid。

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, TypeScript

---

## 文件变更一览

| 文件 | 操作 | 说明 |
|------|------|------|
| `components/shop/CategoryTabs.tsx` | 修改 | 加 `scrollbar-none` |
| `components/shop/FilterSidebar.tsx` | 修改 | 移除 `w-56 shrink-0`，由父级控制宽度 |
| `components/shop/ProductGrid.tsx` | 修改 | 响应式布局 + 移动端工具栏 + bottom sheet |

---

### Task 1：CategoryTabs — 隐藏滚动条

**Files:**
- Modify: `components/shop/CategoryTabs.tsx:17`

- [ ] **Step 1：修改 nav className**

打开 `components/shop/CategoryTabs.tsx`，找到第 17 行的 `<nav>` 标签，将 className 从：

```tsx
<nav className="flex border-b border-surface overflow-x-auto">
```

改为：

```tsx
<nav className="flex border-b border-surface overflow-x-auto scrollbar-none">
```

- [ ] **Step 2：本地验证**

```bash
npm run dev
```

在 Chrome DevTools 切换到移动端设备（375px），访问 `/shop`，横向滑动分类标签栏，确认：
- 可以滑动查看所有标签
- 滚动条不可见

- [ ] **Step 3：提交**

```bash
git add components/shop/CategoryTabs.tsx
git commit -m "fix: CategoryTabs 移动端隐藏横向滚动条"
```

---

### Task 2：FilterSidebar — 移除固定宽度

**Files:**
- Modify: `components/shop/FilterSidebar.tsx:45`

- [ ] **Step 1：修改 aside className**

打开 `components/shop/FilterSidebar.tsx`，找到第 45 行的 `<aside>` 标签，将：

```tsx
<aside className="w-56 shrink-0">
```

改为：

```tsx
<aside>
```

宽度将由父级（ProductGrid 的桌面端包装 div）控制，drawer 内不需要固定宽度。

- [ ] **Step 2：本地验证**

桌面端（1280px）访问 `/shop`，确认 FilterSidebar 仍正常显示（宽度由下一个 Task 的父级 div 控制，此时暂时会失去宽度，属正常现象）。

- [ ] **Step 3：提交**

```bash
git add components/shop/FilterSidebar.tsx
git commit -m "fix: FilterSidebar 移除自带固定宽度，由父级控制"
```

---

### Task 3：ProductGrid — 响应式布局 + 移动端工具栏 + Bottom Sheet

**Files:**
- Modify: `components/shop/ProductGrid.tsx`

这是本次改动的核心，将整个 `ProductGrid` 组件替换为以下实现：

- [ ] **Step 1：替换 ProductGrid 完整内容**

将 `components/shop/ProductGrid.tsx` 全部内容替换为：

```tsx
/* components/shop/ProductGrid.tsx */
"use client";

import { useState } from "react";
import { products, getProductsByCategory } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";
import FilterSidebar from "./FilterSidebar";

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

interface ProductGridProps {
  category?: string;
}

export default function ProductGrid({ category }: ProductGridProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleSize = (s: string) =>
    setSelectedSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const toggleFeature = (f: string) =>
    setSelectedFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );

  const base = category ? getProductsByCategory(category) : products;

  const filtered = base.filter((p) => {
    if (selectedSizes.length > 0 && !p.sizes.some((s) => selectedSizes.includes(s))) {
      return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    return 0;
  });

  const activeFilterCount = selectedSizes.length + selectedFeatures.length;

  const sortSelect = (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value as SortOption)}
      className="font-sans text-xs border border-surface rounded-sm px-3 py-1.5 bg-bg text-text focus:border-brand outline-none cursor-pointer"
    >
      <option value="default">Best Selling</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name-asc">Name: A–Z</option>
    </select>
  );

  return (
    <>
      <div className="flex gap-10">
        {/* 桌面端侧边栏 */}
        <div className="hidden md:block w-56 shrink-0">
          <FilterSidebar
            selectedSizes={selectedSizes}
            selectedFeatures={selectedFeatures}
            onSizeToggle={toggleSize}
            onFeatureToggle={toggleFeature}
          />
        </div>

        {/* 产品区域 */}
        <div className="flex-1 min-w-0">
          {/* 移动端工具栏 */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 font-sans text-xs tracking-[0.12em] uppercase border border-surface rounded-sm px-4 py-2 text-text hover:border-brand transition-colors duration-150"
            >
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-brand text-white text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {sortSelect}
          </div>

          {/* 桌面端工具栏 */}
          <div className="hidden md:flex justify-between items-center mb-8">
            <p className="font-sans text-sm text-text/60">
              Showing {sorted.length} product{sorted.length !== 1 ? "s" : ""}
            </p>
            {sortSelect}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {sorted.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom sheet — 遮罩 */}
      <div
        className={`fixed inset-0 bg-dark/40 z-40 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Bottom sheet — 面板 */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 bg-bg rounded-t-2xl max-h-[75vh] flex flex-col transition-transform duration-300 ease-out ${
          drawerOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface shrink-0">
          <span className="font-sans text-xs tracking-[0.15em] uppercase font-medium text-text">
            Filters
          </span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-text/40 hover:text-text transition-colors duration-150 text-xl leading-none"
            aria-label="Close filters"
          >
            ✕
          </button>
        </div>

        {/* 可滚动内容 */}
        <div className="overflow-y-auto flex-1 px-6 pt-4">
          <FilterSidebar
            selectedSizes={selectedSizes}
            selectedFeatures={selectedFeatures}
            onSizeToggle={toggleSize}
            onFeatureToggle={toggleFeature}
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-surface shrink-0 pb-8">
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-full bg-brand text-white font-sans text-xs tracking-[0.12em] uppercase py-3 rounded-sm hover:bg-brand/90 transition-colors duration-150"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2：本地验证 — 移动端**

```bash
npm run dev
```

Chrome DevTools → iPhone 14 Pro（390px），访问 `/shop`：

1. 过滤器侧边栏不可见，产品网格全宽显示
2. 顶部工具栏：左侧 "FILTERS" 按钮，右侧排序下拉框
3. 点击 "FILTERS"：底部抽屉从下向上滑出，遮罩出现
4. 抽屉内可看到 Size + Features 过滤选项
5. 点击 "APPLY" 或遮罩或 ✕ — 抽屉滑回底部
6. 选中过滤项后，FILTERS 按钮出现绿色数字角标
7. 产品卡片为 2 列，无截断

- [ ] **Step 3：本地验证 — 桌面端**

Chrome DevTools 切回桌面视图（≥ 1024px）：

1. FilterSidebar 在左侧显示，宽度 224px（`w-56`）
2. 产品网格在右侧，3 列
3. 顶部显示 "Showing N products" + 排序下拉框
4. 底部 bottom sheet 不可见（`translate-y-full` 始终生效）
5. 不出现移动端的 FILTERS 按钮

- [ ] **Step 4：构建检查**

```bash
npm run build
```

预期：无 TypeScript 错误，无 ESLint 错误，build 成功输出 `.next/`。

- [ ] **Step 5：提交**

```bash
git add components/shop/ProductGrid.tsx
git commit -m "feat: Shop 移动端响应式布局 — bottom sheet 过滤器 + 工具栏"
```
