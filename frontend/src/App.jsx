import { useState } from "react";
import "./App.css";
import LandingPage from "./pages/landing";
import Home from "./pages/home";
import FirstPage from "./pages/firstpage";
import Intro from "./pages/intro";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import AuthRedirect from "./pages/auth-redirect";
import { SignUp, SignIn } from "@clerk/clerk-react";
import ProtectedRoute from "./components/protected-route";
import { dark } from "@clerk/themes";

const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: "#1e3a8a",
    borderRadius: "8px",
    fontFamily: "Inter, sans-serif",
  },
  elements: {
    card: "shadow-xl border border-gray-300",
    formButtonPrimary: "bg-blue-900 hover:bg-blue-800 text-white",
    headerTitle: "text-2xl font-bold",
    socialButtonsBlockButton: "bg-white text-gray-700 hover:bg-gray-100",
  },
};

const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: (
      <div className="flex justify-center items-center h-screen bg-gray-950">
        <SignIn
          redirectUrl="/auth-redirect?mode=login"
          appearance={clerkAppearance}
        />
      </div>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <SignUp
          redirectUrl="/auth-redirect?mode=signup"
          appearance={clerkAppearance}
        />
      </div>
    ),
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/FirstPage",
        element: (
          <ProtectedRoute>
            <FirstPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/intro",
        element: (
          <ProtectedRoute>
            <Intro />
          </ProtectedRoute>
        ),
      },
      {
        path: "/auth-redirect",
        element: <AuthRedirect />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
