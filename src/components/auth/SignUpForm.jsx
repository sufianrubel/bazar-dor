"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { actionMessages } from "@/data/action-messages";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SocialAuthOptions from "@/components/auth/SocialAuthOptions";
import { formInputClassName } from "@/constants/form-styles";
import { authClient } from "@/lib/auth-client";

export default function SignupForm({ socialProviders, oauthError }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      toast.error(actionMessages.passwordMismatch);
      return;
    }

    setPasswordMismatch(false);
    const formData = new FormData(event.currentTarget);
    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: formData.get("name"),
        email: formData.get("email"),
        password,
        callbackURL: "/",
      });

      if (error) {
        console.error("Email sign-up rejected:", error.message);
        toast.error(actionMessages.signupFailed);
        return;
      }

      toast.success(actionMessages.signupSuccess);
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error(
        "Email sign-up request failed:",
        error instanceof Error ? error.message : "Unknown error.",
      );
      toast.error(actionMessages.signupFailed);
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
          htmlFor="signup-name"
          className="block text-sm font-semibold text-[#354239]"
        >
          নাম
          <input
            id="signup-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="যেমন: রহিম উদ্দিন"
            className={`${formInputClassName} mt-1.5`}
            required
          />
        </label>
        <label
          htmlFor="signup-email"
          className="block text-sm font-semibold text-[#354239]"
        >
          ইমেইল
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`${formInputClassName} mt-1.5`}
            required
          />
        </label>
        <label
          htmlFor="signup-password"
          className="block text-sm font-semibold text-[#354239]"
        >
          পাসওয়ার্ড
          <span className="relative mt-1.5 block">
            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              minLength={8}
              className={`${formInputClassName} pr-11`}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordMismatch(false);
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={
                showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"
              }
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
        <label
          htmlFor="signup-confirm-password"
          className="block text-sm font-semibold text-[#354239]"
        >
          পাসওয়ার্ড নিশ্চিত করুন
          <span className="relative mt-1.5 block">
            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="আবার লিখুন"
              minLength={8}
              aria-invalid={passwordMismatch}
              aria-describedby={
                passwordMismatch ? "password-mismatch" : undefined
              }
              className={`${formInputClassName} pr-11 ${
                passwordMismatch
                  ? "border-[#d74640] focus:border-[#d74640] focus:ring-[#d74640]/10"
                  : ""
              }`}
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setPasswordMismatch(false);
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((visible) => !visible)}
              aria-label={
                showConfirmPassword
                  ? "নিশ্চিতকরণ পাসওয়ার্ড লুকান"
                  : "নিশ্চিতকরণ পাসওয়ার্ড দেখান"
              }
              className="absolute inset-y-0 right-0 inline-flex w-10 items-center justify-center rounded-r-lg text-[#738077] transition hover:text-[#263229] focus-visible:outline-2 focus-visible:outline-[#078a45]"
            >
              {showConfirmPassword ? (
                <FiEyeOff className="size-4" aria-hidden="true" />
              ) : (
                <FiEye className="size-4" aria-hidden="true" />
              )}
            </button>
          </span>
          {passwordMismatch && (
            <span
              id="password-mismatch"
              role="alert"
              className="mt-1 block text-sm font-normal text-[#c53b35]"
            >
              দুটি পাসওয়ার্ড মিলছে না।
            </span>
          )}
        </label>
      </div>

      <Button
        type="submit"
        isDisabled={isLoading}
        className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-[#078a45] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06763b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
      >
        {isLoading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
      </Button>

      <SocialAuthOptions
        providers={socialProviders}
        errorCallbackURL="/signup?oauth_error=1"
        oauthError={oauthError}
      />

      <p className="mt-3 text-center text-sm text-[#667269]">
        অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/signin"
          className="font-semibold text-[#078a45] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </form>
  );
}
