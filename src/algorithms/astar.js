export default function maze(grid, start) {

} 
function getFrontiers(node, grid) {
	const neighbors = [];
	const {col, row} = node;
	if (row > 1 && grid[row - 2][col].property === 1) neighbors.push(grid[row - 2][col]);
	if (row < grid.length - 2 && grid[row+2][col].property === 1) neighbors.push(grid[row + 2][col]);
	if (col > 1 && grid[row][col-2].property === 1) neighbors.push(grid[row][col - 2]);
	if (col < grid[0].length - 2 && grid[row][col+2].property === 1) neighbors.push(grid[row][col + 2]);

	return neighbors
}

function getNeighbors(node, grid) {
	const neighbors = [];
	const {col, row} = node;
	if (row > 0) neighbors.push(grid[row - 1][col]);
	if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
	if (col > 0) neighbors.push(grid[row][col - 1]);
	if (col < grid[0].length - 1 ) neighbors.push(grid[row][col + 1]);

	return neighbors
}

function createPassage(grid, node, target) {
    
}