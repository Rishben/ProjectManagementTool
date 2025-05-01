import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TeamLeaderHome from './pages/Leader/TeamLeaderHome'
import LoginRegistram from './pages/LoginRegistram'
import TeamMemberHome from './pages/Member/TeamMemberHome'

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRegistram />} />
          <Route path="/teamLeaderHome" element={<TeamLeaderHome />} />
          <Route path="/teamMemberHome" element={<TeamMemberHome />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
