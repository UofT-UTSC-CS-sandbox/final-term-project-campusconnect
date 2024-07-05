import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { SignedOut, useUser,RedirectToSignIn } from "@clerk/clerk-react";
import axios from 'axios';

function App() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn && user) {
      const clerkId = user.id;
      const email = String(user.primaryEmailAddress);
      const name = user.fullName;
  
      axios.post(`http://localhost:3001/login`, { email })
        .then(response => {
          if (response.data === "not found") {
            console.log(clerkId);
            axios.post(`http://localhost:3001/register`, { clerkId, email, name })
              .then(response => {
                console.log(response.data);
                navigate("/personalInfo");
              });
          } else {
            console.log(response.data)
            if (response.data.finishedSignUp) {
              navigate("/homePage")
            } else {
              navigate("/personalInfo")
            }
          }
        });
    }
  }, [isSignedIn, user]);
  return (
    <div>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}

export default App;