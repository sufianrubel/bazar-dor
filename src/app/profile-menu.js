"use client";

import { Dropdown } from "@heroui/react";
import toast from "react-hot-toast";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";

export default function ProfileMenu() {
  return (
    <Dropdown>
      <Dropdown.Trigger
        aria-label="Rezwan-এর প্রোফাইল মেনু খুলুন"
        className="flex items-center gap-2 rounded-xl p-1 text-left transition hover:bg-[#f0f5f1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
      >
        <span
          className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#edf1ee] text-lg"
          aria-hidden="true"
        >
          👨🏽‍💼
        </span>
        <span className="text-sm font-medium text-[#202b23]">Rezwan</span>
        <FiChevronDown
          className="ml-0.5 size-3 text-[#77827a] transition group-data-[pressed]:rotate-180"
          aria-hidden="true"
        />
      </Dropdown.Trigger>
      <Dropdown.Popover
        placement="bottom end"
        className="w-56 rounded-2xl border border-[#e1e9e2] bg-[#fbfcfb] p-2 shadow-lg"
      >
        <div className="px-2 py-1.5">
          <p className="text-sm font-semibold leading-5 text-[#263229]">
            Rezwan Ahmed
          </p>
          <p className="text-xs leading-4 text-[#748077]">
            rezwanahmed@gmail.com
          </p>
        </div>
        <Dropdown.Menu
          aria-label="প্রোফাইল মেনু"
          className="border-t border-[#edf1ed] pt-1"
        >
          <Dropdown.Item
            id="profile"
            href="/profile"
            className="flex min-h-8 items-center gap-2 rounded-lg px-2 text-sm text-[#303d34] outline-none transition hover:bg-[#eef5f0] focus:bg-[#eef5f0]"
          >
            <FiUser className="size-4 text-[#708077]" aria-hidden="true" />
            আমার প্রোফাইল
          </Dropdown.Item>
          <Dropdown.Item
            id="sign-out"
            className="flex min-h-8 items-center gap-2 rounded-lg px-2 text-sm text-[#d74640] outline-none transition hover:bg-[#fff0ee] focus:bg-[#fff0ee]"
            onAction={() => toast("সাইন আউট সুবিধাটি এখনো চালু হয়নি")}
          >
            <FiLogOut className="size-4" aria-hidden="true" />
            সাইন আউট
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
