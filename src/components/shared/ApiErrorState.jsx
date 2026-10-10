export default function ApiErrorState() {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-[#f0d4d1] bg-white/80 px-5 py-10 text-center"
    >
      <p className="font-semibold text-[#9d3833]">তথ্য লোড করা যায়নি</p>
      <p className="mt-1 text-sm text-[#748077]">
        কিছুক্ষণ পর আবার চেষ্টা করুন।
      </p>
    </div>
  );
}
