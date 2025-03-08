import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import ChallangesContextProvider from "./context/ChallangesContextProvider";
// import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ChallangesContextProvider>
          <App />
        </ChallangesContextProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
