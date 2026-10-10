import { footerContent } from "@/data/page-content";

export default function SiteFooter({ maxWidth = "max-w-6xl" }) {
  return (
    <footer className="mt-auto border-t border-[#e0e9e1] bg-white/70">
      <div
        className={`mx-auto flex ${maxWidth} flex-col gap-2 px-4 py-4 text-sm text-[#657168] sm:flex-row sm:items-center sm:justify-between sm:px-6`}
      >
        <p>{footerContent.tagline}</p>
        <p>{footerContent.disclaimer}</p>
      </div>
    </footer>
  );
}
