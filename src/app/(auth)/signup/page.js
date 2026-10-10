import AuthPageLayout from "@/components/auth/AuthPageLayout";
import SignUpForm from "@/components/auth/SignUpForm";
import { accountPageContent } from "@/data/page-content";
import { enabledSocialProviders } from "@/lib/auth";

export default async function SignupPage({ searchParams }) {
  const query = await searchParams;

  return (
    <AuthPageLayout
      activePage="signup"
      {...accountPageContent.signup}
    >
      <SignUpForm
        socialProviders={enabledSocialProviders}
        oauthError={query?.oauth_error === "1"}
      />
    </AuthPageLayout>
  );
}
