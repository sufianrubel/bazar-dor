import AuthPageLayout from "@/components/auth/auth-page-layout";
import SigninForm from "./signin-form";

export default function SigninPage() {
  return (
    <AuthPageLayout
      activePage="signin"
      title="সাইন ইন"
      description="আপনার বাজারদর ও প্রোফাইল দেখতে অ্যাকাউন্টে প্রবেশ করুন।"
    >
      <SigninForm />
    </AuthPageLayout>
  );
}
