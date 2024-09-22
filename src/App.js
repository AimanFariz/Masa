import Stopwatch from './components/Stopwatch';
import { useState } from 'react';

function App() {
const [stopwatchList,setStopwatchList] = useState([])
const [stopwatch,setStopwatch] = useState(false)
const handleAddTask = (e) => {
  e.preventDefault()
  setStopwatchList([...stopwatchList, <Stopwatch/>])
}
  return (
    <div className='flex flex-col justify-center items-center pt-5 px-5 gap-3'>
      <h1 className='font-semibold text-xl'>MASA</h1>
      <blockquote className='font-thin italic'>By the ˹passage of˺ time! Surely humanity is in ˹grave˺ loss, except those who have faith, do good, and urge each other to the truth, and urge each other to perseverance.</blockquote>
      <blockquote className='font-thin italic'>-The Holy Quran, 103:1</blockquote>

      {/* Buttons */}
      <div>

      </div>
      <button
      className='bg-blue-500 rounded-lg hover:bg-opacity-70 text-white py-2 px-3'
      onClick={handleAddTask}
      >+ Stopwatch</button>
      <div className='grid grid-cols-3 justify-center items-center gap-3'>
      {stopwatch
      ?
      <Stopwatch/>:null}
      {stopwatchList.map((index)=>
          <Stopwatch
          key={index}
          index={index}
          />
        )}
      </div>
    </div>
  );
}

export default App;
