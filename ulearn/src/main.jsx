import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import PersonalInfoPage from './Pages/PersonalInfo/PersonalInfoPage.jsx'
import WhoAreYouPage from './Pages/WhoAreYou/whoAreYouPage.jsx'
import App from './Pages/App.jsx'
import TutorPage from './Pages/TutorInfo/tutorInfoPage.jsx'
import HomePage from './Pages/Home/homepage.jsx'
import { StreamCallProvider } from '@stream-io/video-react-sdk'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <StreamCallProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/personalInfo" element={<PersonalInfoPage />} />
            <Route path="/whoAreYou" element={<WhoAreYouPage />} />
            <Route path="/tutorInfo" element={<TutorPage />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/meeting/:id" element={<Meeting />} />
          </Routes>
        </BrowserRouter>
      </StreamCallProvider>
    </ClerkProvider>
  </React.StrictMode>,
)