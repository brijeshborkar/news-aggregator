import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NewsAggregator from "./components/NewsAggregator";
import { Grid } from "@mui/system";

function App() {
  return (
    <div className="app">
      <NewsAggregator />
    </div>
  );
}

export default App;
