import React, { useState, useEffect } from 'react';
import './PathFind.css';
import Node from './Node';
import Astar from '../algorithms/astar';

const rows = 15;
const cols = 25;

const NODE_BEGIN_ROW = 0;
const NODE_BEGIN_COL = 0;
const NODE_END_ROW = rows-1;
const NODE_END_COL = cols-1;



const PathFind = () =>{ 
    const [Grid, setGrid] = useState([]);
    const [Path, setPath] = useState([]);
    const [visited, setVisited] = useState([]);
    
    useEffect(()=>{
        initGrid();
    },[]);

    const initGrid = () =>{
        // Generate 2D array grid
        let grid = new Array(rows);
        for(let i=0; i<rows; i++){
            grid[i] = new Array(cols);
        }
        // Populate the grid with Spot
        for(let i=0; i<rows; i++){
            for(let j=0; j<cols; j++){
                grid[i][j] = new Spot(i,j);
            }
        }
        gridWithNeighbors(grid);
        // Hook this grid to state
        setGrid(grid);

        const startNode = grid[NODE_BEGIN_ROW][NODE_BEGIN_COL];
        const endNode = grid[NODE_END_ROW][NODE_END_COL];
        startNode.isWall = false;
        endNode.isWall = false;
        let algoResult = Astar(startNode, endNode);
        setPath(algoResult.path);
        setVisited(algoResult.visited);
    }

    // Spot constructor
    function Spot(i, j){
        this.x = i; //rowIdx
        this.y = j; //colIdx
        this.isWall = false;
        // Randomly define walls with 15% probability
        if(Math.random()<=0.15){
            this.isWall = true;
        }
        this.prev = undefined;
        this.neighbors = [];
        this.addNeighbors = (grid) => {
            const x = this.x;
            const y = this.y;
            if(y>0) this.neighbors.push(grid[x][y-1]);
            if(y<cols-1) this.neighbors.push(grid[x][y+1]);
            if(x>0) this.neighbors.push(grid[x-1][y]);
            if(x<rows-1) this.neighbors.push(grid[x+1][y]);
        }    
        // Evalaute if this spot is start or end
        this.isStart = (this.x === NODE_BEGIN_ROW && this.y === NODE_BEGIN_COL);
        this.isEnd = (this.x === NODE_END_ROW && this.y === NODE_END_COL);
        this.g = 0;
        this.f = 0;
        this.h = 0;
    }

    // AddNeighbors for each cell in the grid
    const gridWithNeighbors = (grid) =>{
        for(let i=0; i<rows; i++){
            for(let j=0; j<cols; j++){
                grid[i][j].addNeighbors(grid);
            }
        }
    }

    // JSX chunk: populate the grid with Node component
    const gridWithNode = (
        <div>
            {
            Grid.map( (row, rowIdx) => {
                return(
                    <div key={rowIdx} className='row-wrapper'>
                        {row.map((cell, colIdx)=>{
                            const { isStart, isEnd, isWall } = cell;
                            return <Node 
                                    key={colIdx} 
                                    isStart={isStart} 
                                    isEnd={isEnd}
                                    isWall={isWall}
                                    row={rowIdx}
                                    col={colIdx}
                                />
                        })}
                    </div>
                )
            })}
        </div>
    );

    const visualizeFinalPath = (nodesInPath) =>{
        for(let i=0; i< nodesInPath.length; i++){
            const node = nodesInPath[i];
            const nodeElm = document.getElementById(`node-${node.x}-${node.y}`);
            nodeElm.classList.add("shortest-path");
        }
    }
    const visualize = ()=>{
        // If done
        for(let i=0; i<=visited.length; i++){
            // If reaching the last one in visited records
            if(i === visited.length){
                setTimeout(()=>visualizeFinalPath(Path), 10*i+100);
            }else{ // visualize the footprint
                setTimeout( ()=>{
                    const node = visited[i];
                    const nodeElm = document.getElementById(`node-${node.x}-${node.y}`);
                    nodeElm.classList.add("visited");
                }, 10*i);     
            }
        }
    }
    const reset = ()=>{
        setGrid([]);
        setPath([]);
        setVisited([]);
        initGrid();
    }

    return(
        <div className='big-container'>
            <h1 style={{color:'thistle'}}>Path Finder</h1>
            <button onClick={visualize}>Visualize</button>
            <button onClick={reset}>Reset</button>
            {gridWithNode}
        </div>
    ); 
}

export default PathFind;