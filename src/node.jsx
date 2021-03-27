import React, { Component } from "react";
import "./styles/project-styles.css";

export default class Node extends Component {
    getClass(id) {
        if (id === 0) {
            return "node-unvisited";
        } else if (id === 1) {
            return "node-wall";
        } else if (id === 2) {
            return "node-visited";
        } else if (id === 3) {
            return "node-path";
        } else if (id === 4) {
            return "node-start";
        } else if (id === 5) {
            return "node-finish";
        }
    }
    render() {
        const {
            row,
            col,
            property,
            mousedown,
            mouseup,
            mouseenter,
        } = this.props;
        return (
            <rect
                id={row + "-" + col}
                x={col * 35}
                y={row * 35}
                width="35"
                height="35"
                className={"node " + this.getClass(property)}
                onMouseDown={() => mousedown(row, col)}
                onMouseEnter={() => mouseenter(row, col)}
                onMouseUp={() => mouseup()}
            ></rect>
        );
    }
}
