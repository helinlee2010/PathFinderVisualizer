function Astar(startNode, endNode){
    let openSet=[]; //to be evaulated
    let closeSet=[]; // store nodes that have been evaluated
    let path=[]; // store nodes in the optimal path
    let visited = [];
    
    openSet.push(startNode);
    let winnerIdx = 0;
    while(openSet.length>0){
        for(let i=0; i<openSet.length; i++){
            if(openSet[i].f<openSet[winnerIdx].f){
                // Update the new winner index (that has the shortestPath)
                winnerIdx=i; 
            }
        }
        let curr = openSet[winnerIdx];
        let neighbors = curr.neighbors; // array
        visited.push(curr);

        if(curr === endNode){
            console.log("Path found by algorithm.");
            let temp = curr;
            path.push(temp);
            while(temp.prev){
                path.push(temp.prev);
                temp = temp.prev;
            }
            return {path, visited};
        }
        // Remove curr from openSet
        openSet = openSet.filter( item => item!== curr);
        // Add curr to closeSet
        closeSet.push(curr);
        
        // Process all the curr's neighbors
        for(let i=0; i<neighbors.length; i++){
            let currNeighbor = neighbors[i];
            let tempG = curr.g + 1;   //** 
            let newPath = false; 

            if(!closeSet.includes(currNeighbor) && !currNeighbor.isWall){
                if(openSet.includes(currNeighbor)){
                    // Update the g with the smaller one
                    if(tempG < currNeighbor.g){
                        currNeighbor.g = tempG;
                        newPath = true;
                    }
                }else{ // openSet doesn't have this neighbot
                    currNeighbor.g = tempG;
                    newPath = true;
                    openSet.push(currNeighbor);
                }
                if(newPath){
                    // Calculate the heuristic, update the h & f value
                    currNeighbor.h = heuristic(currNeighbor, endNode);
                    currNeighbor.f = currNeighbor.g + currNeighbor.h;
                    currNeighbor.prev = curr; 
                }
            } //won't do anything if curr neighbor is in closeSet   
        }
    }
    return {path, visited, error:"No path found"};
}

function heuristic(pCell, qCell){
    const distance = Math.abs(pCell.x-qCell.x) + Math.abs(pCell.y-qCell.y);
    return distance;
}

export default Astar;