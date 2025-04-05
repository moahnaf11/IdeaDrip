import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Dashboard from './pages/Dashboard.jsx'
import FAQ from './pages/FAQ.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
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
      {path: "settings", element: <div className="p-6">Settings Page</div>},
      {
        path: "help-support",
        element: <FAQ />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)