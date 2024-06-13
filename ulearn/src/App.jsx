import { useEffect } from 'react';
import './App.css';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import axios from 'axios'; // Import axios library
import TutorPage from './components/tutorpage';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      const clerkId = user.id;
      const email = String(user.primaryEmailAddress);
      const name = user.fullName;
      axios.post(`http://localhost:3001/login`, { clerkId })
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
      {/* <ClerkProvider publishableKey={clerkPublishableKey} appearance={appearance}> */}
      <header>
        <SignedOut>
          <h1>Welcome to your ulearnrnrnrnrn app!</h1>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <h1>Welcome to your alsdhladhakshd app!</h1>
          <UserButton />
        </SignedIn>
      </header>
      {/* </ClerkProvider> */}
      <h1>Ulearn</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/tutorsignup' exact={true} element={<TutorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
