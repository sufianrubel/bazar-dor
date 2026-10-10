import { formatPrice } from "@/lib/format-price";

export default function MarketPriceTable({ history, productName }) {
  if (history.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-[#d9e4db] px-4 py-8 text-center text-sm text-[#748077]">
        এই পণ্যের বাজারভিত্তিক দাম এখনো পাওয়া যায়নি।
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#e2e9e3]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-left text-sm">
          <caption className="sr-only">
            {productName} এর বাজারভিত্তিক সর্বনিম্ন, সর্বোচ্চ ও গড় দাম
          </caption>
          <thead className="bg-[#fbfcfb] text-[#68756c]">
            <tr>
              <th scope="col" className="px-3 py-2 font-medium sm:px-4">
                বাজার
              </th>
              <th scope="col" className="px-3 py-2 font-medium sm:px-4">
                বিভাগ
              </th>
              <th scope="col" className="px-3 py-2 text-right font-medium sm:px-4">
                সর্বনিম্ন
              </th>
              <th scope="col" className="px-3 py-2 text-right font-medium sm:px-4">
                সর্বোচ্চ
              </th>
              <th scope="col" className="px-3 py-2 text-right font-medium sm:px-4">
                গড়
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((row) => (
              <tr
                key={row.market}
                className="border-t border-[#e3e9e4] odd:bg-white/70 even:bg-[#f0f5f1]/75"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-3 py-1.5 font-medium text-[#344138] sm:px-4"
                >
                  {row.market}
                </th>
                <td className="whitespace-nowrap px-3 py-1.5 text-[#68756c] sm:px-4">
                  {row.division}
                </td>
                <td className="whitespace-nowrap px-3 py-1.5 text-right text-[#344138] sm:px-4">
                  {formatPrice(row.minimum)} টাকা
                </td>
                <td className="whitespace-nowrap px-3 py-1.5 text-right text-[#344138] sm:px-4">
                  {formatPrice(row.maximum)} টাকা
                </td>
                <td className="whitespace-nowrap px-3 py-1.5 text-right font-semibold text-[#263229] sm:px-4">
                  {formatPrice(row.average)} টাকা
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
