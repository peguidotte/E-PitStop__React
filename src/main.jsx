
import React from 'react';
import App from './App.jsx';
import Home from'./pages/Home.jsx';
import Ranking from './pages/Ranking.jsx';
import Teams from './pages/Teams.jsx';
import About from './pages/About.jsx';
import './index.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';  

const router = createBrowserRouter([
  {
    path: "/", 
    element:<App/>, 
    children: [
      {index: true, element: <Home/>},
      {path: "/ranking", element: <Ranking/>},
      {path: "/teams", element: <Teams/>},
      {path: "/About", element: <About/>}
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)