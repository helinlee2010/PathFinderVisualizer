import React from 'react';
import './Node.css';

const Node = ({isStart, isEnd, row, col})=>{
    const additionalClass = isStart? "start-node" : (isEnd? "end-node" : "");
    return(
        <div 
            className={`node ${additionalClass}`} 
            id={`node-${row}-${col}`}>
        </div>
    );
}
export default Node;