import React from 'react';
import './Node.css';

const Node = ({isStart, isEnd, isWall, row, col})=>{
    const additionalClass = isStart? "start-node" : isWall? "wall-node": (isEnd? "end-node" : "");
    return(
        <div 
            className={`node ${additionalClass}`} 
            id={`node-${row}-${col}`}>
        </div>
    );
}
export default Node;