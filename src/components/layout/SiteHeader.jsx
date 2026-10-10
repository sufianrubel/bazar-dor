import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { siteConfig } from "@/constants/site";
import ProfileMenu from "./ProfileMenu";

export default function SiteHeader({
  activeCategory,
  activePage,
  maxWidth = "max-w-6xl",
}) {
  return (
    <header className="border-b border-[#e6ece7] bg-white/75">
      <div
        className={`mx-auto flex ${maxWidth} items-center justify-between gap-4 px-4 py-2.5 sm:px-6`}
      >
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#078a45]"
        >
          <Image
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            priority
            className="size-10 shrink-0 object-contain"
          />
          <span>
            <span className="block text-sm font-extrabold leading-4 text-[#202b23]">
              {siteConfig.name}
            </span>
            <span className="mt-0.5 block text-xs text-[#718077]">
              {siteConfig.dateLabel}
            </span>
          </span>
        </Link>
        {activePage === "signin" || activePage === "signup" ? (
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
        ) : (
          <ProfileMenu />
        )}
      </div>
      <nav aria-label="পণ্যের বিভাগ" className="border-t border-[#edf1ed]">
        <div
          className={`mx-auto flex ${maxWidth} gap-1 overflow-x-auto px-4 py-1 sm:justify-center sm:px-6`}
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
