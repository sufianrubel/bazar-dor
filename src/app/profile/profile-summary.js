"use client";

import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";

export default function ProfileSummary() {
  return (
    <section
      aria-label="অ্যাকাউন্টের তথ্য"
      className="flex w-full max-w-xl flex-col gap-4 rounded-2xl border border-[#dfe8e1] bg-white/80 p-4 shadow-sm sm:flex-row sm:items-center sm:p-5"
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <span
          className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#edf1ee] text-4xl"
          aria-hidden="true"
        >
          👨🏽‍💼
        </span>
        <div className="min-w-0">
          <h2 className="truncate text-base font-bold text-[#263229] sm:text-lg">
            Rezwan Ahmed
          </h2>
          <p className="truncate text-sm text-[#748077]">
            rezwanahmed@gmail.com
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => toast("সাইন আউট সুবিধাটি এখনো চালু হয়নি")}
        className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#e4544d] px-3 text-sm font-medium text-[#d74640] transition hover:bg-[#fff0ee] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d74640] sm:min-h-9"
      >
        <FiLogOut aria-hidden="true" />
        সাইন আউট
      </button>
    </section>
  );
}
