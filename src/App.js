import './App.css';
import React, { useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import Cards from './Component/Header/Header';


function App() {
  const [dataStart, setdataStart] = useState([]);
  const [dataEnd, setdataEnd] = useState([]);
  const [request, setRequest] = useState();
  const [ dataChart, setDataChart ] = useState ( [] );
  const [loading, setLoading] = useState(false);
  
  useEffect (() => {
    fetch(`https://api.covid19tracking.narrativa.com/api/country/russia?&date_from=${dataStart}&date_to=${dataEnd}`).then(r => r.json()).then((object) => {
       console.log(object)
       
       let data = [];     // заболевшие
       let death = [];     // умершие  
       let recover = [];   //выздоровевшие
       let label;
       const labels = Object.keys(object.dates); 
    
       for ( label of labels) {
       data.push(object.dates[label].countries['Russia'].today_new_confirmed);
        }
       
       for (label of labels) {
       death.push(object.dates[label].countries['Russia'].today_new_deaths);
        }
         
       for ( label of labels) {
       recover.push(object.dates[label].countries['Russia'].today_new_recovered);
       }

       setDataChart({
       labels: labels, 
        borderWidth: 2,
       datasets: [{
         label: 'Cтатистика по заболевшим',
         data: data,
         backgroundColor: ['white'],
         borderColor: ['rgba(54, 162, 235, 1)',],
         borderWidth: 2
       },
       {
         label: 'Cтатистика по умершим',
         data: death,
         backgroundColor: ['white'],
         borderColor: ['rgba(255, 99, 132, 1)' ],
         borderWidth: 2
       },
     {
         label: 'Cтатистика по выздоровевшим',
         data: recover,
         backgroundColor: ['white',],
         borderColor: ['rgba(0, 255, 51, 1)',],
         borderWidth: 2
       }]
     })
    })
    .catch (err => alert("Wrong data!"));
   },
[request]
);
  return ( 
  <div>
    <Cards />
    <div className='block_input'>
    <input  type="date" defaultValue="2020-05-24" onChange={e => setdataStart(e.target.value)} />
    <input type="date" defaultValue="2020-12-24" onChange={e => setdataEnd(e.target.value)} />
    <input type="submit" value="Получить" onClick={() => 
    setRequest(!request)} />
   </div>
    <div className='container'>
      <Line data={ dataChart }/> 
    </div>
  </div>
  )
}

export default App;


