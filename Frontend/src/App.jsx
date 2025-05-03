import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginRegistram from './pages/LoginRegistram'
import TeamMemberHome from './pages/Member/TeamMemberHome'
import TLDashBoard from './pages/Leader/TLDashBoard'

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRegistram />} />
          <Route path="/teamLeadDashboard" element={<TLDashBoard />} />
          <Route path="/teamMemberHome" element={<TeamMemberHome />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
