import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import ProfileMenu from "@/app/profile-menu";

const categories = [
  ["চাল", "🍚"],
  ["ডাল", "🫘"],
  ["তেল", "🛢️"],
  ["সবজি", "🥬"],
  ["মাছ", "🐟"],
  ["মাংস", "🍗"],
  ["ডিম-দুধ", "🥛"],
  ["মসলা", "🌶️"],
];

const tickerProducts = [
  ["🍚", "স্বর্ণমাছি চাল", "১৪৮ টাকা/কেজি", "▲ ২.১%", "up"],
  ["🍚", "মিনিকেট চাল", "৯১ টাকা/কেজি", "▼ ১.২%", "down"],
  ["🍚", "বাসমতি সুগন্ধি চাল", "৬১ টাকা/কেজি", "▲ ০.৬%", "up"],
  ["🫘", "মসুর ডাল", "১৪২ টাকা/কেজি", "▲ ২.৩%", "up"],
  ["🫘", "ছোলা", "১২০ টাকা/কেজি", "▼ ২.৮%", "down"],
  ["🍆", "বেগুন", "৮৮ টাকা/কেজি", "▲ ৪.২%", "up"],
  ["🧅", "পেঁয়াজ", "৫৪ টাকা/কেজি", "▲ ১.৩%", "up"],
  ["🌶️", "কাঁচামরিচ", "৯২ টাকা/কেজি", "▼ ৪.৮%", "down"],
];

function SiteHeader({ activePage }) {
  return (
    <header className="border-b border-[#e6ece7] bg-white/75">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#078a45]"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#078a45] text-white">
            <FiShoppingCart className="size-4" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-extrabold leading-4 text-[#202b23]">
              বাজার দর
            </span>
            <span className="mt-0.5 block text-sm text-[#718077]">
              শনিবার, ১০ অক্টোবর, ২০২৬
            </span>
          </span>
        </Link>
        {activePage === "profile" ? (
          <ProfileMenu />
        ) : (
          <nav aria-label="অ্যাকাউন্ট" className="flex items-center gap-2">
            <Link
              href="/signin"
              aria-current={activePage === "signin" ? "page" : undefined}
              className={`rounded-md px-3 py-2 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45] ${
                activePage === "signin"
                  ? "font-semibold text-[#08743d]"
                  : "font-medium text-[#4e5b52] hover:bg-[#eef5f0]"
              }`}
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              aria-current={activePage === "signup" ? "page" : undefined}
              className="rounded-lg bg-[#078a45] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06763b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
            >
              সাইন আপ
            </Link>
          </nav>
        )}
      </div>
      <nav aria-label="পণ্যের বিভাগ" className="border-t border-[#edf1ed]">
        <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 py-1.5 sm:justify-center sm:px-6">
          {categories.map(([category, emoji]) => (
            <Link
              key={category}
              href="/#all-products"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium text-[#58645c] transition hover:bg-[#e8f3eb] hover:text-[#08743d] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#078a45]"
            >
              <span aria-hidden="true">{emoji}</span>
              {category}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

function PriceTicker() {
  return (
    <div className="overflow-hidden border-b border-[#e3eae4] bg-white/80 py-1.5">
      <div className="price-ticker flex w-max items-center">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {tickerProducts.map(([emoji, name, price, change, direction]) => (
              <span
                key={`${copy}-${name}`}
                className="flex items-center gap-1.5 border-r border-[#e6ece7] px-4 text-sm text-[#364239]"
              >
                <span aria-hidden="true">{emoji}</span>
                <span className="font-semibold">{name}</span>
                <span className="whitespace-nowrap text-[#69766d]">
                  {price}
                </span>
                <span
                  className={`whitespace-nowrap font-bold ${
                    direction === "up" ? "text-[#d84943]" : "text-[#16884a]"
                  }`}
                >
                  {change}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AuthPageLayout({
  activePage,
  children,
  description,
  title,
}) {
  const isProfilePage = activePage === "profile";

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f5f1]">
      <SiteHeader activePage={activePage} />
      <PriceTicker />
      <main
        className={`flex flex-1 flex-col items-center px-4 pb-12 ${
          isProfilePage ? "pt-16 sm:pt-20" : "pt-8 sm:pt-10"
        }`}
      >
        <div className={`w-full text-center ${isProfilePage ? "max-w-xl" : "max-w-md"}`}>
          <h1 className="text-2xl font-extrabold leading-tight text-[#202b23]">
            {title}
          </h1>
          <p className="mt-2 text-sm text-[#6b786f]">{description}</p>
        </div>
        {children}
        {!isProfilePage && (
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-1 rounded-md py-1 text-sm text-[#6b786f] transition hover:text-[#08743d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
          >
            <span aria-hidden="true">←</span>
            হোম পেজে ফিরে যান
          </Link>
        )}
      </main>
      <footer className="mt-auto border-t border-[#e0e9e1] bg-white/70">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-4 text-sm text-[#657168] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </footer>
    </div>
  );
}
