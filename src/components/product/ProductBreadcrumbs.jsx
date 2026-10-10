import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export default function ProductBreadcrumbs({ category, productName }) {
  return (
    <nav
      aria-label="ব্রেডক্রাম্ব"
      className="flex min-h-5 items-center gap-1.5 overflow-hidden text-sm text-[#6f7b72]"
    >
      <Link
        href="/"
        className="shrink-0 rounded-sm hover:text-[#078a45] focus-visible:outline-2 focus-visible:outline-[#078a45]"
      >
        হোম
      </Link>
      <FiChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
      {category && (
        <>
          <Link
            href={`/category/${category.slug}`}
            className="shrink-0 rounded-sm hover:text-[#078a45] focus-visible:outline-2 focus-visible:outline-[#078a45]"
          >
            {category.name}
          </Link>
          <FiChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
        </>
      )}
      <span
        className="truncate font-medium text-[#344138]"
        aria-current="page"
      >
        {productName}
      </span>
    </nav>
  );
}
