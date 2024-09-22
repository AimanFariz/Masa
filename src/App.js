import Stopwatch from './components/Stopwatch';
import { useState } from 'react';
import Timer from './components/Timer';

function App() {
const [stopwatchList,setStopwatchList] = useState([])
const [timerList,setTimerList] = useState([])
const [stopwatch,setStopwatch] = useState(false)
const [timer, setTImer] = useState(false)
const handleAddStopwatch = (e) => {
  e.preventDefault()
  setStopwatchList([...stopwatchList, <Stopwatch/>])
}
const handleAddTimer = (e) => {
  e.preventDefault()
  setTimerList([...timerList, <Timer/>])
}
  return (
    <div className='flex flex-col justify-center items-center pt-5 px-5 gap-3'>
      <h1 className='font-semibold text-xl'>MASA</h1>
      <blockquote className='font-thin italic'>By the ˹passage of˺ time! Surely humanity is in ˹grave˺ loss, except those who have faith, do good, and urge each other to the truth, and urge each other to perseverance.</blockquote>
      <blockquote className='font-thin italic'>-The Holy Quran, 103:1</blockquote>

      {/* Buttons */}
      <div className='flex flex-row gap-3'>
        <button
        className='bg-blue-500 rounded-lg hover:bg-opacity-70 text-white py-2 px-3'
        onClick={handleAddStopwatch}
        >+ Stopwatch
        </button>
        <button
        className='bg-blue-500 rounded-lg hover:bg-opacity-70 text-white py-2 px-3'
        onClick={handleAddTimer}
        >+ Timer
        </button>
      </div>
      {/* Item display section */}
      <section className='grid grid-cols-3 justify-center items-center gap-3'>
      {stopwatch
      ?
      <Stopwatch/>:null}
      {stopwatchList.map((index)=>
          <Stopwatch
          key={index}
          index={index}
          />
        )}
      {timer
      ?
      <Timer/>:null}
      {timerList.map((index)=>
          <Timer
          key={index}
          index={index}
          />
        )}
      </section>
    </div>
  );
}

export default App;
