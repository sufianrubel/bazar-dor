import AuthPageLayout from "@/components/auth/AuthPageLayout";
import SignUpForm from "@/components/auth/SignUpForm";
import { accountPageContent } from "@/data/page-content";
import { enabledSocialProviders } from "@/lib/auth";

export default function SignupPage() {
  return (
    <AuthPageLayout
      activePage="signup"
      {...accountPageContent.signup}
    >
      <SignUpForm socialProviders={enabledSocialProviders} />
    </AuthPageLayout>
  );
}
