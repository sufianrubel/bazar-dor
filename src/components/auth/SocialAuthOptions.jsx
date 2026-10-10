"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { actionMessages } from "@/data/action-messages";
import { socialAuthProviders } from "@/constants/social-auth-providers";
import { authClient } from "@/lib/auth-client";

const providerIcons = {
  google: FcGoogle,
  github: FaGithub,
};

export default function SocialAuthOptions({ providers, callbackURL = "/" }) {
  const [pendingProvider, setPendingProvider] = useState(null);
  const availableProviders = socialAuthProviders.filter((provider) =>
    providers.includes(provider.id),
  );

  if (availableProviders.length === 0) return null;

  async function handleSocialSignIn(provider) {
    setPendingProvider(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL,
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
        {availableProviders.map((provider) => {
          const Icon = providerIcons[provider.icon];

          return (
            <Button
              key={provider.id}
              type="button"
              variant="outline"
              isDisabled={pendingProvider !== null}
              onPress={() => handleSocialSignIn(provider.id)}
              className="inline-flex min-h-9 min-w-0 items-center justify-center gap-2 whitespace-normal rounded-lg border border-[#dfe8e1] bg-white px-3 text-sm font-medium leading-tight text-[#465249] transition hover:border-[#c7d8cb] hover:bg-[#f8faf8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
            >
              <Icon className="size-4" aria-hidden="true" />
              {provider.label}
            </Button>
          );
        })}
      </div>
    </>
  );
}
