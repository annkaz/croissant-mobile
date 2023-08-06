export function truncateAddress(
  address: string | undefined,
  startLength: number = 6,
  endLength: number = 4
): string {
  if (!address) return "";
  return `${address.substring(0, startLength)}...${address.substring(
    address.length - endLength
  )}`;
}

export function calculateSDaiNeeded(
  paymentAmount: number,
  paymentDate: Date,
  currentDSR: number
): number {
  const annualInterestRate = currentDSR / 100;
  const currentDate = new Date();
  const differenceInTime = paymentDate.getTime() - currentDate.getTime();
  const differenceInYears = differenceInTime / (1000 * 3600 * 24 * 365.25);

  const sDaiNeeded =
    paymentAmount / Math.pow(1 + annualInterestRate, differenceInYears);

  return parseFloat(sDaiNeeded.toFixed(4));
}
