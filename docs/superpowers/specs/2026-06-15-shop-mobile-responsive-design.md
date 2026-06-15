# Shop 页移动端响应式适配设计

## 问题描述

移动端访问 `/shop` 时存在三处布局缺陷：

1. **CategoryTabs** — `overflow-x-auto` 生效但滚动条可见，且最右侧标签被裁切
2. **ProductGrid** — 始终使用 `flex gap-10` 横排，FilterSidebar (`w-56`) 固定占用 224px，在 375px 宽的手机屏幕上严重挤压产品网格
3. **FilterSidebar** — 移动端没有隐藏机制，与产品网格并列，产品卡片被截断

## 方案选择

采用**方案 A：纯 Tailwind 响应式**，不引入新依赖，改动集中在现有三个组件。

## 设计

### 一、CategoryTabs

- 现有 `overflow-x-auto` 保留
- 新增 `scrollbar-none`（对应 CSS `scrollbar-width: none` + `::-webkit-scrollbar { display: none }`）让横向滚动条不可见
- 无其他改动

### 二、ProductGrid — 整体布局

**桌面端（`md` 及以上，≥ 768px）：**
- 保持现有 `flex gap-10` 横排，FilterSidebar 在左，产品网格在右

**移动端（`< md`）：**
- 外层改为 `flex-col`，产品网格全宽
- FilterSidebar 不渲染到普通文档流（通过 CSS 在 `< md` 时隐藏）
- 产品网格上方新增一行工具栏（见下文）

### 三、移动端工具栏

位于产品网格顶部，替代原来的 Showing N / Sort 行：

```
[ Filters (N) ]          [ Best Selling ▾ ]
```

- 左侧 **Filters 按钮**：文字 + 角标（当 `selectedSizes.length + selectedFeatures.length > 0` 时显示已选数量）；点击打开 bottom sheet
- 右侧**排序下拉框**：与现有 `<select>` 相同，样式不变
- Filters 按钮在 `md:` 及以上**必须隐藏**（`md:hidden`），桌面端侧边栏始终可见，不需要此按钮

### 四、Bottom Sheet（FilterDrawer）

**结构（两层）：**

```
<div> // 遮罩：fixed inset-0 bg-dark/40, z-40
<div> // Sheet：fixed inset-x-0 bottom-0, z-50, max-h-[75vh]
  <header> // 标题 "Filters" + ✕ 关闭按钮
  <div overflow-y-auto> // FilterSidebar 内容（复用现有组件）
  <footer> // "Apply" 按钮
```

**动画：**
- Sheet：`transform translate-y-full` → `translate-y-0`，`transition-transform duration-300 ease-out`
- 遮罩：`opacity-0` → `opacity-100`，`transition-opacity duration-300`
- 通过 `isOpen` 状态（boolean）切换

**关闭方式（三种）：**
1. 点击遮罩
2. 点击 sheet 内 ✕ 按钮
3. 点击底部 "Apply" 按钮

**状态管理：**
- `isOpen` 新增到 `ProductGrid` 的 state（现有组件，无需新文件）
- 过滤器状态 `selectedSizes` / `selectedFeatures` 保持在 `ProductGrid`，通过 props 传入 sheet 内的 FilterSidebar，逻辑零冗余

**Sheet 样式：**
- 背景色：`bg-bg`（与页面一致）
- 圆角：`rounded-t-2xl`
- 底部内边距：`pb-8`，确保 iOS 底部 home indicator 不遮挡内容
- 最大高度：`max-h-[75vh]`，内容超出时内部滚动

## 改动文件

| 文件 | 改动内容 |
|------|---------|
| `components/shop/CategoryTabs.tsx` | 加 `scrollbar-none` |
| `components/shop/ProductGrid.tsx` | 响应式布局、移动端工具栏、bottom sheet 状态及结构 |
| `components/shop/FilterSidebar.tsx` | 移除固定宽度 `w-56`，改为外部传入宽度（由桌面端 wrapper 控制） |

## 不在本次范围内

- 其他页面（PDP、首页）的移动端问题
- FilterSidebar 过滤逻辑变更
- 新增过滤维度（颜色、价格区间等）
