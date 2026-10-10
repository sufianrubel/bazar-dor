import AuthPageLayout from "@/components/auth/AuthPageLayout";
import SignUpForm from "@/components/auth/SignUpForm";
import { accountPageContent } from "@/data/page-content";

export default function SignupPage() {
  return (
    <AuthPageLayout
      activePage="signup"
      {...accountPageContent.signup}
    >
      <SignUpForm />
    </AuthPageLayout>
  );
}
