import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AuthPageLayout from "@/components/auth/AuthPageLayout";
import ProfileSummary from "@/components/profile/ProfileSummary";
import ProfileUpdateForm from "@/components/profile/ProfileUpdateForm";
import { accountPageContent } from "@/data/page-content";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/signin");

  return (
    <AuthPageLayout
      activePage="profile"
      {...accountPageContent.profile}
    >
      <div className="mt-5 flex w-full flex-col items-center gap-4 sm:mt-6 sm:gap-5">
        <ProfileSummary user={session.user} />
      </div>
    </AuthPageLayout>
  );
}
