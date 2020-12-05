import React, { useState, useEffect } from 'react';
import './PathFind.css';
import Node from './Node';

const rows = 10;
const cols = 15;

const NODE_BEGIN_ROW = 0;
const NODE_BEGIN_COL = 0;
const NODE_END_ROW = rows-1;
const NODE_END_COL = cols-1;

const PathFind = () =>{
    const [Grid, setGrid] = useState([]);
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
        // Hook this grid to state
        setGrid(grid);
        console.log(Grid);
    }

    // Spot constructor
    function Spot(i, j){
        this.x = i; //rowIdx
        this.y = j; //colIdx

        // Evalaute if this spot is start or end
        this.isStart = (this.x === NODE_BEGIN_ROW && this.y === NODE_BEGIN_COL);
        this.isEnd = (this.x === NODE_END_ROW && this.y === NODE_END_COL);

        this.g = 0;
        this.f = 0;
        this.h = 0;
    }

    // JSX chunk: populate the grid with Node component
    const gridWithNode = (
        <div>
            {
            Grid.map( (row, rowIdx) => {
                return(
                    <div key={rowIdx} className='row-wrapper'>
                        {row.map((cell, colIdx)=>{
                            const { isStart, isEnd } = cell;
                            return <Node 
                                    key={colIdx} 
                                    isStart={isStart} 
                                    isEnd={isEnd}
                                    row={rowIdx}
                                    col={colIdx}
                                />
                        })}
                    </div>
                )
            })}
        </div>
    );

    return(
        <div className='big-container'>
            <h1 style={{color:'thistle'}}>Path Finder</h1>
            {gridWithNode}
        </div>
    ); 
}

export default PathFind;