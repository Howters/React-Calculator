import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Support from "./Components/Support.tsx"
import App from "./App.tsx"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Router>
          <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/support-page" element={<Support />} />
          </Routes>
      </Router>
)
