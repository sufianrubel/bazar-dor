export default function MainLoading() {
  return (
    <main
      aria-label="পৃষ্ঠার তথ্য লোড হচ্ছে"
      aria-busy="true"
      className="mx-auto w-full max-w-6xl flex-1 space-y-4 px-4 py-6 sm:px-6"
    >
      <div className="h-36 animate-pulse rounded-2xl bg-white/70" />
      <div className="h-8 w-48 animate-pulse rounded-lg bg-white/70" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="h-24 animate-pulse rounded-2xl bg-white/70"
          />
        ))}
      </div>
    </main>
  );
}
