import { Route, Routes } from "react-router";
import TicketContainer from "./pages/BuyTicket/components/TicketContainer";
import { TicketDetailsContextProvider } from "./context/DetailsContext";
import { StageContextProvider } from "./context/StageContext";
import "react-toastify/dist/ReactToastify.css";
import AppRoute from "./routes";

function App() {
  return (
    <StageContextProvider>
      <TicketDetailsContextProvider>
        <AppRoute />
      </TicketDetailsContextProvider>
    </StageContextProvider>
  );
}

export default App;
