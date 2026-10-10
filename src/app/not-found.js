import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f0f5f1] px-4 text-center">
      <p className="text-sm font-semibold text-[#078a45]">পৃষ্ঠা পাওয়া যায়নি</p>
      <h1 className="mt-2 text-2xl font-extrabold text-[#202b23]">
        এই ঠিকানায় কোনো পৃষ্ঠা নেই
      </h1>
      <p className="mt-2 max-w-md text-sm text-[#748077]">
        ঠিকানাটি পরীক্ষা করুন অথবা বাজারদরের হোম পেজে ফিরে যান।
      </p>
      <Link
        href="/"
        className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#078a45] px-4 text-sm font-semibold text-white transition hover:bg-[#06763b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
