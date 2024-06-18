export default function pgMoneyToNumber(moneyStr: string | number) {
  if (typeof moneyStr === "number") {
    moneyStr = String(moneyStr);
  }
  const noDots = moneyStr.replace(/[^0-9]/gm, "");
  const integer = noDots.slice(0, -2);
  const decimal = noDots.slice(-2);

  return integer + "." + decimal;
}
