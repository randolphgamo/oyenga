import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import { SongContextProvider } from "./context/SongContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SongContextProvider>
        <App />
      </SongContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
