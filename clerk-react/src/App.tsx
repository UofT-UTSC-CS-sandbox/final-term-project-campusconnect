import './App.css';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const clerkPublishableKey = 'YOUR_CLERK_PUBLISHABLE_KEY';

const appearance = {
    elements: {
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        },
        button: {
            backgroundColor: '#007bff',
            color: '#fff',
            hoverBackgroundColor: '#0056b3',
        },
    },
};

function App() {
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
    </>
  );
}

export default App;
