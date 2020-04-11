import React, { useEffect, useState } from "react";
import Project from "@bit/toringo.comp.product-list";
import Switch from "@bit/campgladiator.cgui.components.atoms.switch";

// import "./dark.css";
// import "./light.css";
import "./App.css";

import setTheme from "./util";

function App() {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    setMode(mediaQuery.matches ? "light" : "dark");
    const setFn = () => {
      setMode(mediaQuery.matches ? "light" : "dark");
    };

    mediaQuery.addEventListener("change", setFn);

    return () => {
      mediaQuery.removeListener("change", setFn);
    };
  }, []);

  useEffect(() => {
    setTheme(mode);
  }, [mode]);

  return (
    <div className={`App ${mode === "dark" ? "App-dark" : "App-light"}`}>
      <Switch onClick={() => setMode(mode === "dark" ? "light" : "dark")} />
      <Project list={["Hulk", "Stack", "Link"]} />
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </div>
  );
}

export default App;
