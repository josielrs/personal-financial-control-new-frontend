import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import FinancialEntryMenu from './pages/FinancialEntryMenu'
import FinancialControlMenu from './pages/FinancialControlMenu'
import CreditCardMenu from './pages/CreditCardMenu'
import NotFoundPage from './pages/NotFoundPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path:"/financial-entry",
    element: <FinancialEntryMenu />
  },
  {
    path:"/credit-card",
    element: <CreditCardMenu />
  },
  {
    path:"/financial-control",
    element: <FinancialControlMenu />
  },
  {
    path:"*",
    element:<NotFoundPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
