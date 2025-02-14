import React, { useContext } from "react";
import StageContext from "../context/StageContext";

const Steps = () => {
  const { stage } = useContext(StageContext);
  const stages = ["Ticket Selection", "Attendee Details", "Ready"];
  return (
    <article className="steps-wrapper">
      <div className="steps-header">
        <h1>{stages[stage]}</h1>
        <div className="steps-counts">
          <span>Step</span>
          <div>
            <span>{stage + 1}</span> / <span>3</span>
          </div>
        </div>
      </div>
      <div className="steps-stages">
        <div className={`step-1 step ${stage >= 0 ? "step-reached" : ""}`} />
        <div className={`step-2 step ${stage > 0 ? "step-reached" : ""}`} />
        <div className={`step-3 step ${stage === 2 ? "step-reached" : ""}`} />
      </div>
    </article>
  );
};

export default Steps;
