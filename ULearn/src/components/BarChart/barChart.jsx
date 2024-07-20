import React from 'react';

const calculateBarThickness = (chartwidth, onedata, max) => {
  return (0.75*onedata/(max))*chartwidth;
}

const BarChart = ( props ) => {
  let total = 0;
  let max = 0;
  for (let i = 0; i < props.data.length; i++){
    total = total + props.data[i].value;
    if (props.data[i].value > max){
      max = props.data[i].value
    }
  }
  
  let chartwidth = props.chartW

  return( 
    <div>
        <svg height={props.chartH} width={props.chartW}>
          <g className="container">
            {props.data.map((d, i) => <g key={i} transform={`translate(20, ${i * props.barSpace})`}>
                <g className="bar-group h-full w-full">
                  <text className="name-label border-r-2 border-black fill-gray-700" x="-10" y={props.barSpace * 0.5} alignmentBaseline="middle">{d.name}</text>                 
                  <rect className='h-5' y={props.barThick} fill={props.barColour} width={calculateBarThickness(chartwidth, d.value, max) + 'px'} x={d.name.length * 10}  />
                  <text className="value-label text-end fill-gray-500" 
                        x={d.name.length * 10 + calculateBarThickness(chartwidth, d.value, max) + 10} 
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