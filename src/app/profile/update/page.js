import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import AuthPageLayout from "@/components/auth/AuthPageLayout";
import ProfileUpdateForm from "@/components/profile/ProfileUpdateForm";
import { auth } from "@/lib/auth";

export default async function ProfileUpdatePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/signin");

  return (
    <AuthPageLayout
      activePage="profile"
      title="তথ্য আপডেট"
      description="আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।"
    >
      <div className="mt-5 flex w-full flex-col items-center sm:mt-6">
        <Link
          href="/profile"
          className="mb-3 inline-flex min-h-9 items-center rounded-md px-2 text-sm text-[#6b786f] transition hover:text-[#08743d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
        >
          ← প্রোফাইলে ফিরে যান
        </Link>
        <ProfileUpdateForm initialName={session.user.name} />
      </div>
    </AuthPageLayout>
  );
}
