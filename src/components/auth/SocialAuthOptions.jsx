"use client";

import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { actionMessages } from "@/data/action-messages";
import { socialAuthProviders } from "@/constants/social-auth-providers";
import { authClient } from "@/lib/auth-client";

const providerIcons = { google: FcGoogle, github: FaGithub };

export default function SocialAuthOptions({
  providers = [],
  callbackURL = "/",
  errorCallbackURL = "/signin?oauth_error=1",
  oauthError = false,
}) {
  const [pendingProvider, setPendingProvider] = useState(null);

  useEffect(() => {
    if (!oauthError) return;

    toast.error(actionMessages.socialAuthFailed);
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete("oauth_error");
    window.history.replaceState(
      window.history.state,
      "",
      `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`,
    );
  }, [oauthError]);

  async function handleSocialSignIn(provider) {
    if (!providers.includes(provider)) {
      toast.error(actionMessages.socialAuthNotConfigured);
      return;
    }

    setPendingProvider(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL,
        newUserCallbackURL: callbackURL,
        errorCallbackURL,
      });

      if (error) {
        console.error("Social sign-in rejected:", error.message);
        toast.error(actionMessages.socialAuthFailed);
      }
    } catch (error) {
      console.error(
        "Social sign-in request failed:",
        error instanceof Error ? error.message : "Unknown error.",
      );
      toast.error(actionMessages.socialAuthFailed);
    } finally {
      setPendingProvider(null);
    }
  }

  return (
    <>
      <div className="my-3 flex items-center gap-3 text-sm text-[#7c877f]">
        <span className="h-px flex-1 bg-[#e0e8e1]" />
        অথবা
        <span className="h-px flex-1 bg-[#e0e8e1]" />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {socialAuthProviders.map((provider) => {
          const Icon = providerIcons[provider.icon];
          const isConfigured = providers.includes(provider.id);
          const isPending = pendingProvider === provider.id;

          return (
            <Button
              key={provider.id}
              type="button"
              variant="outline"
              isDisabled={pendingProvider !== null || !isConfigured}
              aria-describedby={!isConfigured ? "social-auth-setup" : undefined}
              onPress={() => handleSocialSignIn(provider.id)}
              className="inline-flex min-h-11 min-w-0 items-center justify-center gap-2 whitespace-normal rounded-lg border border-[#dfe8e1] bg-white px-3 text-sm font-semibold leading-tight text-[#354239] shadow-sm transition hover:border-[#b9cfbf] hover:bg-[#f8faf8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? (
                <span
                  aria-hidden="true"
                  className="size-4 animate-spin rounded-full border-2 border-[#078a45]/25 border-t-[#078a45]"
                />
              ) : (
                <Icon className="size-4 shrink-0" aria-hidden="true" />
              )}
              {provider.label}
            </Button>
          );
        })}
      </div>
      {providers.length < socialAuthProviders.length && (
        <p
          id="social-auth-setup"
          role="status"
          className="mt-2 text-center text-xs text-[#748077]"
        >
          সোশ্যাল সাইন-ইন চালু করতে সার্ভারে OAuth client credentials যোগ করুন।
        </p>
      )}
    </>
  );
}
