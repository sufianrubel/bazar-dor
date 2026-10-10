import AuthPageLayout from "@/components/auth/auth-page-layout";
import ProfileSummary from "./profile-summary";
import ProfileUpdateForm from "./profile-update-form";

export default function ProfilePage() {
  return (
    <AuthPageLayout
      activePage="profile"
      title="আমার প্রোফাইল"
      description="আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।"
    >
      <div className="mt-5 flex w-full flex-col items-center gap-4 sm:mt-6 sm:gap-5">
        <ProfileSummary />
        <ProfileUpdateForm />
      </div>
    </AuthPageLayout>
  );
}
