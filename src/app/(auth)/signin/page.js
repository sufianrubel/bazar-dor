import AuthPageLayout from "@/components/auth/AuthPageLayout";
import SignInForm from "@/components/auth/SignInForm";
import { accountPageContent } from "@/data/page-content";

export default function SigninPage() {
  return (
    <AuthPageLayout
      activePage="signin"
      {...accountPageContent.signin}
    >
      <SignInForm />
    </AuthPageLayout>
  );
}
