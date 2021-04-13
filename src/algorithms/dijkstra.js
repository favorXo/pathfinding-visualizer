export default function dijkstra(grid, start) {
    const visitedNodesInOrder = [];
    grid[start[0]][start[1]].distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      if (closestNode.property === 1) continue;
      if (closestNode.distance === Infinity) return getOutput(visitedNodesInOrder, false);
      if (closestNode.property === 5) return getOutput(visitedNodesInOrder, getNodesInShortestPathOrder(closestNode));
			closestNode.visited = true;
			visitedNodesInOrder.push(closestNode);
      updateUnvisitedNeighbors(closestNode, grid);
    }
  }
  
function sortNodesByDistance(unvisitedNodes) {
	unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
	const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
	for (const neighbor of unvisitedNeighbors) {
		neighbor.distance = node.distance + 1;
		neighbor.previous = node;
	}
}

function getUnvisitedNeighbors(node, grid) {
	const neighbors = [];
	const {col, row} = node;
	if (row > 0) neighbors.push(grid[row - 1][col]);
	if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
	if (col > 0) neighbors.push(grid[row][col - 1]);
	if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
	return neighbors.filter(neighbor => !neighbor.visited);
}

function getAllNodes(grid) {
	const nodes = [];
	for (const row of grid) {
		for (const node of row) {
			nodes.push(node);
		}
	}
	return nodes;
}

function getNodesInShortestPathOrder(finishNode) {
	const nodesInShortestPathOrder = [];
	let currentNode = finishNode;
	while (currentNode !== null) {
		nodesInShortestPathOrder.unshift(currentNode);
		currentNode = currentNode.previous;
	}
	return nodesInShortestPathOrder;
}

function getOutput(order, path) {
	const realOrder = []
	let realPath = false
	for (const node of order) realOrder.push([node.row, node.col])
	if (path) {
			realPath = []
		for (const node of path) realPath.push([node.row, node.col])
	}
	return [realOrder, realPath]
}