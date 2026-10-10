"use client";

import toast from "react-hot-toast";
import { actionMessages } from "@/data/action-messages";
import { authClient } from "@/lib/auth-client";

export async function signOutUser(router) {
  try {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Sign-out rejected:", error.message);
      toast.error(actionMessages.signOutFailed);
      return;
    }

    toast.success(actionMessages.signOutSuccess);
    router.replace("/");
    router.refresh();
  } catch (error) {
    console.error(
      "Sign-out request failed:",
      error instanceof Error ? error.message : "Unknown error.",
    );
    toast.error(actionMessages.signOutFailed);
  }
}
