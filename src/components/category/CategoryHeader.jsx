export default function CategoryHeader({ category, productCount }) {
  return (
    <section
      aria-labelledby="category-title"
      className="flex min-h-20 items-center gap-3 rounded-2xl border border-[#e1e9e2] bg-white/75 px-4 py-4 sm:min-h-[82px] sm:px-5"
    >
      <span
        aria-hidden="true"
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f0f5f1] text-2xl"
      >
        {category.emoji}
      </span>
      <div>
        <h1
          id="category-title"
          className="text-xl font-extrabold leading-6 text-[#202b23]"
        >
          {category.name}
        </h1>
        <p className="mt-0.5 text-sm text-[#748077]">
          {productCount.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
        </p>
      </div>
    </section>
  );
}
