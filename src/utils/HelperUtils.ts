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
  const currentDate = new Date();

  const oneDay = 24 * 60 * 60 * 1000;
  const daysUntilPayment = Math.round(
    Math.abs((currentDate.getTime() - paymentDate.getTime()) / oneDay)
  );

  const sDaiNeeded =
    paymentAmount / (1 + (currentDSR * daysUntilPayment) / 365);

  return sDaiNeeded;
}
