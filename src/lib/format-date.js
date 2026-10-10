const bengaliDateFormatter = new Intl.DateTimeFormat("bn-BD", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
});

export function formatCurrentDate(date = new Date()) {
  return bengaliDateFormatter.format(date);
}
