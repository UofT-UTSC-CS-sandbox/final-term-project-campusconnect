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
      const image = user.imageUrl;

      //const profileImageUrl = user.profileImageUrl;
      //alert(profileImageUrl);
      //alert(user.language);
      if (!user.hasImage) {
        // alert 
        axios.post(`http://localhost:3001/login`, { email })
        .then(response => {
           if (response.data === "found") {
            console.log("User already exists");
            axios.post(`http://localhost:3001/register`, { image })
              .then(response => {
                console.log(response.data);
              });

          }
        });

        //alert('Please upload a profile picture before proceeding.');
        // You can also redirect the user to a profile page or prevent further actions here if necessary
        //return;
      }
    
      axios.post(`http://localhost:3001/login`, { email })
        .then(response => {
          if (response.data === "not found" ) {
            console.log(clerkId);
            axios.post(`http://localhost:3001/register`, { clerkId, email, name, image })
              .then(response => {
                console.log(response.data);
              });
          } 
        });
    }


  }, [isSignedIn, user]);

  function activateLasers() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageData = reader.result;
          user.setProfileImage({
            file: imageData
          })
            .then(() => {
              console.log('Profile picture uploaded successfully');
            })
            .catch((error) => {
              console.error('Failed to upload profile picture:', error);
            });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();

      axios.post(`http://localhost:3001/login`, { email }).then(response => {
         if (response.data === "found") {
          console.log("User already exists");
          axios.post(`http://localhost:3001/register`, { image })
            .then(response => {
              console.log(response.data);
            });

        }
      });

      //alert('Please upload a profile picture before proceeding.');
      // You can also redirect the user to a profile page or prevent further actions here if necessary
      //return;
    
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
           Upload Profile Picture</button>
          </SignedIn>
      </header>
      <h1>Ulearn</h1>
    </>
  );
}

export default App;
