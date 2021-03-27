import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import Visualizer from './visualizer';


ReactDOM.render(
    <React.StrictMode>
        <h1>Pathfinding Visualizer</h1>
        <Visualizer></Visualizer>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
