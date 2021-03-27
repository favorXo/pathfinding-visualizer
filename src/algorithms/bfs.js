function isValid(visited, row, col, rowEnd, colEnd){
    if (row < 0 || col < 0 || row >= rowEnd  || col >= colEnd) {
        return false
    }
    if (visited[row][col]) {
        return false
    }
    return true
}

export function BFS(grid, start){
    let q = [[start]];
    let x, y, cell;
    let visited = [];
    let rowEnd = grid.length;
    let colEnd = grid[0].length;
    let order = [];
    for (let i = 0; i < rowEnd; i++) {
        visited.push([])
        for (let j = 0; j < colEnd; j++) {
            visited[i].push(false);
            if (grid[i][j].property === 1) {
                visited[i][j] = true;
            }
        }
    }
    visited[start[0]][start[1]] = true;
 
    while (q.length > 0) {
        cell = q.shift();
        x = cell[cell.length-1][0];
        y = cell[cell.length-1][1];    
        if (grid[x][y].property === 5) {
            return [order, cell]
        }
        order.push([x,y])

        for (let [row, col] of [[x, y+1], [x-1, y], [x, y-1], [x+1, y]]) {
            if (isValid(visited, row, col, rowEnd, colEnd)) {
                q.push(cell.concat([[row, col]]));
                visited[row][col] = true;
            }
        }
    }
    return [order, false]
}

