import Image from "next/image";
import { Link as HeroUILink } from "@heroui/react";
import { homePageContent } from "@/data/page-content";
import { formatCurrentDate } from "@/lib/format-date";

export default function HomeHero() {
  const { hero } = homePageContent;

  return (
    <section className="relative flex min-h-60 items-start justify-between overflow-hidden rounded-[22px] border border-[#e0e9e1] bg-white/75 px-5 py-2 sm:px-8 lg:px-10">
      <div className="relative z-10 max-w-2xl">
        <span className="inline-flex rounded-full bg-[#e6f4e9] px-3 py-0.5 text-sm font-semibold text-[#078a45]">
          {formatCurrentDate()}
        </span>
        <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#202b23] sm:text-3xl lg:text-4xl">
          {hero.title}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#6d7970] sm:text-base">
          {hero.description}
        </p>
        <HeroUILink
          href="#all-products"
          className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#078a45] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#06763b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
        >
          {hero.action}
        </HeroUILink>
      </div>
      <Image
        src="/bazar-hero.png"
        alt={hero.imageAlt}
        width={260}
        height={200}
        priority
        className="relative mt-4 h-auto w-28 self-end object-contain sm:absolute sm:bottom-3 sm:right-4 sm:mt-0 sm:w-40 sm:self-auto md:right-8 md:w-48 lg:right-12 lg:w-56"
      />
    </section>
  );
}
