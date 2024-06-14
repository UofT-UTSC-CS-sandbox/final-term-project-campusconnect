import { useEffect } from 'react';
import './App.css';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import axios from 'axios'; // Import axios library

function App() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      const clerkId = user.id;
      const email = String(user.primaryEmailAddress);
      const name = user.fullName;
      axios.post(`http://localhost:3001/login`, { email })
        .then(response => {
          if (response.data === "not found") {
            console.log(clerkId)
            axios.post(`http://localhost:3001/register`, { clerkId, email, name })
              .then(response => {
                console.log(response.data);
              })
          }
        })
    }
  }, [isSignedIn, user]);

  return (
    <>
        <SignedOut>
          <h1>Welcome to ULearn!</h1>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <h1>Hello {user.firstName}! Welcome to your ULearn HomePage!</h1>
          <UserButton />
        </SignedIn>
    </>
  );
}

export default App;
