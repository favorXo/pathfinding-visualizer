export function createGrid(row, col, start, finish) {
    let grid = [];
    for (let i = 0; i < row; i++) {
        grid.push([]);
        for (let j = 0; j < col; j++) {
            grid[i].push(createNode(i, j, 0));
        }
    }
    grid[start[0]][start[1]].property = 4;
    grid[finish[0]][finish[1]].property = 5;

    return grid;
}

function createNode(row, col, property) {
    return { row: row, col: col, property: property };
}

export function editGrid(grid, key, row, col) {
    grid[row][col] = createNode(row, col, key);
    return grid;
}
