import React, { useState } from "react";
import { token, cainsterId, createActor } from "../../../declarations/token";
import { AuthClient } from "../../../../node_modules/@dfinity/auth-client";
import { canisterId } from "../../../declarations/token/index";
function Faucet(props) {
   const [buttonText, setbuttonText]=useState("Gimme gimme");
  const [isDisabled, setDisable] = useState(false);
  
  async function handleClick(event) {
    setDisable(true);
  
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
  
    const authenticatedcanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
  
  
    const result =  await authenticatedcanister.payOut(); 
   setbuttonText(result);
   // setDisable(false);
  };

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free SS tokens here! Claim 10,000 DANG coins to  {props.userPrincipal} id.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
