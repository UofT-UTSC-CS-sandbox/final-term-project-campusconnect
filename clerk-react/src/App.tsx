import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import UploadPage from './UploadPage';


function App() {
  const { user } = useUser();


  return (
    <Router>
      <header>
        <SignedOut>
          <h1>Welcome to your ulearn app!</h1>
          <SignInButton />
        </SignedOut>
        <SignedIn>
        <div className="user-button-wrapper">
              <UserButton />
            </div>
          <h1>Welcome to your ulearn app {user?.firstName}!</h1>
          <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/upload">Upload</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route 
          path="/" 
          element={
            <div>
              <h1>Ulearn</h1>
              <SignedIn>
                <Link to="/upload">
                  <button>Go to Upload Page</button>
                </Link>
              </SignedIn>
            </div>
          } 
        />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
        </SignedIn>
      </header>
      
    </Router>
  );
}

export default App;
