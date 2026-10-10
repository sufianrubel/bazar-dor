"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

const inputClassName =
  "h-9 w-full rounded-lg border border-[#dfe8e1] bg-white px-3 text-sm text-[#28342b] outline-none transition placeholder:text-[#8a958d] hover:border-[#c7d8cb] focus:border-[#078a45] focus:ring-4 focus:ring-[#078a45]/10";

export default function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    toast.error("সাইন ইন সুবিধাটি এখনো চালু হয়নি");
    window.setTimeout(() => setIsLoading(false), 350);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 w-full max-w-md rounded-2xl border border-[#dfe8e1] bg-white/90 p-5 shadow-sm sm:p-5"
    >
      <div className="space-y-3">
        <label
          htmlFor="signin-email"
          className="block text-sm font-semibold text-[#354239]"
        >
          ইমেইল
          <input
            id="signin-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`${inputClassName} mt-1.5`}
            required
          />
        </label>
        <label
          htmlFor="signin-password"
          className="block text-sm font-semibold text-[#354239]"
        >
          পাসওয়ার্ড
          <span className="relative mt-1.5 block">
            <input
              id="signin-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              minLength={8}
              className={`${inputClassName} pr-11`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={
                showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"
              }
              aria-pressed={showPassword}
              className="absolute inset-y-0 right-0 inline-flex w-10 items-center justify-center rounded-r-lg text-[#738077] transition hover:text-[#263229] focus-visible:outline-2 focus-visible:outline-[#078a45]"
            >
              {showPassword ? (
                <FiEyeOff className="size-4" aria-hidden="true" />
              ) : (
                <FiEye className="size-4" aria-hidden="true" />
              )}
            </button>
          </span>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#526057]">
          <input
            type="checkbox"
            name="rememberMe"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            className="size-4 rounded border-[#cbd8ce] accent-[#078a45] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
          />
          মনে রাখুন
        </label>
        <button
          type="button"
          onClick={() =>
            toast("পাসওয়ার্ড পুনরুদ্ধার সুবিধাটি এখনো চালু হয়নি")
          }
          className="rounded text-sm font-medium text-[#078a45] transition hover:text-[#056c37] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
        >
          পাসওয়ার্ড ভুলে গেছেন?
        </button>
      </div>

      <Button
        type="submit"
        isDisabled={isLoading}
        className="mt-5 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#078a45] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06763b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading && (
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
        )}
        {isLoading ? "অপেক্ষা করুন..." : "সাইন ইন"}
      </Button>

      <div className="my-3 flex items-center gap-3 text-sm text-[#7c877f]">
        <span className="h-px flex-1 bg-[#e0e8e1]" />
        অথবা
        <span className="h-px flex-1 bg-[#e0e8e1]" />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          onPress={() => toast.error("Google দিয়ে সাইন ইন এখনো চালু হয়নি")}
          className="inline-flex min-h-9 min-w-0 items-center justify-center gap-2 whitespace-normal rounded-lg border border-[#dfe8e1] bg-white px-3 text-sm font-medium leading-tight text-[#465249] transition hover:border-[#c7d8cb] hover:bg-[#f8faf8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
        >
          <FcGoogle className="size-4" aria-hidden="true" />
          Google দিয়ে চালিয়ে যান
        </Button>
        <Button
          type="button"
          variant="outline"
          onPress={() => toast.error("GitHub দিয়ে সাইন ইন এখনো চালু হয়নি")}
          className="inline-flex min-h-9 min-w-0 items-center justify-center gap-2 whitespace-normal rounded-lg border border-[#dfe8e1] bg-white px-3 text-sm font-medium leading-tight text-[#465249] transition hover:border-[#c7d8cb] hover:bg-[#f8faf8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
        >
          <FaGithub className="size-4" aria-hidden="true" />
          GitHub দিয়ে চালিয়ে যান
        </Button>
      </div>

      <p className="mt-3 text-center text-sm text-[#667269]">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href="/signup"
          className="font-semibold text-[#078a45] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </form>
  );
}
