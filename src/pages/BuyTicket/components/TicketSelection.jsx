import React, { useCallback, useContext, useMemo } from "react";
import SelectDropDown from "./../../../components/shared/ui/SelectDropdown";
import Button from "./../../../components/shared/ui/Button";
import Separator from "../../../components/shared/ui/Separator";
import StageContext from "../../../context/StageContext";
import TicketDetailsContext from "../../../context/DetailsContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { nanoid } from "nanoid";

const TicketSelection = () => {
  const navigate = useNavigate();
  const { gotoNext } = useContext(StageContext);
  const { ticketDetails, setTicketDetails, ticketHolderList } =
    useContext(TicketDetailsContext);

  const ticketCounts = useMemo(() => {
    if (!Array.isArray(ticketHolderList)) return { free: 0, vip: 0, vvip: 0 };

    return ticketHolderList.reduce(
      (acc, item) => {
        if (item.ticketType === 0) acc.free += parseInt(item.ticketNumber);
        else if (item.ticketType === 1) acc.vip += parseInt(item.ticketNumber);
        else if (item.ticketType === 2) acc.vvip += parseInt(item.ticketNumber);
        return acc;
      },
      { free: 0, vip: 0, vvip: 0 }
    );
  }, [ticketHolderList]);

  const ticketData = useMemo(
    () => [
      {
        id: 0,
        price: 0,
        subtitle: "Free Access",
        quantity: ticketCounts.free,
        total: 30,
      },
      {
        id: 1,
        price: 150,
        subtitle: "VIP Access",
        quantity: ticketCounts.vip,
        total: 20,
      },
      {
        id: 2,
        price: 300,
        subtitle: "VVIP Access",
        quantity: ticketCounts.vvip,
        total: 10,
      },
    ],
    [ticketCounts]
  );

  const checkForTicketSoldOut = useCallback(() => {
    const { ticketNumber, ticketType } = ticketDetails;
    const ticket = ticketData.find((t) => t.id === ticketType);

    if (!ticket) return { isSoldOut: false, ticketName: "" };

    const isSoldOut = parseInt(ticketNumber) + ticket.quantity > ticket.total;
    return { isSoldOut, ticketName: ticket.subtitle };
  }, [ticketDetails, ticketData]);

  const handleNext = () => {
    const { isSoldOut, ticketName } = checkForTicketSoldOut();
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
              aria-pressed={item.id === ticketDetails.ticketType}
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
              <span aria-live="polite">
                {item.quantity}/{item.total}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="ticket-select-wrapper">
        <h3 id="ticket-label">Number of Tickets:</h3>
        <SelectDropDown
          aria-labelledby="ticket-label"
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
              ticketId: nanoid(),
            });
            navigate("/", { replace: true });
          }}
          role="button"
        >
          Cancel
        </Button>

        <Button
          onClick={handleNext}
          disabled={!ticketDetails.ticketNumber}
          role="button"
        >
          Next
        </Button>
      </div>
    </article>
  );
};

export default TicketSelection;
