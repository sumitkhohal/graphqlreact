import "./App.css";
import NavBar from "./components/NavBar";
import { routes } from "./routes";
import { useRoutes } from "react-router-dom";
import React from "react";
function App() {
  const element = useRoutes(routes);
  return (
    <div>
      <NavBar />
      {element}
    </div>
  );
}

export default App;
