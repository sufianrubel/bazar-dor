import AuthPageLayout from "@/components/auth/auth-page-layout";
import SignupForm from "./signup-form";

export default function SignupPage() {
  return (
    <AuthPageLayout
      activePage="signup"
      title="অ্যাকাউন্ট তৈরি করুন"
      description="বিনা খরচে সাইন আপ করে সব বাজারদর একসাথে দেখুন।"
    >
      <SignupForm />
    </AuthPageLayout>
  );
}
