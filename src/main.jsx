import React from 'react';
import App from './App.jsx';

import Home from './pages/Home.jsx';
import HomeAthletes from './pages/Home/HomeAthletes.jsx';
import HomeCommunities from './pages/Home/HomeCommunities.jsx';
import HomeFollowing from './pages/Home/HomeFollowing.jsx';
import HomeForYou from './pages/Home/HomeForyou.jsx';
import HomeTeams from './pages/Home/HomeTeams.jsx';


import Chat from './pages/Chat.jsx';
import Stream from './pages/Stream.jsx';
import Profile from './pages/Profile.jsx';
import Search from './pages/Search.jsx';

import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>

          <Route path="/" element={<Home />}>
            <Route path="home-following" element={<HomeFollowing />} />
            <Route path="home-teams" element={<HomeTeams />} />
            <Route path="home-athletes" element={<HomeAthletes />} />
            <Route path="home-communities" element={<HomeCommunities />} />
            <Route index path="/" element={<HomeForYou />} />
          </Route>
          
          <Route path='search' element={<Search/>}/>
          <Route path="stream" element={<Stream />} />
          <Route path="chat" element={<Chat />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
)