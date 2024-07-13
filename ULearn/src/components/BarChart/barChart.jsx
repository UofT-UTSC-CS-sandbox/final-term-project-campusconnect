import React, { useState } from 'react';

const BarChart = ( props ) => {
  let total = 0;
  for (let i = 0; i < props.data.length; i++){
    total = total + props.data[i].value;
  }

  return( 
    <div>
        <svg height={props.chartH} width={props.chartW}>
          <g className="container">
            {props.data.map((d, i) => <g key={i} transform={`translate(20, ${i * props.barSpace})`}>
                <g className="bar-group h-full w-full">
                  <text className="name-label border-r-2 border-black fill-gray-700" x="-10" y={props.barSpace * 0.5} alignmentBaseline="middle">{d.name}</text>
                  
                  <rect className='fill-amber-400 h-5' y={props.barThick} width={d.value*10} x={d.name.length * 10}  />
                  <text className="value-label text-end fill-gray-500" 
                        x={d.name.length * 10 + d.value*10 + 10} 
                        y={props.barSpace * 0.5} 
                        alignmentBaseline="middle" >
                          {d.value + "  (" + Math.round(d.value*100/total) + "%)"}
                  </text>
                </g>
              </g>)}
              <line x1={props.data[0].name.length*10 + 10} y1="10" x2={props.data[0].name.length*10 + 10} y2={props.chartH.slice(0, -2) - 10} stroke="#9ca3af" />
          </g>
        </svg>
    </div>
  )
};

export { BarChart };