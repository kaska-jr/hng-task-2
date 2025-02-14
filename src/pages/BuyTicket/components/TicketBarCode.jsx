import JsBarcode from "jsbarcode";
import React, { useEffect, useRef } from "react";

const TicketBarcode = ({ ticketId }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, ticketId || "123456789012", {
        format: "CODE128",
        displayValue: true,
        fontOptions: "bold",
        textMargin: 5,
        width: 2,
        height: 80,
        background: "transparent", // Make background transparent
        lineColor: "#fff",
      });
    }
  }, [ticketId]);

  return (
    <div className="ticket-barcode">
      <svg ref={barcodeRef} className="bar-code"></svg>
    </div>
  );
};

export default TicketBarcode;
