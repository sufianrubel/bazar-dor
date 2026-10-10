import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { categories } from "@/lib/catalog";
import ProfileMenu from "@/app/profile-menu";

export default function SiteHeader({
  activeCategory,
  maxWidth = "max-w-6xl",
}) {
  return (
    <header className="border-b border-[#e6ece7] bg-white/75">
      <div
        className={`mx-auto flex ${maxWidth} items-center justify-between gap-4 px-4 py-3 sm:px-6`}
      >
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#078a45]"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#078a45] text-white">
            <FiShoppingCart className="size-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-extrabold leading-5 text-[#202b23]">
              বাজার দর
            </span>
            <span className="mt-0.5 block text-sm text-[#718077]">
              শনিবার, ১০ অক্টোবর, ২০২৬
            </span>
          </span>
        </Link>
        <ProfileMenu />
      </div>
      <nav
        aria-label="পণ্যের বিভাগ"
        className="border-t border-[#edf1ed]"
      >
        <div
          className={`mx-auto flex ${maxWidth} gap-1 overflow-x-auto px-4 py-2 sm:justify-center sm:px-6`}
        >
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              aria-current={
                activeCategory === category.slug ? "page" : undefined
              }
              className={`inline-flex min-h-8 shrink-0 items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#078a45] ${
                activeCategory === category.slug
                  ? "rounded-md bg-[#078a45] text-white"
                  : "rounded-full text-[#58645c] hover:bg-[#e8f3eb] hover:text-[#08743d]"
              }`}
            >
              <span aria-hidden="true">{category.emoji}</span>
              {category.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
