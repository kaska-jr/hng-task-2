import React, { useContext } from "react";
import Button from "../../components/shared/ui/Button";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="home">
      <div className="ticket-event-about">
        <h1>Techember Fest ”25</h1>
        <h2>
          🎉 Join us for an unforgettable experience at Techember Fest! Secure
          your spot now. 🎉
        </h2>
        <p>📍 04 Rumens road, Ikoyi, Lagos | | March 15, 2025 | 7:00 PM </p>

        <div>
          <p>Total Seats: 60</p>
        </div>
      </div>

      <Link to="/buy-ticket">
        <div className="button-wrapper">
          <Button>Book your Ticket</Button>
        </div>
      </Link>
    </div>
  );
};

export default Home;
