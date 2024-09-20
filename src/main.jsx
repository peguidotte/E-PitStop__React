
import React from 'react';
import App from './App.jsx';
import Home from'./pages/Home.jsx';
import './index.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';  

const router = createBrowserRouter([
  {
    path: "/", 
    element:<App/>, 
    children: [
      {index: true, element: <Home/>},
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)