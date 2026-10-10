import Link from "next/link";
import PriceTicker from "@/components/layout/PriceTicker";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";

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
        <div
          className={`w-full text-center ${isProfilePage ? "max-w-xl" : "max-w-md"}`}
        >
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
      <SiteFooter />
    </div>
  );
}
