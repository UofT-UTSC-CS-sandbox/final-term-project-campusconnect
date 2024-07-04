import React from 'react'
import ReactDOM from 'react-dom/client'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import PersonalInfoPage from './Pages/PersonalInfo/PersonalInfoPage.jsx'
import WhoAreYouPage from './Pages/WhoAreYou/whoAreYouPage.jsx'
import App from './Pages/App.jsx'
import TutorPage from './Pages/TutorInfo/tutorInfoPage.jsx'
import HomePage from './Pages/Home/homepage.jsx'
import ChatRoom from './Pages/Chatrooms/chatroom.jsx'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/personalInfo" element={<PersonalInfoPage/>} />
        <Route path="/whoAreYou" element={<WhoAreYouPage/>} />
        <Route path="/tutorInfo" element={<TutorPage />}/>
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/chatRoom" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>,
)