function truncateAddress(
  address: string | undefined,
  startLength: number = 6,
  endLength: number = 4
): string {
  if (!address) return "";
  return `${address.substring(0, startLength)}...${address.substring(
    address.length - endLength
  )}`;
}

function calculateSDaiNeeded(paymentAmount: number, paymentDate: Date, currentDSR: number): number {
  // Get the current date
  const currentDate = new Date();
  
  // Calculate the number of days until the payment date
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const daysUntilPayment = Math.round(Math.abs((+currentDate - +paymentDate) / oneDay));
  
  // Calculate the amount of sDai needed
  const sDaiNeeded = paymentAmount / (1 + ((currentDSR * daysUntilPayment) / 365));

  return sDaiNeeded;
}


export {truncateAddress, calculateSDaiNeeded};