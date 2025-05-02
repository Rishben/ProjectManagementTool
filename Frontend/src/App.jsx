import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import TeamLeaderHome from './pages/Leader/TeamLeaderHome'
import LoginRegistram from './pages/LoginRegistram'
import TeamMemberHome from './pages/Member/TeamMemberHome'
// import TeamLeadDashboard from './pages/Leader/TeamLeadDashboard'
import TLDashBoard from './pages/Leader/TLDashBoard'

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRegistram />} />
          {/* <Route path="/teamLeaderHome" element={<TeamLeaderHome />} /> */}
          {/* <Route path="/team/:id" element={<TeamLeadDashboard />} /> */}
          <Route path="/teamLeadDashboard" element={<TLDashBoard />} />
          <Route path="/teamMemberHome" element={<TeamMemberHome />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
