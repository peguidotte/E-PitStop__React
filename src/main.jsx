import React from 'react';
import App from './App.jsx';

import Home from './pages/Home.jsx';
import HomeAthletes from './pages/HomeTabs/HomeAthletes.jsx';
import HomeCommunities from './pages/HomeTabs/HomeCommunities.jsx';
import HomeFollowing from './pages/HomeTabs/HomeFollowing.jsx';
import HomeForYou from './pages/HomeTabs/HomeForyou.jsx';
import HomeTeams from './pages/HomeTabs/HomeTeams.jsx';


import Chat from './pages/Chat/Chat.jsx';
import Stream from './pages/Stream/Stream.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Search from './pages/Search/Search.jsx';
import Communitie from './pages/Community/Community.jsx';

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
          <Route path="Communitie/:id" element={<Communitie />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
)