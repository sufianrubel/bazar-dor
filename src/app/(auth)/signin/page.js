import AuthPageLayout from "@/components/auth/AuthPageLayout";
import SignInForm from "@/components/auth/SignInForm";
import { accountPageContent } from "@/data/page-content";
import { enabledSocialProviders } from "@/lib/auth";

export default async function SigninPage({ searchParams }) {
  const query = await searchParams;
  const requestedRedirect = query?.next;
  const redirectTo =
    typeof requestedRedirect === "string" &&
    /^\/product\/[a-z0-9-]+$/i.test(requestedRedirect)
      ? requestedRedirect
      : "/";

  return (
    <AuthPageLayout
      activePage="signin"
      {...accountPageContent.signin}
    >
      <SignInForm
        socialProviders={enabledSocialProviders}
        redirectTo={redirectTo}
        redirectedFromProduct={query?.redirected === "product"}
      />
    </AuthPageLayout>
  );
}
