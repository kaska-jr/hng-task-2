import React, { useContext } from "react";
import Steps from "../../../components/Steps";
import TicketSelection from "./TicketSelection";
import AttendeeDetails from "./AttendeeDetails";
import Ready from "./Ready";
import StageContext from "../../../context/StageContext";

const TicketContainer = () => {
  const { stage } = useContext(StageContext);
  return (
    <section className="ticket-container">
      <Steps />
      {stage === 0 && <TicketSelection />}
      {stage === 1 && <AttendeeDetails />}
      {stage === 2 && <Ready />}
    </section>
  );
};

export default TicketContainer;
