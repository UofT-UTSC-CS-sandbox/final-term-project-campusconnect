import { useEffect } from 'react';
import './App.css';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import axios from 'axios';

function App() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      const clerkId = user.id;
      const email = String(user.primaryEmailAddress);
      const name = user.fullName;

      //const profileImageUrl = user.profileImageUrl;
      //alert(profileImageUrl);
      //alert(user.language);
      if (!user.hasImage) {
        //alert('Please upload a profile picture before proceeding.');
        // You can also redirect the user to a profile page or prevent further actions here if necessary
        //return;
      }
    
      axios.post(`http://localhost:3001/login`, { email })
        .then(response => {
          if (response.data === "not found") {
            console.log(clerkId);
            axios.post(`http://localhost:3001/register`, { clerkId, email, name })
              .then(response => {
                console.log(response.data);
              });
          }
        });
    }


  }, [isSignedIn, user]);

  function activateLasers() {
    user?.setProfileImage({
      file: './image.webp', // Relative path to the image file in the same directory
    });
  }
  

  return (
    <>
      <header>
        <SignedOut>
          <h1>Welcome to your ulearn app!</h1>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <h1>Welcome to your ulearn app!</h1>
          
          <UserButton />
        
          <button onClick={activateLasers}>
           Activate Lasers
            </button>
          </SignedIn>
      </header>
      <h1>Ulearn</h1>
    </>
  );
}

export default App;
