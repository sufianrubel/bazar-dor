"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfileUpdateForm() {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    toast.error("প্রোফাইল আপডেট সুবিধাটি এখনো চালু হয়নি");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl rounded-2xl border border-[#dfe8e1] bg-white/80 p-4 shadow-sm sm:p-5"
    >
      <h2 className="text-base font-bold text-[#354239]">তথ্য</h2>
      <label
        htmlFor="profile-name"
        className="mt-5 block px-1 text-sm font-medium text-[#526057]"
      >
        নাম
        <input
          id="profile-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-2 h-10 w-full rounded-lg border border-[#dfe8e1] bg-white px-3 text-sm text-[#28342b] outline-none transition placeholder:text-[#8a958d] hover:border-[#c7d8cb] focus:border-[#078a45] focus:ring-4 focus:ring-[#078a45]/10"
          required
        />
      </label>
      <Button
        type="submit"
        className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-[#078a45] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06763b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
      >
        আপডেট
      </Button>
    </form>
  );
}
