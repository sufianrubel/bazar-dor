import AuthPageLayout from "@/components/auth/AuthPageLayout";
import ProfileSummary from "@/components/profile/ProfileSummary";
import ProfileUpdateForm from "@/components/profile/ProfileUpdateForm";
import { accountPageContent } from "@/data/page-content";

export default function ProfilePage() {
  return (
    <AuthPageLayout
      activePage="profile"
      {...accountPageContent.profile}
    >
      <div className="mt-5 flex w-full flex-col items-center gap-4 sm:mt-6 sm:gap-5">
        <ProfileSummary />
        <ProfileUpdateForm />
      </div>
    </AuthPageLayout>
  );
}
