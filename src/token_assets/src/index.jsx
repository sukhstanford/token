import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from '../../../node_modules/@dfinity/auth-client';

const init = async () => { 
    
  
  const authClient = await AuthClient.create();
 
  if (await authClient.isAuthenticated()) {
    //console.log("logged in");
    handleAuthentication(authClient);
  }else{
      await authClient.login({
    identityProvider: "https://identity.ic0.app/#authorize",
    onSuccess : ()=> {
      handleAuthentication(authClient);
    }
  });
  }
};

async function handleAuthentication(authClient) {
  //console.log(authClient.getIdentity())
  const identity = await authClient.getIdentity();
  const userPrincipal = identity._principal.toString();
  console.log(userPrincipal);
  ReactDOM.render(<App loggedInPrincipal={userPrincipal} />, document.getElementById("root"));
}
init();




