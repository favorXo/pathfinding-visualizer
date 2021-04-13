import React, { Component } from "react";
import Node from "./node.jsx";
import { createGrid, editGrid } from "./helper";
import BFS from "./algorithms/bfs";
import dijkstra from "./algorithms/dijkstra";
import maze from "./algorithms/astar";
import "./styles/project-styles.css";
import Button from "./button.js";

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.visualize = this.visualize.bind(this);
    this.clearOrderAndPath = this.clearOrderAndPath.bind(this)
    this.createMaze = this.createMaze.bind(this)
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

  createMaze(grid){
    console.log(grid(this.state.grid, this.state.start));
    this.setState({ grid: grid(this.state.grid, this.state.start) })
  }

  async visualize(algorithm) {
    let [order, path] = algorithm(this.state.grid, this.state.start);
    order.shift();
    path.shift();
    path.pop();
    for (let i = 0; i <= order.length; i++) {
      if (i === order.length) {
        for (let j = 0; j < path.length; j++) {
          let [x, y] = path[j];
          await setTimeout(() => {
            this.setState({ grid: editGrid(this.state.grid, 3, x, y), running: path.length === j});
          }, this.state.speed * (i + j));
        }
      } else if (path){
        let [x, y] = order[i];
        await setTimeout(() => {
          this.setState({ grid: editGrid(this.state.grid, 2, x, y), running: true});
        }, this.state.speed * i);
      }
    }
  }

  clearCanvas() {
    if (this.state.running) return;
    this.setState({
      grid: createGrid(22, 53, this.state.start, this.state.finish),
    });
  }

  clearOrderAndPath() {
    if (this.state.running) return;
    const newGrid = []
    let count = 0
    for (const row of this.state.grid) {
      newGrid.push([])
      for (const node of row) {
        if (node.property === 2 || node.property === 3) node.property = 0
        newGrid[count].push(node)
      }
      count += 1
    }
    this.setState({grid: newGrid})
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
        <Button text="Reset" func={() => this.clearCanvas()}></Button>
        <Button text="Clear" func={() => this.clearOrderAndPath()}></Button>
        <Button text="BFS" func={() => this.visualize(BFS)}></Button>
        <Button text="Dijkstra" func={() => this.visualize(dijkstra)}></Button>
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
