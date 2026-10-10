"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SocialAuthOptions from "@/components/auth/SocialAuthOptions";
import { formInputClassName } from "@/constants/form-styles";
import { actionMessages } from "@/data/action-messages";
import { authClient } from "@/lib/auth-client";

export default function SigninForm({
  socialProviders,
  redirectTo,
  redirectedFromProduct,
}) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (redirectedFromProduct) {
      toast(actionMessages.productSignInRequired);
    }
  }, [redirectedFromProduct]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: formData.get("email"),
        password: formData.get("password"),
        rememberMe,
        callbackURL: redirectTo,
      });

      if (error) {
        console.error("Email sign-in rejected:", error.message);
        toast.error(actionMessages.signInFailed);
        return;
      }

      toast.success(actionMessages.signInSuccess);
      router.replace(redirectTo);
      router.refresh();
    } catch (error) {
      console.error(
        "Email sign-in request failed:",
        error instanceof Error ? error.message : "Unknown error.",
      );
      toast.error(actionMessages.signInFailed);
    } finally {
      setIsLoading(false);
    }
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
            className={`${formInputClassName} mt-1.5`}
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
              className={`${formInputClassName} pr-11`}
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
            toast(actionMessages.passwordRecoveryUnavailable)
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

      <SocialAuthOptions providers={socialProviders} callbackURL={redirectTo} />

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
