import { formatPrice } from "@/lib/format-price";

const toneClasses = {
  green: "text-[#078a45]",
  red: "text-[#df4942]",
};

export default function PriceSummary({ label, price, tone }) {
  return (
    <div className="min-h-16 rounded-xl border border-[#e5ece6] bg-[#fbfcfb] px-3 py-2">
      <p className="text-sm leading-5 text-[#657168]">{label}</p>
      <p className={`text-base font-bold leading-5 ${toneClasses[tone]}`}>
        {price === null ? "তথ্য নেই" : `${formatPrice(price)} টাকা`}
      </p>
    </div>
  );
}
