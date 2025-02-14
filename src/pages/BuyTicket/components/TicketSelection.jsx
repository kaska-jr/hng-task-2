import React, { useContext } from "react";
import SelectDropDown from "./../../../components/shared/ui/SelectDropdown";
import Button from "./../../../components/shared/ui/Button";
import Separator from "../../../components/shared/ui/Separator";
import StageContext from "../../../context/StageContext";
import TicketDetailsContext from "../../../context/DetailsContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";

const TicketSelection = () => {
  const navigate = useNavigate();
  const { gotoNext } = useContext(StageContext);
  const { ticketDetails, setTicketDetails, ticketHolderList } =
    useContext(TicketDetailsContext);

  const getPeoplecount = () => {
    const validTicketHolderList = Array.isArray(ticketHolderList)
      ? ticketHolderList
      : [];

    const freeTicketCount = validTicketHolderList
      .filter((item) => item.ticketType === 0)
      .reduce((acc, item) => acc + parseInt(item.ticketNumber), 0);

    const vipTicketCount = validTicketHolderList
      .filter((item) => item.ticketType === 1)
      .reduce((acc, item) => acc + parseInt(item.ticketNumber), 0);

    const vvipTicketCount = validTicketHolderList
      .filter((item) => item.ticketType === 2)
      .reduce((acc, item) => acc + parseInt(item.ticketNumber), 0);

    return {
      freeTicketCount: freeTicketCount,
      vipTicketCount: vipTicketCount,
      vvipTicketCount: vvipTicketCount,
    };
  };

  const ticketData = [
    {
      id: 0,
      price: 0,
      subtitle: "Free Access",
      quantity: getPeoplecount().freeTicketCount || 0,
      total: 30,
    },
    {
      id: 1,
      price: 150,
      subtitle: "VIP Access",
      quantity: getPeoplecount().vipTicketCount || 0,
      total: 20,
    },
    {
      id: 2,
      price: 300,
      subtitle: "VVIP Access",
      quantity: getPeoplecount().vvipTicketCount || 0,
      total: 10,
    },
  ];

  const getTicketInfo = () => {
    const freeTickets = ticketData[0];
    const vipTickets = ticketData[1];
    const vvipTickets = ticketData[2];
    return {
      freeTickets: freeTickets,
      vipTickets: vipTickets,
      vvipTickets: vvipTickets,
    };
  };

  const checkForTicketSoldOut = () => {
    //New Ticket details
    const { ticketNumber, ticketType } = ticketDetails;

    // Old Ticket details
    let ticket = null;
    if (ticketType === 0) {
      ticket = getTicketInfo().freeTickets;
    } else if (ticketType === 1) {
      ticket = getTicketInfo().vipTickets;
    } else if (ticketType === 2) {
      ticket = getTicketInfo().vvipTickets;
    }
    const isSoldOut =
      parseInt(ticketNumber) + ticket.quantity > parseInt(ticket.total);
    return { isSoldOut: isSoldOut, ticketName: ticket.subtitle };
  };

  const handleNext = () => {
    const { isSoldOut, ticketName } = checkForTicketSoldOut();
    console.log({ isSoldOut, ticketName });
    if (isSoldOut) {
      toast.error(`${ticketName} ticket is Sold Out.`);
    } else {
      gotoNext();
    }
  };

  return (
    <article className="ticket-selection">
      <div className="ticket-event-about">
        <h1>Techember Fest ”25</h1>
        <h2>
          Join us for an unforgettable experience at <br /> Techember Fest!
          Secure your spot now.
        </h2>
        <p>📍 04 Rumens road, Ikoyi, Lagos | | March 15, 2025 | 7:00 PM </p>
      </div>
      <Separator />
      <div className="ticket-types-wrapper">
        <h3>Select Ticket Type:</h3>
        <div className="ticket-types">
          {ticketData.map((item) => (
            <div
              className={`ticket-type ${
                item.id === ticketDetails.ticketType ? "active-type" : ""
              }`}
              key={item.id}
              onClick={() => {
                setTicketDetails({
                  ...ticketDetails,
                  ticketType: item.id,
                });
              }}
            >
              {item.price == 0 ? <h4>Free</h4> : <h4>${item.price}</h4>}
              <h5>{item.subtitle}</h5>
              <span>
                {item.quantity}/{item.total}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="ticket-select-wrapper">
        <h3>Number of Tickets:</h3>
        <SelectDropDown
          value={ticketDetails.ticketNumber}
          onChange={(value) =>
            setTicketDetails({ ...ticketDetails, ticketNumber: value })
          }
        />
      </div>

      <div className="button-wrapper">
        <Button
          outline={true}
          onClick={() => {
            setTicketDetails({
              ticketType: 0,
              ticketNumber: "",
              profileImage: "",
              originalFileName: "",
              fileExt: "",
              email: "",
              name: "",
              specialRequest: "",
            });
            navigate("/", { replace: true });
          }}
        >
          Cancel
        </Button>

        <Button onClick={handleNext} disabled={!ticketDetails.ticketNumber}>
          Next
        </Button>
      </div>
    </article>
  );
};

export default TicketSelection;
