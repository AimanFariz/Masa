import React from 'react'
import {useEffect, useState} from 'react'

export default function Stopwatch() {
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
    <div className='border border-blue-600 border-x flex flex-col items-center justify-center bg-white px-3 py-2 rounded-lg'>
    <input placeholder='Add Stopwatch Name' className='text-center text-lg py-2 font-semibold text-blue-600'/>
      {/* <h1 className='text-lg font-semibold pb-2'>Stopwatch</h1> */}
      <div className='text-xl font-semibold'>
        <span>{('0'+Math.floor((time/60000)%60)).slice(-2)}:</span>
        <span>{('0'+Math.floor((time/1000)%60)).slice(-2)}:</span>
        <span>{('0'+Math.floor((time/10)%100)).slice(-2)}:</span>
      </div>
      <div className='flex flex-row justify-between gap-2'>
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
  )
}
