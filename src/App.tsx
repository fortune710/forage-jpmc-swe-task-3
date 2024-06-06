import React, { FC, useState } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

//Converted to a function component
const App: FC = () => {
  const [data, setData] = useState<IState["data"]>([]);
  const [showGraph, setShowGraph] = useState<IState["showGraph"]>(false);

  function renderGraph() {
    if (!showGraph) return null
    return (<Graph data={data}/>)
  }

  function getDataFromServer() {
    let x = 0;
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        setData(serverResponds)
        setShowGraph(true)
      });
      x++;
      if (x > 1000) {
        clearInterval(interval);
      }
    }, 100);
  }

  return (
    <div className="App">
      <header className="App-header">
        Bank Merge & Co Task 3
      </header>
      <div className="App-content">
        <button className="btn btn-primary Stream-button" onClick={getDataFromServer}>Start Streaming Data</button>
        <div className="Graph">
          {renderGraph()}
        </div>
      </div>
    </div>
  )
}


export default App;
