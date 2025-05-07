import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TLDashBoard from './pages/Leader/TLDashBoard'
import LoginRegistram from './pages/LoginRegistram'
import JoinProject from './pages/Member/JoinProject'
import TeamMemberHome from './pages/Member/TeamMemberHome'
import Project from './pages/Project'

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRegistram />} />
          <Route path="/teamLeadDashboard" element={<TLDashBoard />} />
          <Route path="/teamMemberHome" element={<TeamMemberHome />} />
          <Route path="/join/:code/:teamMemberId" element={<JoinProject />} />
          <Route path="/project/:code" element={<Project />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
