import React, { useState } from "react";
import { Principal } from '@dfinity/principal';

import {cainsterId, createActor } from "../../../declarations/token";
import { AuthClient } from "../../../../node_modules/@dfinity/auth-client";
import { canisterId } from "../../../declarations/token/index";
function Transfer() {
  
  const [recepientId , setId] =useState("");
  const [amount,setamount] =useState("");
  const [isDisabled,setDisable]=useState(false);
  const [feedback, setfeedback] =useState("");
  const [isHidden, setHidden]= useState(true);
  async function handleClick() {
    setHidden(true);
    const recipient =Principal.fromText(recepientId)
    const amountToTransfer =Number(amount);
    setDisable(true);

    const authClient =await AuthClient.create();
    const identity =await authClient.getIdentity();
    const authenticatedCanister =createActor(cainsterId,{
      agentOptions:{
        identity,
      },
    });
    console.log(authenticatedCanister);
    const result = await authenticatedCanister.transfer(recipient, amountToTransfer);
   setfeedback(result);
   setHidden(false);
    setDisable(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recepientId}
                onChange ={(x) => setId(x.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value = {amount}
                onChange={(e) => setamount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p hidden={isHidden}> {feedback} </p> 
      </div>
    </div>
  );
}

export default Transfer;
