import './App.css';
import {useEffect, useState} from 'react'

function App() {
  const [time, setTime] = useState(0)
  const [running,setRunning] = useState(false)

  useEffect(()=>{
    let interval;
    if(running){
      interval = setInterval(()=>{
        setTime((prev)=>prev+10)
      },10)
    }else if(!running){
      clearInterval(interval)
    }
    return ()=> clearInterval(interval)
  },[running])

  return (
    <div className=' flex flex-col items-center justify-center py-8'>
      <h1 className='text-lg font-semibold pb-2'>Stopwatch</h1>
      <div className='text-xl font-semibold'>
        <span>{('0'+Math.floor((time/60000)%60)).slice(-2)}:</span>
        <span>{('0'+Math.floor((time/1000)%60)).slice(-2)}:</span>
        <span>{('0'+Math.floor((time/10)%100)).slice(-2)}:</span>
      </div>
      <div className='flex flex-row justify-between'>
        {running?
        <button
        className='border rounded py-2 px-2'
        onClick={()=>setRunning(false)}>
          Pause
          </button>
          :
          <button
          className='border rounded py-2 px-2'
          onClick={()=>setRunning(true)}>
            Start
            </button>}
        <button
        className='border rounded py-2 px-2'
        onClick={()=>setTime(0)}>
          Restart</button>
      </div>
    </div>
  );
}

export default App;
