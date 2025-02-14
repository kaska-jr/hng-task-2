export const getTicketType = (ticketType) => {
  switch (ticketType) {
    case 0:
      return "Free";
    case 1:
      return "VIP";
    case 2:
      return "VVIP";
    default:
      return "Free";
  }
};
