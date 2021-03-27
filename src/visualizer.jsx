import React, { Component } from "react";
import Node from "./node.jsx";
import { createGrid, editGrid } from "./helper";
import { BFS } from "./algorithms/bfs";
import "./styles/project-styles.css";
import Button from "./button.js";

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.breadthFirstSearch = this.breadthFirstSearch.bind(this);
    this.state = {
      grid: [],
      isDown: false,
      speed: 10,
      editState: 1,
      start: [5, 5],
      finish: [15, 40],
      running: false,
    };
  }

  breadthFirstSearch() {
    let [order, path] = BFS(this.state.grid, this.state.start);
    order.shift();
    path.shift();
    for (let i = 0; i <= order.length; i++) {
      if (i === order.length) {
        for (let j = 0; j < path.length; j++) {
          let [x, y] = path[j];
          setTimeout(() => {
            this.setState({ grid: editGrid(this.state.grid, 3, x, y), running: path.length === j});
          }, this.state.speed * (i + j));
        }
      } else {
        let [x, y] = order[i];
        setTimeout(() => {
          this.setState({ grid: editGrid(this.state.grid, 2, x, y), running: true});
        }, this.state.speed * i);
      }
    }
  }

  clearCanvas() {
    this.setState({
      grid: createGrid(22, 53, this.state.start, this.state.finish),
    });
  }

  handleMouseDown(row, col) {
    if (this.state.running) return;
    if (this.state.grid[row][col].property === 0) {
      this.setState({
        grid: editGrid(this.state.grid, 1, row, col),
        isDown: true,
        editState: 1,
      });
    } else if (this.state.grid[row][col].property === 1) {
      this.setState({
        grid: editGrid(this.state.grid, 0, row, col),
        isDown: true,
        editState: 0,
      });
    } else if (this.state.grid[row][col].property === 4) {
      this.setState({
        isDown: true,
        editState: 4,
      });
    } else if (this.state.grid[row][col].property === 5) {
      this.setState({
        isDown: true,
        editState: 5,
      });
    }
  }

  handleMouseEnter(row, col) {
    if (this.state.running) return;
    if (this.state.isDown) {
      if (
        this.state.grid[row][col].property === 0 &&
        this.state.editState === 1
      ) {
        this.setState({
          grid: editGrid(this.state.grid, 1, row, col),
        });
      } else if (
        this.state.grid[row][col].property === 1 &&
        this.state.editState === 0
      ) {
        this.setState({
          grid: editGrid(this.state.grid, 0, row, col),
        });
      } else if (
        this.state.grid[row][col].property === 0 &&
        this.state.editState === 4
      ) {
        this.setState({
          grid: editGrid(
            editGrid(
              this.state.grid,
              0,
              this.state.start[0],
              this.state.start[1]
            ),
            4,
            row,
            col
          ),
          start: [row, col],
        });
      } else if (
        this.state.grid[row][col].property === 0 &&
        this.state.editState === 5
      ) {
        this.setState({
          grid: editGrid(
            editGrid(
              this.state.grid,
              0,
              this.state.finish[0],
              this.state.finish[1]
            ),
            5,
            row,
            col
          ),
          finish: [row, col],
        });
      }
    }
  }

  handleMouseUp() {
    this.setState({ isDown: false, editState: 1 });
  }

  componentDidMount() {
    const grid = createGrid(22, 53, this.state.start, this.state.finish);
    this.setState({ grid: grid });
  }

  render() {
    const { grid } = this.state;
    return (
      <>
        <Button text="Clear Canvas" func={() => this.clearCanvas()}></Button>
        <Button text="BFS" func={() => this.breadthFirstSearch()}></Button>
        <svg height="1080" width="1920" className="grid">
          {grid.map((row) => {
            return row.map((col) => (
              <Node
                row={col.row}
                col={col.col}
                key={`${col.row}-${col.col}`}
                property={col.property}
                mousedown={(row, col) => this.handleMouseDown(row, col)}
                mouseenter={(row, col) => this.handleMouseEnter(row, col)}
                mouseup={() => this.handleMouseUp()}
              ></Node>
            ));
          })}
        </svg>
      </>
    );
  }
}
