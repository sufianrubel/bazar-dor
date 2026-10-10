export default function SiteFooter({ maxWidth = "max-w-6xl" }) {
  return (
    <footer className="mt-auto border-t border-[#e0e9e1] bg-white/70">
      <div
        className={`mx-auto flex ${maxWidth} flex-col gap-2 px-4 py-4 text-sm text-[#657168] sm:flex-row sm:items-center sm:justify-between sm:px-6`}
      >
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
}
