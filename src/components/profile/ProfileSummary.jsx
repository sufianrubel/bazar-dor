"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { mockUser } from "@/data/mock-user";
import { actionMessages } from "@/data/action-messages";

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
          <Image
            src="/images/avatar.png"
            alt=""
            width={64}
            height={64}
            className="size-full object-cover"
          />
        </span>
        <div className="min-w-0">
          <h2 className="truncate text-base font-bold text-[#263229] sm:text-lg">
            {mockUser.name}
          </h2>
          <p className="truncate text-sm text-[#748077]">
            {mockUser.email}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => toast(actionMessages.signOutUnavailable)}
        className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#e4544d] px-3 text-sm font-medium text-[#d74640] transition hover:bg-[#fff0ee] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d74640] sm:min-h-9"
      >
        <FiLogOut aria-hidden="true" />
        সাইন আউট
      </button>
    </section>
  );
}
