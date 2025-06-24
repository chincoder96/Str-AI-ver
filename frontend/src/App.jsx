import { useState } from 'react'
import './App.css'
import LandingPage from "./pages/landing"
import Home from "./pages/home"
import FirstPage from "./pages/firstpage"
import Intro from "./pages/intro"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from './layouts/app-layout';
import ProtectedRoute from './components/protected-route';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/FirstPage",
        element: 
        <FirstPage />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/intro",
        element:  <Intro />
      },
    ],
  },
]) 
function App() {
 return <RouterProvider router={router} />
}

export default App
