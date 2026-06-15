/* components/layout/CartDrawer.tsx */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";

function QtyControl({ id, qty, updateQty }: {
  id: string;
  qty: number;
  updateQty: (id: string, qty: number) => void;
}) {
  return (
    <div className="flex items-center border border-surface rounded-sm">
      <button
        aria-label="Decrease quantity"
        onClick={() => updateQty(id, qty - 1)}
        className="w-8 h-8 flex items-center justify-center font-sans text-sm text-text/60 hover:text-text transition-colors duration-150"
      >
        −
      </button>
      <span className="w-6 text-center font-sans text-sm text-text">{qty}</span>
      <button
        aria-label="Increase quantity"
        onClick={() => updateQty(id, qty + 1)}
        className="w-8 h-8 flex items-center justify-center font-sans text-sm text-text/60 hover:text-text transition-colors duration-150"
      >
        +
      </button>
    </div>
  );
}

export default function CartDrawer() {
  const { items, count, subtotal, removeItem, clearCart, drawerOpen, closeDrawer } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeDrawer}
        className={`fixed inset-0 z-40 bg-dark/30 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-bg flex flex-col transition-transform duration-300 ease-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-surface flex-shrink-0">
          <h2 className="font-serif text-xl font-light text-text">
            Cart {count > 0 && <span className="font-sans text-sm text-text/40">({count})</span>}
          </h2>
          <button
            aria-label="Close cart"
            onClick={closeDrawer}
            className="text-text/50 hover:text-text transition-colors duration-200"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" className="text-text/20">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="font-serif text-2xl font-light text-text/40">Your cart is empty</p>
              <button
                onClick={closeDrawer}
                className="font-sans text-xs tracking-[0.15em] uppercase text-brand underline underline-offset-4"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-surface px-6">
              {items.map((item) => (
                <li key={item.id} className="py-5 flex gap-4">
                  {/* Thumbnail */}
                  <Link href={`/shop/${item.slug}`} onClick={closeDrawer} className="flex-shrink-0">
                    <div className="relative w-20 h-24 rounded-sm overflow-hidden bg-surface">
                      <Image
                        src={item.image}
                        fill
                        sizes="80px"
                        className="object-cover"
                        alt={item.name}
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <Link
                      href={`/shop/${item.slug}`}
                      onClick={closeDrawer}
                      className="font-serif text-base font-light text-text hover:text-brand transition-colors duration-200 leading-snug"
                    >
                      {item.name}
                    </Link>
                    <p className="font-sans text-xs text-text/40">
                      {item.color} · {item.size}
                    </p>
                    <p className="font-sans text-sm font-medium text-text mt-auto">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col items-end justify-between flex-shrink-0">
                    <button
                      aria-label="Remove item"
                      onClick={() => removeItem(item.id)}
                      className="text-text/30 hover:text-text transition-colors duration-150"
                    >
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                      </svg>
                    </button>
                    <QtyControl id={item.id} qty={item.qty} updateQty={updateQty} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — only when cart has items */}
        {items.length > 0 && (
          <div className="border-t border-surface px-6 py-6 flex-shrink-0 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-sans text-xs tracking-[0.15em] uppercase text-text/50">Subtotal</span>
              <span className="font-sans text-lg font-medium text-text">${subtotal.toFixed(2)}</span>
            </div>
            <p className="font-sans text-xs text-text/40">
              Shipping and taxes calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="flex items-center justify-center w-full h-[52px] bg-brand text-white font-sans text-xs tracking-[0.15em] uppercase font-medium rounded-sm hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(45,74,62,0.25)] transition-all duration-200"
            >
              Checkout · ${subtotal.toFixed(2)}
            </Link>
            <button
              onClick={() => { clearCart(); closeDrawer(); }}
              className="w-full font-sans text-xs text-text/40 hover:text-text transition-colors duration-200 tracking-wide"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}