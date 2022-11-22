export function dateInFuture(daysForward: number) {
  const d = new Date();

  d.setDate(d.getDate() + daysForward);

  const yyyy = "" + d.getFullYear();
  let mm = "" + (d.getMonth() + 1);
  let dd = "" + d.getDate();

  if (mm.length < 2) {
    mm = "0" + mm;
  }
  if (dd.length < 2) {
    dd = "0" + dd;
  }

  return [yyyy, mm, dd].join("-");
}