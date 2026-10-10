"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { actionMessages } from "@/data/action-messages";
import { authClient } from "@/lib/auth-client";

export default function ProfileUpdateForm({ initialName }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const normalizedName = name.trim();

    if (normalizedName.length < 2 || normalizedName.length > 100) {
      const message = actionMessages.profileNameInvalid;
      setValidationError(message);
      toast.error(message);
      return;
    }

    setValidationError("");
    setIsSaving(true);

    try {
      const { error } = await authClient.updateUser({ name: normalizedName });

      if (error) {
        console.error("Profile name update rejected:", error.message);
        toast.error(actionMessages.profileUpdateFailed);
        return;
      }

      toast.success(actionMessages.profileUpdateSuccess);
      router.refresh();
    } catch (error) {
      console.error(
        "Profile name update failed:",
        error instanceof Error ? error.message : "Unknown error.",
      );
      toast.error(actionMessages.profileUpdateFailed);
    } finally {
      setIsSaving(false);
    }
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
          minLength={2}
          maxLength={100}
          aria-invalid={Boolean(validationError)}
          aria-describedby={validationError ? "profile-name-error" : undefined}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setValidationError("");
          }}
          className={`mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm text-[#28342b] outline-none transition placeholder:text-[#8a958d] hover:border-[#c7d8cb] focus:ring-4 ${
            validationError
              ? "border-[#d74640] focus:border-[#d74640] focus:ring-[#d74640]/10"
              : "border-[#dfe8e1] focus:border-[#078a45] focus:ring-[#078a45]/10"
          }`}
          required
        />
        {validationError && (
          <span
            id="profile-name-error"
            role="alert"
            className="mt-1 block text-sm font-normal text-[#c53b35]"
          >
            {validationError}
          </span>
        )}
      </label>
      <Button
        type="submit"
        isDisabled={isSaving}
        className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-[#078a45] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06763b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
      >
        {isSaving ? "অপেক্ষা করুন..." : "আপডেট"}
      </Button>
    </form>
  );
}
