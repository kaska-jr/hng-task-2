import { createContext, useState } from "react";
import usePersistedState from "../hooks/usePersistedState";
import { nanoid } from "nanoid";

const defaultValue = {
  ticketId: nanoid(),
  ticketType: 0,
  ticketNumber: "",
  profileImage: "",
  originalFileName: "",
  fileExt: "",
  email: "",
  name: "",
  specialRequest: "",
};

const TicketDetailsContext = createContext(defaultValue);

export const TicketDetailsContextProvider = ({ children }) => {
  const [ticketDetails, setTicketDetails] = usePersistedState({
    key: "ticketDetails",
    defaultValue,
  });

  const defaultArray = [];
  const [ticketHolderList, setTicketHolderList] = usePersistedState({
    key: "ticket-holders",
    defaultArray,
  });

  return (
    <TicketDetailsContext.Provider
      value={{
        ticketDetails,
        setTicketDetails,
        setTicketHolderList,
        ticketHolderList,
      }}
    >
      {children}
    </TicketDetailsContext.Provider>
  );
};

export default TicketDetailsContext;
