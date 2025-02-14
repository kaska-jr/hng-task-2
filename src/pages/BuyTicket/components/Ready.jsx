import React, { useContext, useRef } from "react";
import Button from "../../../components/shared/ui/Button";
import Separator from "../../../components/shared/ui/Separator";
import StageContext from "../../../context/StageContext";
import TicketDetailsContext from "../../../context/DetailsContext";
import { getTicketType } from "../../../lib/helper";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TicketBarcode from "./TicketBarCode";
import { nanoid } from "nanoid";

const Ready = () => {
  const { setStage } = useContext(StageContext);
  const { ticketDetails, setTicketDetails } = useContext(TicketDetailsContext);

  const ticket = useRef(null);

  const handleDownloadTicket = async () => {
    const inputData = ticket.current;
    try {
      const canvas = await html2canvas(inputData, {
        scale: 2, // Increases the resolution
        useCORS: true, // Ensures that external resources are handled properly
        logging: false, // Disables console logs from html2canvas
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height, "", "FAST");
      pdf.save("ticket.pdf");
    } catch (error) {
      console.error("Error downloading ticket:", error);
    }
  };

  return (
    <article className="ticket-ready">
      <div className="ticket-ready-header">
        <h1>Your Ticket is Booked!</h1>
        <p>
          Check your email for a copy or you can <span>download</span>
        </p>
      </div>

      <div className="ticket-ready-body" ref={ticket} aria-live="polite">
        <div className="ticket-ready-header">
          <div className="ticket-ready-about">
            <h1>Techember Fest ”25</h1>
            <p>📍 04 Rumens road, Ikoyi, Lagos </p>
            <p>📅 March 15, 2025 | 7:00 PM</p>
            <figure className="ticket-ready-profile">
              <img
                src={ticketDetails.profileImage || "/Userimg.png"}
                alt={ticketDetails.name || ticketDetails.email}
              />
            </figure>

            <div className="ticket-ready-description">
              <div className="ticket-ready-details">
                <div className="ticket-ready-detail">
                  <h2>Enter your name</h2>
                  <h1>{ticketDetails.name || "N/A"}</h1>
                </div>
                <div className="ticket-ready-detail">
                  <h2>Enter your email*</h2>
                  <h1>{ticketDetails.email}</h1>
                </div>
                <div className="ticket-ready-detail">
                  <h2>Ticket Type:</h2>
                  <h1>{getTicketType(ticketDetails.ticketType)}</h1>
                </div>
                <div className="ticket-ready-detail">
                  <h2>Ticket for:</h2>
                  <h1>{ticketDetails.ticketNumber}</h1>
                </div>
                <div className="ticket-ready-detail">
                  <h2>Special request?</h2>
                  <h1>
                    {ticketDetails.specialRequest
                      ? ticketDetails.specialRequest
                      : "N/A"}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <figure className="ticket-ready-bar">
          <TicketBarcode ticketId={ticketDetails.ticketId} />
        </figure>
      </div>

      <div className="button-wrapper">
        <Button
          aria-label="Book another ticket"
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
            setStage(0);
          }}
        >
          Book Another Ticket
        </Button>
        <Button
          aria-label="Download your ticket"
          onClick={(e) => {
            e.stopPropagation();
            handleDownloadTicket();
          }}
        >
          Download Ticket
        </Button>
      </div>
    </article>
  );
};

export default Ready;
