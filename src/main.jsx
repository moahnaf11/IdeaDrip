import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Dashboard from "./pages/Explore-Ideas/Dashboard.jsx";
import FAQ from "./pages/FAQ.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Auth from "./auth/Auth.jsx";
import LoginForm from "./login-register/LoginForm.jsx";
import RegisterForm from "./login-register/RegisterForm.jsx";
import RedditHot from "./pages/Explore-Ideas/AudienceChildren/RedditHot.jsx";
import RedditNew from "./pages/Explore-Ideas/AudienceChildren/RedditNew.jsx";
import RedditTop from "./pages/Explore-Ideas/AudienceChildren/RedditTop.jsx";
import RedditRising from "./pages/Explore-Ideas/AudienceChildren/RedditRising.jsx";
import RedditControversial from "./pages/Explore-Ideas/AudienceChildren/RedditControversial.jsx";
import Audience from "./pages/Explore-Ideas/Audience.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Auth>
        <App />
      </Auth>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          { path: "/", element: <Audience /> },
          { path: "/hot", element: <RedditHot /> },
          {
            path: "new",
            element: <RedditNew />,
          },
          {
            path: "top",
            element: <RedditTop />,
          },
          {
            path: "rising",
            element: <RedditRising />,
          },
          {
            path: "controversial",
            element: <RedditControversial />,
          },
        ],
      },

      {
        path: "trending-topics",
        element: <div className="p-6">Trending Topics Page</div>,
      },
      {
        path: "keyword-search",
        element: <div className="p-6">Keyword Search Page</div>,
      },
      {
        path: "ai-insights",
        element: <div className="p-6">AI Insights Page</div>,
      },
      {
        path: "saved-ideas",
        element: <div className="p-6">Saved Ideas Page</div>,
      },
      {
        path: "market-data",
        element: <div className="p-6">Market Data Page</div>,
      },
      {
        path: "competitor-research",
        element: <div className="p-6">Competitor Research Page</div>,
      },
      {
        path: "pain-points",
        element: <div className="p-6">Customer Pain Points Page</div>,
      },
      { path: "settings", element: <div className="p-6">Settings Page</div> },
      {
        path: "help-support",
        element: <FAQ />,
      },
    ],
  },
  {
    path: "product",
    element: <LandingPage />,
  },
  {
    path: "login",
    element: <LoginForm />,
  },
  {
    path: "register",
    element: <RegisterForm />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
